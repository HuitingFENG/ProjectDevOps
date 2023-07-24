const request = require('supertest')
const app = require('../../server/app')
const { expect } = require('chai')
const { setupTestDatabase, testDatabase } = require('../helpers/testDatabase')
const { generateConfigs } = require('../helpers/config.helper')

describe('components options', function () {
    beforeEach(async function () {
        await setupTestDatabase(testDatabase)
        await generateConfigs(testDatabase)
    })

    describe('GET /component_options', function () {
        it('should get all component options', async function() {
            const response = await request(app).get('/api/component_options')
            expect(response.statusCode).to.eq(200)
            expect(response.headers['content-type']).to.match(/json/)

            const expectedKeys = ['ram', 'vcore', 'os', 'disque', 'io']
            expect(response.body).to.be.an('object').and.not.be.empty
            expect(response.body).to.have.all.keys(expectedKeys)
            for (const expectedKey of expectedKeys) {
                expect(response.body[expectedKey]).to.be.an('array').and.to.not.be.empty
            }
        })
    })
})
