const request = require('supertest')
const app = require('../../server/app')
const { expect } = require('chai')
const { setupTestDatabase, testDatabase } = require('../helpers/testDatabase')
const { generateConfigs } = require('../helpers/config.helper')
const { createFormules } = require('../helpers/formules.helper')

describe('formules', function () {
    beforeEach(async function () {
        await setupTestDatabase(testDatabase)
        await generateConfigs(testDatabase)
        await createFormules(testDatabase)
    })

    describe('GET /formules', function () {
        it('should get all formules', async function() {
            const response = await request(app).get('/api/formules')
            expect(response.statusCode).to.eq(200)
            expect(response.headers['content-type']).to.match(/json/)

            expect(response.body).to.be.an('array').and.not.be.empty
            expect(response.body[0]).to.have.all.keys([
                'nom_formule', 'description', 'vcores', 
                'ram', 'disque', 'bande_passante', 'prix'
            ])
        })
    })
})
