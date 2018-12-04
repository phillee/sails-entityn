/*
 * @Author: edwin
 * @Date:   2018-12-05 00:27:28
 * @Last Modified by: edwin
 * @Last Modified At: 2018-12-05 01:00:48
 */

const expect = require('chai').expect
global._ = require('lodash')
const EntityInfo = require('../entity_info')

describe('EntityInfo', () => {
  describe('Link', () => {
    it('should successfully parse link with single param', () => {
      let entityInfo = new EntityInfo('Model')
      entityInfo.configField('Field1', {
        link: {
          url: '/this/is/fake/link/:Field2'
        }
      })
      let model = {
        Field1: 'This is Field1',
        Field2: 'field2'
      }
      entityInfo.interpolateLink(model)
      expect(model._link).to.be.eql('/this/is/fake/link/field2')
    })
    it('should successfully parse link with multiple params', () => {
      let entityInfo = new EntityInfo('Model')
      entityInfo.configField('Field1', {
        link: {
          url: '/this/is/fake/link/:Field2/:Field3'
        }
      })
      let model = {
        Field1: 'This is Field1',
        Field2: 'field2',
        Field3: 'field3'
      }
      entityInfo.interpolateLink(model)
      expect(model._link).to.be.eql('/this/is/fake/link/field2/field3')
    })
  })
})
