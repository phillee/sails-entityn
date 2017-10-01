const VIEW_PATH = '../api/hooks/entityn/views/'

function buildPath(p) { return VIEW_PATH + p }

exports.authenticate = (req, res, next) => {
  next()
}

exports.loadModel = (req, res, next) => {
  res.locals.model = sails.models[req.params.modelName]
  res.locals.entityInfo = res.locals.model.entityInfo
  next()
}

exports.index = (req, res) => {
  res.locals.model
  .find()
  .exec((err, results) => {
    res.locals.results = results
    res.view(buildPath('index'))
  })
}

exports.new = (req, res) => {
  res.render(buildPath('edit'))
}

exports.edit = (req, res) => {
  res.locals.model
  .findOneById(req.params.id)
  .exec((err, result) => {
    res.render(buildPath('edit'), { result: result })
  })
}

exports.create = (req, res) => {
  var modelObj = new res.locals.model()

  res.locals.entityInfo.setValues(modelObj, req.body)

  modelObj.save((err) => {
    res.redirect('/admin/browse/' + model.modelInfo.name)
  })
}

exports.update = (req, res) => {
  console.log('body', req.body)
  res.locals.model
  .findOneById(req.params.id, (err, modelObj) => {
    res.locals.entityInfo.setValues(modelObj, req.body)

    modelObj.save((err) => {
      console.log('save err?', err)
      res.redirect('/admin/browse/' + res.locals.entityInfo.name + '/' + modelObj.id)
    })
  })
}