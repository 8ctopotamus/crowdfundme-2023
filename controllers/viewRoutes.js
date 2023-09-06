const router = require('express').Router()
const { Project, User } = require('../models')

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

router.get('/projects/:id', async (req,res) => {
    try {
      const project = await Project.findByPk(req.params.id,{
        include: [ {model: User} ],
        raw: true,
      });
      console.log(project)
      res.render('project', {...project, fundingReached: project.needed_funding === 0});
    } catch (err) {
      res.status(500).json(err);
    }
})

module.exports = router