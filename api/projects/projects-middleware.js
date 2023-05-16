// add middlewares here related to projects
const Projects = require('./projects-model')

function errorHandle (error, req, res, next) { //eslint-disable-line
    res.status(error.status || 500 ).json({
      message: error.message,
      customMessage: "Someting wrong in Projects router"
    })
  }


  module.exports = {
     errorHandle
  };