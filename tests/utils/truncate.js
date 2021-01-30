const { sequelize } = require('../../src/app/models')

// this cleans up the 'sqlite' test database whenever a new test starts
module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({
        truncate: true,
        force: true
      })
    })
  )
}
