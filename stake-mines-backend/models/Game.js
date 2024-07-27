const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
  },
  mines: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  adminOutcome: {
    type: String,
    enum: ['win', 'lose', null],
    default: null,
  },
});

module.exports = mongoose.model('Game', gameSchema);