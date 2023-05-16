// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')

const { errorHandle, checkId } = require('./actions-middlware')

const router = express.Router()
router.use(express.json())


router.get('/api/actions', (req, res) => {
    Actions.get()
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Failed to retrieve Actions',
          error: error.message,
        });
      });
  });

  router.get('/api/actions/:id', errorHandle, checkId, async (req, res, next) => {
    try {
      const { id } = req.params;
      const actions = await Actions.get(id);
  
      if (!actions) {
        return res.status(404).json({
          message: `Project with id ${id} not found`,
        });
      }
  
      res.status(200).json(actions);
    } catch (error) {
      next();
    }
  });


  router.post('/api/actions',errorHandle, async (req, res, next) => {
    try {
      const { notes, description, completed, project_id } = req.body
      if (!notes || !description || completed === undefined || !project_id) {
        res.status(400).json({
          message: 'Notes and Description and another things :) is required'
        })
      } else {
        const createdProject = await Actions.insert({ notes, description, completed, project_id });
        res.status(201).json(createdProject);
      }
    } catch (error) {
      next();
    }
  })

  router.put('/api/actions/:id', errorHandle, async (req, res, next) => {
    try {
      const { id } = req.params
      const { notes, description, completed, project_id } = req.body
      if (!notes || !description || completed === undefined || !project_id) {
        res.status(400).json({
          message: 'Notes and Description and another things :) is required'
        })
      } else {
        const updateAction = await Actions.update(id, { notes, description, completed, project_id});
        if (!updateAction) {
          res.status(404).json({
            message: `Actions with id: ${id} is not found`
          })
        } else {
          res.status(200).json(updateAction);
        }
      }
    } catch (error) {
      next();
    }
  })

  router.delete('/api/Actions/:id', errorHandle, async (req, res, next) => {
    try {
      const { id } = req.params
      const deleteAction = await Actions.remove(id)
      if (!deleteAction) {
        res.status(404).json({
          message: `Action with id: ${id} is not found`
        })
      } else {
        res.status(200).json({
          message: `Action with id: ${id} was deleted`,
          data: deleteAction
        })
      }
    } catch (error) {
      next();
    }
  })


module.exports =router