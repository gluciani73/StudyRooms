const request = require('supertest')
const server = require('../src/app.js')
const { conn, User } = require('../src/db.js');

const rndNum = Math.floor(Math.random()*100)+5
const myTestUser = {
    userName: "testUser"+rndNum,
    firstName: "randomName",
    lastName: "randomLastName",
    email: `testUser${rndNum}@yahoo.com.ar`,
    password: "123",
    active: true
}
let createdUser = {}

let testToken = ""

describe('Users...', ()=> {

    beforeAll(async () => {
        await conn.sync({ force: true });
      })

    test('POST /users/signup should return 403 if invalid data', () => {
        return request(server).post('/users/signup').send({userName:"testingLALALA",password:"passwordLALALA",email:""})
        .then( res => expect(res.statusCode).toBe(403))
        
    })

    test('POST /users/signup should return 201, and the user info', () => {
        return request(server).post('/users/signup').send(myTestUser)
        .then( res => expect(res.statusCode).toBe(201))
        
    })

    test('POST /users/signup should return 401 if user already exists', () => {
        return request(server).post('/users/signup').send(myTestUser)
        .then( res => expect(res.statusCode).toBe(401))
        
    })

    test('POST /users/signin should return 200, and a token!', () => {
        return request(server).post('/users/signin').send({userName:myTestUser.userName,password:myTestUser.password})
        .then( async res => {
            expect(res.statusCode).toBe(200)
            expect(res.body.data.userName).toBe(myTestUser.userName)
            expect(res.body.data.email).toBe(myTestUser.email)
            expect(res.body.token).toBeDefined()
            testToken = res.body.token
            createdUser = await User.findOne({where:{email: myTestUser.email}})
        })
        
    })
    
    test('GET /users should return 401 if not authenticated', () => {
        return request(server).get('/users').send()
        .then( res => {
            expect(res.statusCode).toBe(401)
        })
        
    })

    test('GET /users should return 200, and the list of users if authenticated', () => {
        return request(server).get('/users').set('Authorization', `Bearer ${testToken}`).send()
        .then( res => {
            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
        
    })

    test('PUT /users/changePassword/:userId should return 401 if not authenticated', () => {
        return request(server).put(`/users/changePassword/${createdUser.id}`).send({password:"123",newPassword:"456"})
        .then( res => {
            expect(res.statusCode).toBe(401)
        })
        
    })

    test('PUT /users/changePassword/:userId should return 404 if same password', () => {
        return request(server).put(`/users/changePassword/${createdUser.id}`).set('Authorization', `Bearer ${testToken}`).send({password:"123",newPassword:"123"})
        .then( res => {
            expect(res.statusCode).toBe(404)
        })
        
    })
    
    test('PUT /users/changePassword/:userId should return 200 and change password', () => {
        return request(server).put(`/users/changePassword/${createdUser.id}`).set('Authorization', `Bearer ${testToken}`).send({password:"123",newPassword:"456"})
        .then( res => {

            return request(server).post('/users/signin').send({userName: createdUser.userName, password: "456"})
            .then( async res => {
                expect(res.statusCode).toBe(200)
                testToken = res.body.token
                createdUser = await User.findOne({where:{email: myTestUser.email}})
            })
        })
        
    })
})