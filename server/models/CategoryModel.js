<<<<<<< HEAD
/*
能操作categorys集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const categorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  parentId: {type: String, required: true, default: '0'}
})

// 3. 定义Model(与集合对应, 可以操作集合)
const CategoryModel = mongoose.model('categorys', categorySchema)

// 4. 向外暴露Model
=======
/*
能操作categorys集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const categorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  parentId: {type: String, required: true, default: '0'}
})

// 3. 定义Model(与集合对应, 可以操作集合)
const CategoryModel = mongoose.model('categorys', categorySchema)

// 4. 向外暴露Model
>>>>>>> 17a724a2557ff3f320c71128f240ed4f30186d8e
module.exports = CategoryModel