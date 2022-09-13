const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            // allowNull: false, no hace falta xq hay PK
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hashedPassword: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        },
    },
        {
            // timestamps: false
            timestamps: true,
            createdAt: false,
            updatedAt: 'actualizado'
        });
};

