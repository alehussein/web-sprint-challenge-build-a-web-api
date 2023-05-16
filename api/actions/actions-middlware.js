// add middlewares here related to actions
const Actions = require('./actions-model')

function errorHandle (error, req, res, next) { //eslint-disable-line
    res.status(error.status || 500 ).json({
      message: error.message,
      customMessage: "Someting wrong in Actions router"
    })
  }


async function checkId(req, res, next) {
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
        next(error);
    }
}


  module.exports = {
     errorHandle,
     checkId
  };