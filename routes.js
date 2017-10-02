const controller = require('./controller')

const VIEW_PATH = '../api/hooks/entityn/views/'
function buildPath(p) { return VIEW_PATH + p }

var routes = {}

module.exports = {
  '/admin/browse/*': controller.authenticate,
  '/admin/browse/:modelName*': controller.loadModel,
  'GET /admin/browse/:modelName': controller.index,
  'GET /admin/browse/:modelName/new': controller.new,
  'GET /admin/browse/:modelName/:id': controller.edit,
  'POST /admin/browse/:modelName': controller.create,
  'POST /admin/browse/:modelName/:id': controller.update
}