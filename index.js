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

    if (!(model.entities || model.entityN)) continue;

    var entities = model.entities || model.entityN.entities;
    var entityInfo = new EntityInfo(modelName, model.entityN);

    if (entities) {
      for (var field in entities) {
        entityInfo.configField(field, entities[field]);
      }
    }

    console.log(modelName, model.entityN, entityInfo);

    model.entityInfo = entityInfo;
  }

  done()
}