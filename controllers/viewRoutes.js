const router = require('express').Router()
const { Project } = require('../models')

// homepage
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      raw: true
    })
    res.render('home', { projects })
  } catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router