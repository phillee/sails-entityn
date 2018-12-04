/* global sails */
const VIEW_PATH = '../api/hooks/entityn/views/'
const path = require('path')

function absViewPath (p) { return __dirname + '/views/' + p }

function renderContent (view, res, locals) {
  if (!locals) locals = res.locals

  var relativeViewPath = path.relative(sails.config.paths.views, absViewPath(view))
  sails.renderView(relativeViewPath, locals, (err, html) => {
    if (err) {
      console.log(err)
    }
    res.content(html)
  })
}

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
      if (err) {
        console.log(err)
      }
      results.forEach(m => {
        res.locals.entityInfo.interpolateLink(m)
      })
      res.locals.results = results
      renderContent('index', res)
    })
}

exports.new = (req, res) => {
  res.locals.result = new res.locals.model._model({})
  renderContent('new', res)
}

exports.edit = (req, res) => {
  res.locals.model
    .findOneById(req.params.id)
    .exec((err, result) => {
      if (err) {
        console.log(err)
      }
      res.locals.result = result
      renderContent('edit', res)
    })
}

exports.confirmDelete = async (req, res) => {
  let result = await res.locals.model.findOneById(req.params.id)

  res.locals.entityName = res.locals.entityInfo.displayName
    ? await res.locals.entityInfo.displayName(result)
    : `${res.locals.entityInfo.singularDisplay} with ID ${result.id}`

  res.locals.result = result
  renderContent('confirm_delete', res)
}

exports.delete = async function (req, res) {
  res.locals.model.destroy({ id: req.params.id }, err => {
    if (err) {
      console.log(err)
    }
    res.redirect('/admin/browse/' + res.locals.entityInfo.name)
  })
}

exports.create = (req, res) => {
  res.locals.model.create({}, (err, modelObj) => {
    if (err) {
      console.log(err)
    }
    res.locals.entityInfo.setValues(modelObj, req.body)

    modelObj.save((err) => {
      if (err) {
        console.log(err)
      }
      if (req.body.create_another === '1') {
        res.redirect('/admin/browse/' + res.locals.entityInfo.name + '/new')
      } else {
        res.redirect('/admin/browse/' + res.locals.entityInfo.name)
      }
    })
  })
}

exports.update = (req, res) => {
  res.locals.model
    .findOneById(req.params.id, (err, modelObj) => {
      if (err) {
        console.log(err)
      }
      var modelData = Object.assign({}, req.body)

      // handle booleans/checkboxes
      var checkboxes =
        res.locals.entityInfo.fields
          .filter(field => field.type === 'boolean')

      checkboxes.forEach(checkbox => {
        modelData[checkbox.name] = req.body[checkbox.name] === 'on'
      })

      res.locals.entityInfo.setValues(modelObj, modelData)

      modelObj.save((err) => {
        if (err) {
          console.log(err)
        }
        res.redirect('/admin/browse/' + res.locals.entityInfo.name + '/' + modelObj.id)
      })
    })
}
