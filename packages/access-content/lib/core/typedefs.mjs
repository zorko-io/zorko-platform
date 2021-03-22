/**
 * @typedef RepositoryResourceProperties
 * @property {String} id
 * @property {String} permission
 * @property {Boolean} isFolder
 * @property {String} name
` * @property {String} mime
 * @property {String} [preview/thumbnail]
 * @property {String} createdAt/updatedAt ...
 * @property {String} contentUri - uri to content
*/

/**
 * @typedef RepositoryProperties
 * @property {String} id
 * @property {String} owner
 * @property {String} name
 *
 */

/**
 * @typedef VisualizationProperties
 * @property {String} id
 * @property {Object} spec - definition of visualization
 * @property {String} format - 'vega' or 'vega-lite'
 * @property {PropertiesMap} parametrization - parametrization for specification
 */


/**
 * @typedef DataReferenceProperties
 * @property {String} id
 * @property {Object} connection - various connection attributes like db type, dns, ports, credentials etc
 */


/**
 * Contains a key/value configuration to parametrize json-like documents
 * @typedef PropertiesMap
 */

/**
 *
 *
 * @typedef SecretProperties
 * @property {String} id
 * @property {String} name - name of the secret, like 'joe_db_password'
 * @property {String} value - encrypted value
 **/