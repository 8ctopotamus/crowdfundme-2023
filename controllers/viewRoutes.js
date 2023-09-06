const router = require('express').Router()
// const session = require('express-session')
const { Project, User } = require('../models')

// homepage
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      raw: true
    })
    res.render('home', { projects, loggedIn: req.session.logged_in })
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

router.get('/login', async (req, res) => {
  try {
    res.render('login')
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/profile', async (req, res) => {
  const user_id = req.session.user_id
  if (!user_id){
    res.redirect('/login')
  }
  try {
    const user = await User.findByPk(user_id, {
      raw: true,
    })

    const projects = await Project.findAll({
      where: {
        user_id
      },
      raw: true
    })

    res.render('profile', {...user, projects})
  } catch (err){
    res.status(500).json(err)
  }
  
})


module.exports = router