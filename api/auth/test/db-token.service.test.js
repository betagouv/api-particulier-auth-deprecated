const expect = require('chai').expect
const Service = require('../db-tokens.service')
const testData = require('./mongo.json')
const mongo = require('../../lib/utils/mongo')

describe('Db Token service', () => {
  let service
  beforeEach(() => {
    return mongo.connect().then(() => {
      service = new Service()
      return service.initialize().then((service) => {
        return service.collection.insertMany(testData.data)
      })
    })
  })

  afterEach(() => {
    return service.collection.remove()
  })

  it('initializes with a collection', () => {
    expect(service.collection).not.to.equal(undefined)
  })

  it('gets a token when the token exists', () => {
    return service.getToken('test-token').then((token) => {
      expect(token.name).to.equal('Jeu de test')
    })
  })

  it('gets null when the token does not exists', () => {
    return service.getToken('bad-token').then((token) => {
      expect(token).to.equal(null)
    })
  })
})
