const mongoose = require('mongoose')
const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://0.0.0.0:27017/argentBankDB'

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useUnifiedTopology: true ,useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
