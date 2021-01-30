const { User } = require('../../src/app/models')

describe('Create a user', () => {
  it('should create a user in the database', async () => {
    const user = await User.create({
      name: 'Diego',
      email: 'diego@rocketseat.com.br',
      password_hash: 'KEqNTAloy'
    })

    expect(user.name).toBe('Diego')
  })
})
