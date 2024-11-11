/**
 * Just a method to simplify adding text bubbles over an object.
 * @param {import("kaplay").GameObj} obj 
 * @param {string} txt
 * @param {number} time 
 * @param {number} [x]
 * @param {number} [y]
 */
export const modal = (obj, txt, time, x=0, y=-12) => {
	obj.modal = obj.model ?? obj.add([
		text(txt, {size: 4, align: 'center', background: '#FFF'}),
		pos(x,y),
		anchor('center'),
		{timeout: setTimeout(()=>{ //later I might add a refresh token but for now it just ignored subsequent request while its visible.
			obj.remove(obj.modal)
			delete obj.modal;
		},time)}
	])
}