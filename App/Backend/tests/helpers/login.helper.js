const request = require('supertest')
const bcrypt = require('bcrypt')

function parseCookies(cookie) {
    return cookie
        ? Object.fromEntries(cookie.map( v => {
            const [key, ...value] = v.split('=')
            return [key, value.join('=')]
        }))
        : {}
}

function extractRawCookies(response) {
    return response ? response.headers['set-cookie'] : []
}

module.exports.loginAs = async function (app, { username, password }) {
    let response

    const doLogin = async () => {
        const rawCookies = extractRawCookies(response)
        const cookies = parseCookies(rawCookies)
    
        return request(app)
            .post('/api/login') 
            .send({ username, password })
            .set('Cookie', rawCookies)
            .withCredentials()
            .set('X-CSRF-TOKEN', (cookies['XSRF-TOKEN'] || '').split(';')[0])
            .expect('set-cookie', /XSRF-TOKEN=[^;]+; Path=\//)
    }

    response = await doLogin()
    if (response.status === 403) response = await doLogin()
    return [response, extractRawCookies(response)]
}

module.exports.getWithAuth = async function ({ app, cookies: rawCookies }, url, query={}) {
    const cookies = parseCookies(rawCookies)
    const response = await request(app)
        .get(url)
        .query(query)
        .set('Cookie', rawCookies)
        .withCredentials()
        .set('X-CSRF-TOKEN', (cookies['XSRF-TOKEN'] || '').split(';')[0])
        .expect('set-cookie', /XSRF-TOKEN=[^;]+; Path=\//)

    return [response, extractRawCookies(response)]
}

module.exports.postWithAuth = async function ({ app, cookies: rawCookies }, url, body={}) {
    const cookies = parseCookies(rawCookies)
    const response = await request(app)
        .post(url)
        .send(body)
        .set('Cookie', rawCookies)
        .withCredentials()
        .set('X-CSRF-TOKEN', (cookies['XSRF-TOKEN'] || '').split(';')[0])
        .expect('set-cookie', /XSRF-TOKEN=[^;]+; Path=\//)

    return [response, extractRawCookies(response)]
}

module.exports.deleteWithAuth = async function ({ app, cookies: rawCookies }, url) {
    const cookies = parseCookies(rawCookies)
    const response = await request(app)
        .delete(url)
        .set('Cookie', rawCookies)
        .withCredentials()
        .set('X-CSRF-TOKEN', (cookies['XSRF-TOKEN'] || '').split(';')[0])
        .expect('set-cookie', /XSRF-TOKEN=[^;]+; Path=\//)

    return [response, extractRawCookies(response)]
}

module.exports.createUser = async function (db, { nom, prenom, email, password }) {
    try {
        await db.query(
            'INSERT INTO compte (nom, prenom, email, password) VALUES (?, ?, ?, ?)',
            [nom, prenom, email, await bcrypt.hash(password, 10)]
        )
    } catch (error) {
        console.error(error)
    }
}