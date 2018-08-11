import 'whatwg-fetch'

/**
 * @module libs/GithubAPI
 * @author Paulo Ricardo Xavier Giusti
 */

 /**
 * authentication credentials
 * @type {String}
 * @inner
 */
 global.auth = null

 /**
 * Repos URI with replaceable name
 * @type {String}
 * @inner
 */
 const reposUrl = 'users/{username}/repos'


 /**
 * Main Github API url
 * @type {String}
 */
 const url = 'https://api.github.com/'

/**
 *
 *
 * @function
 * @param {Fetch.Response} response Fetch response to be validated
 * @throws {Error} response status code
 * @return {Fetch.Response} Fetch response
 */
const errorHandler = (response) => {
    if (!response.ok) {
        throw new Error(response.status)
    }
    return response
}

/**
 * request to `url` with `options`
 *
 * @function
 * @param {String} url
 * @param {String} options
 * @return {Object} Response payload parsed in JSON
 */
const request = (url, options) => fetch(url, {
        ...options,
        headers: new Headers({
            Accept: 'application/json',
            'Authorization': global.auth ? 'Basic ' + btoa(`${global.auth.username}:${global.auth.token}`) : '',
            'Content-Type': 'application/json',
        }),
    })
    .then(errorHandler)
    .then(response => response.json())

/**
* Format url to request Github for user's starred repos within parameters
* @function
* @param {String} username Github's username
* @return {String} Formated url to get user starred repos
* @alias module:libs/GithubAPI#formatRepoUrl
* @inner
*/
const formatRepoUrl = username => {
    if (!username) throw new Error('Needs the following parameters: username')
    if (typeof username !== 'string') throw new Error('Username must be a string')
    return (url + reposUrl).replace('{username}', username)
}

/**
 * Get username repos
 *
 * @function
 * @param {String} username
 * @return {Object} User repos
 */
const getRepos = username => request(formatRepoUrl(username), { method: 'GET' })
    .catch((e) => {
        if (e.message === '404') throw new Error('No repository found! ):')
        else throw new Error('Something got wrong! Try later!')
    })



/**
* authenticate on {@link Github API https://developer.github.com/v3/}
*
* @async
* @function
* @param {String} username Github's username
* @param {String} repo Repo name
* @return {Github.Languages[]} list of languages
* @alias module:libs/GithubAPI#authenticate
*/
const authenticate = (user, token) => { if (!global.auth) global.auth = { user, token } }

export {
    authenticate,
    getRepos,
}
