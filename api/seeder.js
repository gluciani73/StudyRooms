const axios = require('axios')

const testData = require('./testData.json')
const { Category } = require('./src/db.js')

const mockURL = process.env.DB_LOCALHOST3001 || "https://studyrooms-deploy.herokuapp.com";

// axios.defaults.baseURL = process.env. || "http://localhost:3001";

async function createTestData() {
  // MOCKUP USERS
  await axios.post(mockURL + '/users/signup', {
    userName: "testUser1",
    firstName: "test1",
    lastName: "user1",
    email: "test1@test.com",
    password: "123",
    active: true
  })
  await axios.post(mockURL + '/users/signup', {
    userName: "testUser2",
    firstName: "test2",
    lastName: "user2",
    email: "test2@test.com",
    password: "1234",
    active: true
  })
  await axios.post(mockURL + '/users/signup', {
    userName: "testUser3",
    firstName: "test3",
    lastName: "user3",
    email: "test3@test.com",
    password: "12345",
    active: false
  })
  await axios.post(mockURL + '/users/signup', {
    userName: "admin",
    firstName: "admin",
    lastName: "admin",
    email: "admin@test.com",
    password: "admin",
    active: false,
    isAdmin: true
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

    await axios.post(mockURL + '/questions', {
      userId, title: "Question " + title + " " + i, description, categories
    })
  }

  // MOCKUP ANSWERS
  for (let i = 0; i < testData.answers.length; i++) {

    const { questionId, userId, answer, ratingAverage, ratingCount, voteCount } = testData.answers[i]

    await axios.post(mockURL + '/answers', {
      questionId, userId, answer, ratingAverage, ratingCount, voteCount
    })

    const answerId = i + 1;
    for(let j=0; j < voteCount; j++) {
      await axios.post(mockURL + `/answers/vote/${answerId}`, {
        userId, answerId
      })
    }

    const min = 1; const max = 5;
    for(let j=0; j < ratingCount; j++){
      await axios.put(mockURL + `/answers/rating/${answerId}`, {
        userId, questionId, answerId, rating: Math.floor(Math.random() * (max - min + 1) + min)
      });
    }

  }

  //MOCKUP COMMENTS
  for (let i = 0; i < testData.comments.length; i++) {

    const { questionId, userId, comment } = testData.comments[i]

    await axios.post(mockURL + '/comments', {
      questionId, userId, comment
    })
  }

}

module.exports = { createTestData }