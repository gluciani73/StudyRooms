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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ratingAverage: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        ratingCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        voteCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    },
        {
            // timestamps: false
            timestamps: true,
            createdAt: true,
            updatedAt: true
        });
};