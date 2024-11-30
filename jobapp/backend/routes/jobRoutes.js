const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.post('/', async (req, res) => {
  const { title, description, company, location } = req.body;
  const newJob = new Job({ title, description, company, location });

  try {
    await newJob.save();
    res.status(201).json({ message: 'Job added!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
