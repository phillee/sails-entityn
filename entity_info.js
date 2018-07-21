const Sugar = require('sugar')
require('sugar-inflections')

// const cloudinary = require('./cloudinary')

module.exports = function(name, fields) {
  var pointer = this

  this.name = name
  this.singularDisplay = Sugar.String.capitalize(name)
  this.pluralDisplay = Sugar.String.capitalize(Sugar.String.pluralize(name))
  this.fields = []

  pointer.configField = function(fieldName, entityData) {
    var fieldData = {
      label: entityData.label || Sugar.String.titleize(fieldName),
      name: fieldName,
      type: entityData.type || 'text',
      adminList: entityData.adminList
    }

    _.extend(fieldData, entityData)

    pointer.fields.push(fieldData)
  }

  pointer.setValues = function(obj, input) {
    pointer.fields.forEach((field) => {
      if (field.type == 'text' || field.type == 'select') {
        if (input[field.name]) obj[field.name] = input[field.name]
      } else if (field.type == 'cloudinary') {
        // var identifierField = field.name + '_cloudinaryIdentifier'
        // var identifierValue = input[identifierField]

        // if (!identifierValue) return

        // var preloadedFile = new cloudinary.PreloadedFile(identifierValue)
        // if (preloadedFile.is_valid()) obj[field.name] = preloadedFile.identifier()
        // else console.log('invalid sig')
      }
    })
  }
}

