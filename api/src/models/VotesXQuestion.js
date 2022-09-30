const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('votesxquestion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'user_question'
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'user_question'
        },
    },
        {
            // timestamps: false
            timestamps: true,
            createdAt: true,
            updatedAt: true
        });
};