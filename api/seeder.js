const axios = require('axios')
const sequelize = require('sequelize')
const testData = require('./testData.json')
const { Category } = require('./src/db.js')

async function createTestData() {
  // MOCKUP USERS
  await axios.post('http://localhost:3001/users/signup', {
    userName: "testUser1",
    firstName: "test1",
    lastName: "user1",
    email: "test1@test.com",
    password: "123"
  })
  await axios.post('http://localhost:3001/users/signup', {
    userName: "testUser2",
    firstName: "test2",
    lastName: "user2",
    email: "test2@test.com",
    password: "1234"
  })
  await axios.post('http://localhost:3001/users/signup', {
    userName: "testUser3",
    firstName: "test3",
    lastName: "user3",
    email: "test3@test.com",
    password: "12345"
  })

  // MOCKUP CATEGORIES
  const categ = [
    'Matematicas',
    'Historia',
    'Geografia',
    'Quimica',
    'Biologia',
    'Economia',
    'Programacion',
    'Filosofia',
    'Lenguas'
  ]

  categ.forEach(c => {
    Category.create({ category: c })
  })

  // MOCKUP QUESTIONS
  for (let i = 0; i < testData.questions.length; i++) {

    const { userId, title, description, categories } = testData.questions[i]

    await axios.post('http://localhost:3001/questions', {
      userId, title: "Question " + title + " " + i, description, categories
    })
  }

  // MOCKUP ANSWERS
  for (let i = 0; i < testData.answers.length; i++) {

    const { questionId, userId, answer, rating } = testData.answers[i]

    await axios.post('http://localhost:3001/answers', {
      questionId, userId, answer: "Answer :" + answer + " " + i, rating
    })
  }
}

module.exports = { createTestData }