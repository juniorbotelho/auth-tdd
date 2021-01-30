const bcrypt = require('bcrypt')
const { User } = require('../../src/app/models')
const truncate = require('../utils/truncate')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt the user password', async () => {
    const user = await User.create({
      name: 'Diego',
      email: 'diego@rocketseat.com.br',
      password: 'KEqNTAloy'
    })

    // compares the password above with the bcrypt hashes
    expect(await bcrypt.compare('KEqNTAloy', user.password_hash)).toBe(true)
  })
})
