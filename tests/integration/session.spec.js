const request = require('supertest')
const app = require('../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../utils/factories')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  // Hooks
  const useModel = async (password) => {
    return await factory.create('User', { password })
  }

  const useResponse = async (email, password) => {
    return await request(app)
      .post('/sessions').send({
        email,
        password
      })
  }

  it('must authenticate with valid credentials', async () => {
    const user = await useModel('KEqNTAloy')
    const response = await useResponse(user.email, 'KEqNTAloy')

    expect(response.status).toBe(200)
  })

  it('does not allow invalid authentication', async () => {
    const user = await useModel('KEqNTAloy')
    const response = await useResponse(user.email, '12345678')

    expect(response.status).toBe(401)
  })

  it('should return a jwt token after authentication', async () => {
    const user = await useModel('KEqNTAloy')
    const response = await useResponse(user.email, 'KEqNTAloy')

    expect(response.body).toHaveProperty('token')
  })

  it('allows access to private routes if authenticated', async () => {
    const user = await useModel('KEqNTAloy')

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('does not allow access to private routes if unauthenticated', async () => {
    const response = await request(app)
      .get('/dashboard')

    expect(response.status).toBe(401)
  })

  it('does not allow access to private routes if there is an invalid token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')

    expect(response.status).toBe(401)
  })
})
