const Mongoose = require('mongoose');

const usuarioSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  insertedAt: {
    type: Date,
    default: new Date()
  }
})


module.exports = Mongoose.model('usuario', usuarioSchema)