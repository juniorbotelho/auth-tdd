const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const model = {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING
  }

  // Sequelize
  const User = sequelize.define('User', model, {
    hooks: {
      beforeSave: async (user) => {
        // encrypt password
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8)
        }
      }
    }
  })

  return User
}
