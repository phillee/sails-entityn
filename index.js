const EntityInfo = require('./entity_info')\

module.exports = function(sails) {
  var hook = this

  return {
    initialize: function(done) {
      sails.on('hook:orm:loaded', () => {
        extractEntityInfo(sails.models, done)
      })
    },
    routes: {
      after: require('./routes')
    }
  }
}

function extractEntityInfo(models, done) {
  console.log('extractEntityInfo');
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