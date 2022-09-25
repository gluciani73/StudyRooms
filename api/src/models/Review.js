const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('review', {
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
        rating: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
        {
            // timestamps: false
            timestamps: true,
            createdAt: true,
            updatedAt: true
        });
};