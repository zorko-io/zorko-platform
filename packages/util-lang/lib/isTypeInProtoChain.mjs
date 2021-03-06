/**
 * Check that source type has a destination type in it's prototype chain
 *  @param {ObjectConstructor} source - type to start search from
 *  @param {ObjectConstructor} destination - type to finish search
 *  @returns {Boolean} -  true if destination is in source proto chain, false otherwise
 */

export function isTypeInProtoChain(source, destination) {
  return source.prototype instanceof destination
}
