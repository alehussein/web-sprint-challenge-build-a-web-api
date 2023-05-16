// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')

const { errorHandle } = require('./projects-middleware')

const router = express.Router()
router.use(express.json())

router.get('/api/projects', errorHandle, (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/api/projects/:id', errorHandle, async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Projects.get(id);

    if (!project) {
      return res.status(404).json({
        message: `Project with id ${id} not found`,
      });
    }

    res.status(200).json(project);
  }catch (error) {
    next(error);
  }
});

router.post('/api/projects', errorHandle, async (req, res, next) => {
  try {
    const { name, description, completed } = req.body
    if (!name || !description || completed === undefined) {
      res.status(400).json({
        message: 'Name and Description is required'
      })
    } else {
      const createdProject = await Projects.insert({ name, description, completed });
      res.status(201).json(createdProject);
    }
  }catch (error) {
    next(error);
  }
})

router.put('/api/projects/:id', errorHandle, async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description, completed } = req.body
    if (!name || !description || completed === undefined) {
      res.status(400).json({
        message: 'Name and Description is required'
      })
    } else {
      const updateProject = await Projects.update(id, { name, description, completed});
      if (!updateProject) {
        res.status(404).json({
          message: `Project with id: ${id} is not found`
        })
      } else {
        res.status(200).json(updateProject);
      }
    }
  }catch (error) {
    next(error);
  }
})

router.delete('/api/projects/:id', errorHandle, async (req, res, next) => {
  try {
    const { id } = req.params
    const deleteProject = await Projects.remove(id)
    if (!deleteProject) {
      res.status(404).json({
        message: `Project with id: ${id} is not found`
      })
    } else {
      res.status(200).json({
        message: `Project with id: ${id} was deleted`,
        data: deleteProject
      })
    }
  }catch (error) {
    next(error);
  }
})

router.get('/api/projects/:id/actions',errorHandle ,async (req, res, next) => {
  try{
    const { id } = req.params
    const projectActions = await Projects.getProjectActions(id)
    if(!projectActions){
      res.status(404).json({
        message: `There is not Project_Acions with this id: ${id}`
      })
    }else{
      res.status(200).json(projectActions)
    }
    }catch (error) {
    next(error);
  }
})



module.exports = router;

  