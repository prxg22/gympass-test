import 'whatwg-fetch'

/**
 * @module libs/GithubAPI
 * @author Paulo Ricardo Xavier Giusti
 */

/**
 * authentication credentials
 * @type {String}
 */
global.auth = null

/**
 * Repos URI with replaceable name
 * @type {String}
 *
 */
const reposUrl = 'users/{username}/repos'
const commitsUrl = 'repos/{full_name}/commits?page={page}&per_page={per_page}'


/**
 * Main Github API url
 * @type {String}
 */
const API_URL = 'https://api.github.com/'

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
        Authorization: global.auth ? btoa(`${global.auth.username}:${global.auth.token}`) : '',
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
*/
const formatRepoUrl = (username) => {
    if (!username) throw new Error('Needs the following parameters: username')
    if (typeof username !== 'string') throw new Error('Username must be a string')
    return (API_URL + reposUrl).replace('{username}', username)
}

/**
 * Format url to request Github for user's starred repos within parameters
 fetchCommits @function
 * @param {String} repo Repo
 * @return {String} Formated url to get repository commits
*/
const formatCommitUrl = (repo, page, limit) => {
    if (!repo) throw new Error('Needs the following parameters: username')
    if (typeof repo.full_name !== 'string') throw new Error('repo must be a string')
    return (API_URL + commitsUrl)
        .replace('{full_name}', repo.full_name)
        .replace('{page}', page || 1)
        .replace('{per_page}', limit || 20)
}

/**
 * Get username repos
 *
 * @function
 * @param {String} username
 * @return {Object} User repos
 */
const fetchRepos = username => request(formatRepoUrl(username), { method: 'GET' })
    .catch((e) => {
        if (e.message === '404') throw new Error('No repository found! ):')
        else throw new Error('Something got wrong! Try later!')
    })

/**
 * Get repo commits
 *
 * @function
 * @param {String} username
 * @return {Object} User repos
 */
const fetchCommits = repo => request(formatCommitUrl(repo), { method: 'GET' })
    .catch((e) => {
        if (e.message === '404') throw new Error('No repository found! ):')
        else throw new Error('Something got wrong! Try later!')
    })


/**
* authenticate on Github API
*
* @async
* @function
* @param {String} username Github's username
* @param {String} repo Repo name
* @return {Github.Languages[]} list of languages
*/
const authenticate = (user, token) => { if (!global.auth) global.auth = { user, token } }

export {
    authenticate,
    fetchRepos,
    fetchCommits,
}
