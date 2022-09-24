const {Category} = require('../db.js')

const getCategories = async (req,res) => {
    try {
        const results = await Category.findAll()
    if(results) return res.status(200).json({error: null, data: results})
    else return res.status(200).json({error: "no se encontraron categorias", data: []})
    } catch (error) {
        return res.status(500).json({error:"error in categoryController", data: null})
    }
}

module.exports = {getCategories}