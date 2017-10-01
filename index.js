const EntityInfo = require('./entity_info')
// const anchor = require('anchor')

module.exports = function(sails) {
  var hook = this

  return {
    initialize: function(done) {
      sails.on('hook:orm:loaded', () => {
        // anchor.define({ $entity: () => true })

        extractEntityInfo(sails.models, done)
      })
    },
    routes: {
      after: require('./routes')
    }
  }
}

function extractEntityInfo(models, done) {
  for (var modelName in models) {
    var model = models[modelName];
    var fields = {};

    if (!model.entities) continue;

    var entityInfo = new EntityInfo(modelName)

    for (var field in model.entities) {
      entityInfo.configField(field, model.entities[field])
    }

    model.entityInfo = entityInfo
  }

  done()
}