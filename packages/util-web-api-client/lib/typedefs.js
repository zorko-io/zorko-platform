/**
 * @typedef {Object} Collection<T>
 * @property {T[]} items - items in collection
 * @property {number} total - count of all available items
 * @property {number|undefined} [pagesLeft] - number of pages left, calculated according to passed offset and limit params
 */

/**
 * @typedef {Object} CommonParams<T> extends T
 * @property {number} offset - number of items to offset
 * @property {number} limit - [limit=10] -  limit response
 */
