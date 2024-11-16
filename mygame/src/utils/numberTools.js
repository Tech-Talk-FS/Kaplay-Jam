/**
 * 
 * @param {number} value - The value to be computed
 * @param {number} base - The base value of the current unit measure 
 * @param {number} dest - The equivalent amount in the new unit
 * @returns {number}
 */
export const convert = (value, base, dest) => value * dest / base;

/**
 * picks a value and returns if that value occured within the desired percentage.
 * @param {number} p - a decimal representation of a percentage
 * @returns 
 */
export const change = p => 1-rand(0,1) >= p;