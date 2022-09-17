const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../db.js')

const AUTH_SECRET = process.env.AUTH_SECRET || "Secret!"

const signUp = async (req, res) => {
    const { userName, password, firstName, lastName, email, avatar } = req.body
    if (!userName || !password || !firstName || !lastName || !email || !avatar) {
        return res.status(401).json({ data: null, error: "faltan datos" })
    }

    try {
        const userFound = await User.findOne({ where: { userName: userName } })
        if (userFound) return res.status(401).json({ data: null, error: "ya existe la cuenta" })

        const userFoundByMail = await User.findOne({ where: { email: email } })
        if (userFoundByMail) return res.status(401).json({ data: null, error: "ya existe la cuenta" })

        const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10))

        const createdUser = await User.create({
            userName,
            authType: "normal",
            firstName,
            lastName,
            email,
            hashedPassword,
            avatar,
            isAdmin: false,
            isPremium: false,
            active: true
        })
        const dataToSend = {
            id: createdUser.id, userName, firstName, lastName, email, avatar
        }

        const token = jwt.sign(dataToSend, AUTH_SECRET, { expiresIn: 86400 })

        return res.json({ data: dataToSend, error: null, token })
    } catch (error) {
        res.status(500).json({ msg: "error in sign up controller" })
    }
}

const signIn = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(404).json({ data: null, error: "faltan datos" })
    }
    try {
        const userFound = await User.findOne({ where: { userName: userName } })
        if (userFound) {
            if (bcrypt.compareSync(password, userFound.hashedPassword)) {
                const dataToSend = {
                    id: userFound.id,
                    userName,
                    firstName: userFound.firstName,
                    lastName: userFound.lastName,
                    email: userFound.email,
                    avatar: userFound.avatar,
                    active: userFound.active
                }
                const token = jwt.sign(dataToSend, AUTH_SECRET, { expiresIn: 86400 })
                return res.status(200).json({ data: dataToSend, error: null, token })
            } else {
                return res.status(401).json({ data: null, error: "datos incorrectos" })
            }
        }
        else {
            return res.status(404).json({ data: null, error: "no user found" })
        }
    } catch (error) {
        return res.status(500).json({ msg: "error in sign in controller" })
    }
}

const getAllUsers = async (req,res) => {

    try {
        const results = await User.findAll()
        if(results){
            return res.status(200).json(results)
        }
        else{
            return res.status(404).json({data: [], error:"no se encontraron usuarios"})
        }
    } catch (error) {
        return res.status(404).json({error:"falla el usersController.js", data: null})
    }
    
}

const getUserById = async (req,res) => {

    try {
        const id = parseInt(req.params.userId)
        if(!id) return res.status(400).json({data:null, error: "wrong params / no user with that id"})

        const results = await User.findByPk(id)
        if(results){
            return res.status(200).json({data: results, error: null})
        }
        else{
            return res.status(404).json({data: [], error:"no se encontró el usuario con ese Id"})
        }
    } catch (error) {
        return res.status(404).json({error:"falla el usersController.js", data: null})
    } 
}

const changePassword = async (req,res) => {
    
    try {
        const { userId, password, newPassword } = req.body
        if (!userId || !password || !newPassword) {
            return res.status(404).json({ data: null, error: "faltan datos" })
        }

        if(password === newPassword){
            return res.status(404).json({ data: null, error: "no puede ser la misma contraseña" })
        }

        const userFound = await User.findByPk(parseInt(userId))
        if (userFound) {
            if (bcrypt.compareSync(password, userFound.hashedPassword)) {
                const newHashedPassword = await bcrypt.hash(newPassword, bcrypt.genSaltSync(10))
                User.update({hashedPassword: newHashedPassword}, {where:{id: parseInt(userId)}})
            
                const check = await User.findByPk(parseInt(userId))


                return res.status(200).json({ data: "cambio de password", error: null })
            } else {
                return res.status(401).json({ data: null, error: "datos incorrectos" })
            }
        }
        else {
            return res.status(404).json({ data: null, error: "no user found" })
        }
    } catch (error) {
        return res.status(500).json({ msg: "error in userController" })
    }
}

module.exports = { signUp, signIn, getAllUsers, getUserById,changePassword }