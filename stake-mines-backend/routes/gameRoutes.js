const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Generate a random 5-digit game ID
function generateGameId() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Start a new game
router.post('/start', async (req, res) => {
  try {
    const { mines } = req.body;
    const gameId = generateGameId();
    const newGame = new Game({ gameId, mines });
    await newGame.save();
    res.status(201).json({ gameId });
  } catch (error) {
    res.status(500).json({ message: 'Error starting game' });
  }
});

// End a game
router.post('/:gameId/end', async (req, res) => {
  try {
    const { gameId } = req.params;
    await Game.findOneAndUpdate({ gameId }, { active: false });
    res.status(200).json({ message: 'Game ended successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error ending game' });
  }
});

// Get active games
router.get('/active', async (req, res) => {
  try {
    const activeGames = await Game.find({ active: true });
    res.status(200).json(activeGames);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active games' });
  }
});




  router.post('/:gameId/:outcome', async (req, res) => {
    try {
      const { gameId, outcome } = req.params;
      const game = await Game.findOneAndUpdate(
        { gameId },
        { adminOutcome: outcome },
        { new: true }
      );
      
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
  
      res.status(200).json({ message: 'Game outcome set successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error setting game outcome' });
    }
  });
  
  // Get game state
  router.get('/:gameId', async (req, res) => {
    try {
      const { gameId } = req.params;
      const game = await Game.findOne({ gameId });
      
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
  
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching game state' });
    }
  });
module.exports = router;