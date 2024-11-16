/**
 * Possibly the most powerful component and the easiest to abuse. 
 * 
 * because you cannot have duplicate keys this will serve as a flag when combining sheets. 
 * 
 * @warning Dont use this in the primary sheet.
 * @param {*} mods 
 * @returns 
 * @example
 * tiles: {
 * 	$: ()=>[
 * mod({attackSpeed: 1, damageAmount: 10}), //changes the attack speed previously declared without having to redeclare the entire object
 * ]
 * }
 */
export const mod = (mods)=>({id: 'mods', ...mods});