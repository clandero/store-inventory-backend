const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    category: {type:Array},
    price: {type:Number},
    stock: {type:Number}
});

module.exports = mongoose.model('Product', productSchema);

// module.exports = class Product {
//     constructor(name, category, price, stock){
//         this.id = uuid();
//         this.name = name;
//         this.category = category;
//         this.price = price;
//         this.stock = stock;
//     }
// }
