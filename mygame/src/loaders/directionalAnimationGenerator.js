import { DIRS } from "../constants";

/**
 * Each animation is expected to have 4 variations in the provided order. 
 * @param {number} maxX - The max columns expected
 * @param  {...ActionDefinition} opts - The actions being supported. these should be declared in the order they occure in the sprite grid.
 * @returns { import("kaplay").LoadSpriteOpt } - The arguments with the sliceX and sliceY as well as the animations. 
 */
export const directionalAnimationGenerator = (...opts) => {
	const maxX = Math.max(...opts.map(v=>v[1]))+1;
	const options = {
		sliceX: maxX,
		sliceY: opts.length*4,
		anims: opts.reduce((o,[name,x, op={}],i)=>{
			const y = i*4*maxX;
			DIRS.forEach((d,j)=>{
				const my = y + maxX*j
				o[name+d] = {
					from: my,
					to: my+x,
					...op
				}
			});
			return o;
		},{})
	};
	return options;
}