const HttpError = require('../models/http-error')
const Product = require('../domain/products')
const utils = require('../utils/utils')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')


const getProductsByCategory = async (req, res, next) => {
    try{
        const categoryName = req.params.cid;
        const filter = {"category":categoryName};
        const result = await Product.find(filter);
        res.json({result});
    }catch(error){
        return next(new HttpError('Category is empty or does not exist.', 404));
    }    
}

const getProductsByName = async (req, res, next) => {

    try{
        const productName = '.*'+req.params.pname.toLowerCase()+'.*';
        const filter = {"name":{$regex : productName}};
        const result = await Product.find(filter);
        res.json({result});
    }catch(error){
        return next(new HttpError('There is no products with given name.', 404));
    }
}

const addNewProduct = async (req, res, next) => {

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            throw new HttpError('Invalid input, please check your data.',422);
        }
    
        const {name, category, price, stock} = req.body;
        const createdProduct = new Product({ name, category, price, stock});
        
        const result = await createdProduct.save()
        res.status(201).json({product:createdProduct});
    } catch(error){
        return next(new HttpError('Could not store data', 500));
    }
}

const getAllProducts = async (req, res, next) => {
    try{
        const result = await Product.find().exec();
        res.json({products:result});
    } catch(error){
        return next(new HttpError('Could not fetch data', 500));
    }
}

const updateProductByid = async (req, res, next) => {

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new HttpError('Invalid input, please check your data.',422);
        }
        
        const filter = {"_id":mongoose.Types.ObjectId(req.body.id)}
        const {id, name, category, price, stock} = req.body;
        const update = {}
            
        if(name != null){
            update["name"] = name
        }
        if(category != null){
            update["category"] = category
        }
        if(price != null){
            update["price"] = price
        }
        if(stock != null){
            update["stock"] = stock
        }
    
        const result = await Product.findOneAndUpdate(filter, update, {new: true})
        return res.status(201).json({product:result});
    }catch(error){
        return next(new HttpError('Could not update product', 500));
    }
}

const deleteProductById = async (req, res, next) => {
    
    try{
        // const errors = validationResult(req);
        // if(!errors.isEmpty()){
        //     throw new HttpError('Invalid input, please check your data.',422);
        // }
        console.log(req.body)
        console.log(request.body.id)
        console.log(mongoose.Types.ObjectId(req.body.id))
        const filter = {"_id":mongoose.Types.ObjectId(req.body.id)}
        console.log(filter);
        const result = await Product.findOneAndDelete(filter)
        return res.status(200).json({product:result});

    } catch(error){
        console.log(error);
        return next(new HttpError('Could not delete product', 500));
    }
}

exports.getProductsByCategory = getProductsByCategory;
exports.addNewProduct = addNewProduct;
exports.getProductsByName = getProductsByName;
exports.getAllProducts = getAllProducts;
exports.updateProductByid = updateProductByid;
exports.deleteProductById = deleteProductById;