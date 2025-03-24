const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// @route   POST /items
// @desc    Create a new item
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = new Item({ name, description });
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /items
// @desc    Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
    
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /items/:id
// @desc    Get item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /items/:id
// @desc    Update item by ID
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    item.name = name || item.name;
    item.description = description || item.description;

    item = await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /items/:id
// @desc    Delete item by ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    await item.remove();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
