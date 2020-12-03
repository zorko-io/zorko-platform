/**
 * @typedef {Object} LoginRequest
 * @property {string} login - user login
 * @property {string} password - user password
 */

/**
 * @typedef {Object} LoginResponse
 * @property {string} token - JSON Web Token
 * @property {string} uid - user unique identifier
 * @property {string} email - user email
 * @property {string} name - user name
 */

/**
 * @typedef {Array<Object>} PreviewResponse
 * @property {string} title - preview title
 * @property {string} previewUrl - preview URL
 * @property {string} contentUrl - content URL
 * @property {string} createAt - ISO 8601 time stamp
 * @property {Object} author - previews author details
 * @property {string} author.login - previews author login
 * @property {string} author.avatarUrl - previews author avatar URL
 */
