const controller = require('./controller')

module.exports = {
  '/admin/browse/*': controller.authenticate,
  '/admin/browse/:modelName*': controller.loadModel,
  'GET  /admin/browse/:modelName': controller.index,
  'GET  /admin/browse/:modelName/new': controller.new,
  'GET  /admin/browse/:modelName/:id/confirmDelete': controller.confirmDelete,
  'GET  /admin/browse/:modelName/:id': controller.edit,
  'POST /admin/browse/:modelName': controller.create,
  'POST /admin/browse/:modelName/:id': controller.update,
  'POST /admin/browse/:modelName/:id/delete': controller.delete
}