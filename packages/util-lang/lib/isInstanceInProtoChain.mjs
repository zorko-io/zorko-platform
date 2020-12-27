/**
 * Check that source type has a destination type in it's prototype chain
 *  @param {Object} instance - type to start search from
 *  @param {ObjectConstructor} ancestor - type to finish search
 *  @returns {Boolean} -  true if destination is in source proto chain, false otherwise
 */

export function isInstanceInProtoChain(instance, ancestor) {
  // TODO: gh-82 Provide an implementation
  return instance instanceof ancestor
}
