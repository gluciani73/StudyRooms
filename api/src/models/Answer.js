const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('answer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ratingAverage: {
            type: DataTypes.DECIMAL,
        },
        ratingCount: {
            type: DataTypes.INTEGER,
        },
        voteCount: {
            type: DataTypes.INTEGER,
        }
    },
        {
            // timestamps: false
            timestamps: true,
            createdAt: false,
            updatedAt: 'actualizado'
        });
};