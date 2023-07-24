const app = require('../../server/app')
const { expect } = require('chai')
const { setupTestDatabase, testDatabase } = require('../helpers/testDatabase')
const { generateConfigs } = require('../helpers/config.helper')
const { createAbonnements } = require('../helpers/abonnements.helper')
const { createUser, loginAs, getWithAuth, postWithAuth, deleteWithAuth } = require('../helpers/login.helper')

const credential = { username: 'john.doe@me.com', password: 'password' }

describe('abonnements', function () {
    beforeEach(async function () {
        await setupTestDatabase(testDatabase)
        await generateConfigs(testDatabase)

        await createUser(testDatabase, {
            nom: 'DOE', prenom: 'John',
            email: credential.username,
            password: credential.password
        })
        await createAbonnements(testDatabase, credential.username)
    })

    describe('GET /abonnements', function () {
        it('should get all subscriptions', async function () {
            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const [response] = await getWithAuth({ app, cookies }, '/api/abonnements')
            expect(response.statusCode).to.eq(200)
            expect(response.headers['content-type']).to.match(/json/)

            expect(response.body).to.be.an('array').and.not.be.empty
            expect(response.body[0]).to.have.all.keys([
                'id', 'id_client', 'date_debut', 'date_fin', 'vcores',
                'ram', 'os', 'disque', 'bande_passante', 'prix'
            ])
        })
    })

    describe('GET /abonnement/:id', function () {
        it('should get the specified subscription', async function () {
            const abonnementId = (await testDatabase.query("SELECT MAX(id) AS id from abonnement"))[0][0]['id']

            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const [response] = await getWithAuth({ app, cookies }, `/api/abonnement/${abonnementId}`)
            expect(response.statusCode).to.eq(200)
            expect(response.headers['content-type']).to.match(/json/)

            expect(response.body).to.be.an('object').and.not.be.empty
            expect(response.body).to.have.all.keys([
                'id', 'id_client', 'date_debut', 'date_fin', 'vcores',
                'ram', 'os', 'disque', 'bande_passante', 'prix'
            ])
        })
    })

    describe('POST /abonnement', function () {
        it('should create a subscription', async function () {
            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const payload = { vcores: 8,  ram: 2048, os: 'CentOS 7', disque: 500, vitesse_io: 100 }
            const [response] = await postWithAuth({ app, cookies }, '/api/abonnement', payload)
            
            expect(response.statusCode).to.eq(200)
            expect(response.headers['content-type']).to.match(/json/)
            expect(response.body).to.deep.eq({ message: 'ok' })
        })

        it('should not create a subscription if incomplete subsmission', async function () {
            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const payload = { vcores: 8,  ram: 2_048, os: 'CentOS 7' }
            const [response] = await postWithAuth({ app, cookies }, '/api/abonnement', payload)
            
            expect(response.statusCode).to.eq(400)
            expect(response.headers['content-type']).to.match(/json/)
            expect(response.body).to.deep.eq({ message: 'Missing properties' })
        })

        it('should note create a subscription if constraints are not met', async function () {
            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const payload = { vcores: 8,  ram: 512, os: 'CentOS 7', disque: 500, vitesse_io: 100 }
            const [response] = await postWithAuth({ app, cookies }, '/api/abonnement', payload)
            
            expect(response.statusCode).to.eq(400)
            expect(response.headers['content-type']).to.match(/json/)
            expect(response.body).to.deep.eq({ message: 'Invalid constraints' })
        })

        it('should not create a subscription if invalid properties', async function () {
            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const payload = { vcores: 8,  ram: 2_048, os: 'Kali Linux', disque: 500, vitesse_io: 100 }
            const [response] = await postWithAuth({ app, cookies }, '/api/abonnement', payload)
            
            expect(response.statusCode).to.eq(400)
            expect(response.headers['content-type']).to.match(/json/)
            expect(response.body).to.deep.eq({ message: 'Invalid properties' })
        })
    })

    describe('DELETE /abonnement/:abonnementId', function () {
        it('should delete a subscription', async function () {
            const abonnementId = (await testDatabase.query("SELECT MAX(id) AS id from abonnement"))[0][0]['id']

            const [loginResponse, cookies] = await loginAs(app, credential)
            expect(loginResponse.statusCode).to.eq(200)

            const [response] = await deleteWithAuth({ app, cookies }, `/api/abonnement/${abonnementId}`)
            
            expect(response.statusCode).to.eq(200)
            expect(response.headers['content-type']).to.match(/json/)
        })
    })
})