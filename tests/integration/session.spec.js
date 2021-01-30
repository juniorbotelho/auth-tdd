const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../utils/truncate')
const { User } = require('../../src/app/models')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  // Hooks
  const useModel = async () => {
    return await User.create({
      name: 'Diego',
      email: 'diego@rocketseat.com.br',
      password: 'KEqNTAloy'
    })
  }

  it('must authenticate with valid credentials', async () => {
    const user = await useModel()

    // makes an internal request and awaits the response
    const response = await request(app)
      .post('/sessions').send({
        email: user.email,
        password: 'KEqNTAloy'
      })

    expect(response.status).toBe(200)
  })

  it('does not allow invalid authentication', async () => {
    const user = await useModel()

    // makes an internal request and awaits the response
    const response = await request(app)
      .post('/sessions').send({
        email: user.email,
        password: '12345678'
      })

    expect(response.status).toBe(401)
  })
})
