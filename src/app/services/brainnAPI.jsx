import 'whatwg-fetch'

/**
 * API url
 * @type String
 */
const API_URL = 'http://127.0.0.1:3000/'

/**
 * request to `url` with method `options`
 *
 * @function
 * @param {Fetch.Response} response Fetch response to be validated
 * @throws {Number} response status code
 * @return {Fetch.Response} Fetch response
 */
const errorHandler = (response) => {
    if (!response.ok) {
        throw new Error(response.status)
    }
    return response
}

/**
 * request to `url` with method `options`
 *
 * @function
 * @param {String} url
 * @param {String} options
 * @return {Object} Response payload parsed in JSON
 */
const request = (url, options) => fetch(url, {
    ...options,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})
    .then(errorHandler)
    .then(response => response.json())

/**
 * Get username repos
 *
 * @function
 * @param {String} username
 * @return {Object} User repos
 */
const getUserRepos = username => request(`${API_URL}repo/user/${username}`, { method: 'GET' })
    .catch((e) => {
        if (e.message === '404') throw new Error('No repository found! ):')
        else throw new Error('Something got wrong! Try later!')
    })

/**
  * Search repos
  *
  * @function
  * @param {String} username
  * @param {Array<String>} tag
  * @return {Object} Filtered repos
  */
const getRepos = (username, tags) => request(`${API_URL}repo/?starredBy=${username}&tags=${JSON.stringify(tags)}`)
    .catch((e) => {
        if (e.message === 404) throw new Error('No repository found! ):')
        else throw new Error('Something got wrong! Try later!')
    })

/**
  * Update repo tags
  *
  * @function
  * @param {String} username
  * @param {String} _id repo id
  * @param {Array<String>} tags tags to be inserted
  * @return {Object} Filtered repos
  */
const updateRepoTags = (_id, tags) => {
    return request(`${API_URL}repo/${_id}/tags`, { method: 'POST', body: JSON.stringify({tags})  })
    .catch((e) => {
        if (e.message === '400') throw new Error('These tags are not valid')
        if (e.message === '404') throw new Error('Repo not found')
        throw new Error('Something got wrong! Try later!')
    })
}


export default {
    getUserRepos,
    getRepos,
    updateRepoTags,
}
