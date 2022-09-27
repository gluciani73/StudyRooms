const { response } = require('express');
const { Category } = require('../db.js')


const createCategory = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) {
            return res.status(401).json({
                error: "Falta algun dato, asegurese de enviar category",
                data: null
            })
        }
        const [qCategory, created] = await Category.findOrCreate({    // busco si existe, sino la creo 
            where: { category }
        });
        console.log(created ? 'Se creo la Categoria' : 'La Categoria ya existe');
        const response = await Category.findByPk(qCategory.id)
        if (created) {
            console.log('createdCategory.id: ', createCategory.id)
            return res.status(201).json({ error: null, data: response })
        } else {
            return res.status(500).json({ error: `La categoria ya existe`, data: response })
        }
    } catch (error) {
        return res.status(500).json({ error: `Error en el controlador de category: ${error}`, data: null })
    }
}

const getCategories = async (req, res) => {
    try {
        const results = await Category.findAll()
        if (results) return res.status(200).json({ error: null, data: results })
        else return res.status(200).json({ error: "no se encontraron categorias", data: [] })
    } catch (error) {
        return res.status(500).json({ error: "error in categoryController", data: null })
    }
}


const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId
        const { category } = req.body;

        if (!category || !categoryId) {
            return res.status(401).json({
                error: "Falta algun dato, asegurese de enviar category y categoryId",
                data: null
            })
        }
        const updateCategory = await Category.update({ category }, {
            where: {
                id: categoryId
            }
        })

        if (updateCategory[0] !== 0) {
            const response = await Category.findByPk(categoryId);
            return res.status(200).json({ error: null, data: response })
        }
        else {
            res.status(500).json({ error: 'No se puedo editar la categoria', data: null })
        }
    } catch (error) {
        return res.status(500).json({ error: `Error en el controlador de category: ${error}`, data: null })
    }
}


const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        if (categoryId) {
            let result = await Category.destroy({ where: { id: categoryId } });
            if (result[0]) {
                return res.status(500).send({ error: "No se encuentra la categoria", data: null })
            }
            return res.status(200).json({ error: null, data: 'Se borro la categoria id: ' + categoryId })
        }
    } catch (error) {
        return res.status(500).json({ error: `Error en el controlador de category: ${error}`, data: null })
    }
}

module.exports = { createCategory, getCategories, updateCategory, deleteCategory }