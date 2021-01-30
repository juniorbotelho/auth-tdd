require('dotenv')
  .config({
    path: process.env.NODE_ENV === 'test' ?
      '.env.test' : '.env'
  })

module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT || 'mysql',
  storage: './tests/index.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
