const EntityInfo = require('./entity_info')

module.exports = function (sails) {
  return {
    initialize: function (done) {
      sails.on('hook:orm:loaded', () => {
        extractEntityInfo(sails.models, done)
      })
    },
    routes: {
      after: require('./routes')
    }
  }
}

function extractEntityInfo (models, done) {
  for (var modelName in models) {
    var model = models[modelName]

    if (!(model.entities || model.entityN)) continue

    var entities = model.entities || model.entityN.entities
    var entityInfo = new EntityInfo(modelName, model.entityN)

    if (entities) {
      for (var field in entities) {
        entityInfo.configField(field, entities[field])
      }
    }

    model.entityInfo = entityInfo
  }

  done()
}
