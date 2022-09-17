const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // authType: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // categoryId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        ratingAverage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ratingCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        voteCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
        }
    },
        {
            // timestamps: false
            timestamps: true,
            createdAt: true,
            updatedAt: true
        });
};