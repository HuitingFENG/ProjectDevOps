const app = require('../../server/app')
const { expect } = require('chai')
const { setupTestDatabase, testDatabase } = require('../helpers/testDatabase')
const { generateConfigs } = require('../helpers/config.helper')
const { createFactures } = require('../helpers/factures.helper')
const { createAbonnements } = require('../helpers/abonnements.helper')
const { createUser, loginAs, getWithAuth } = require('../helpers/login.helper')

const credential = { username: 'john.doe@me.com', password: 'password' }

describe('factures', function () {
    beforeEach(async function () {
        await setupTestDatabase(testDatabase)
        await generateConfigs(testDatabase)
        await createUser(testDatabase, {
            nom: 'DOE', prenom: 'John',
            email: credential.username,
            password: credential.password
        })
        await createAbonnements(testDatabase, credential.username)

        const abonnementIds = (await testDatabase.query("SELECT id AS id from abonnement ORDER BY id desc LIMIT 2"))[0].map(abo => abo.id)
        await createFactures(testDatabase, [
            [abonnementIds[0], "2021-06-10", 3600],
            [abonnementIds[0], "2021-07-01", 3600],
            [abonnementIds[0], "2021-08-01", 3600],
            [abonnementIds[1], "2021-09-01", 6800],
            [abonnementIds[1], "2021-10-01", 6800]
        ])
    })

    describe('GET /factures', function () {
        it('should get all invoices', async function () {
            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const [response] = await getWithAuth({ app, cookies }, '/api/factures')
            expect(response.statusCode).to.eq(200)
            expect(response.headers['content-type']).to.match(/json/)

            expect(response.body).to.be.an('array').and.not.be.empty
            expect(response.body[0]).to.have.all.keys(['id_facture', 'id_abonnement', 'date_facture', 'montant'])
        })
    })

    describe('Get /facture/:id', function () {
        it('should get the specified invoice', async function () {
            const invoiceId = (await testDatabase.query("SELECT MAX(id) AS id from facture"))[0][0]['id']

            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const [response] = await getWithAuth({ app, cookies }, `/api/facture/${invoiceId}`)
            expect(response.statusCode).to.eq(200)
            expect(response.headers['content-type']).to.match(/json/)

            expect(response.body).to.be.an('object').and.not.be.empty
            expect(response.body).to.have.all.keys([
                'id_facture', 'id_abonnement', 'date_facture', 'montant',
                'bande_passante', 'disque', 'disque_prix', 'io_prix',
                'os', 'os_prix', 'ram', 'ram_prix', 'vcores', 'vcores_prix'
            ])
        })

        it('should handle missing parameters', async function () {
            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const [response] = await getWithAuth({ app, cookies }, '/api/facture/-1')
            expect(response.statusCode).to.eq(404)
            expect(response.headers['content-type']).to.match(/json/)
            expect(response.body).to.deep.eq({ message: 'Pas de facture trouvée' })
        })
    })
})
