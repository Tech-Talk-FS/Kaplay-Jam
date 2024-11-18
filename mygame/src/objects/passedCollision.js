/**
 * 
 * @param {Array<[tag:string, (obj: import("kaplay").GameObj, col?:import("kaplay").Collision)]>} collisions 
 */
export const passedCollision = (...collisions) => ({
	id: 'passedCollision',
	add(){
		this.collisionBox = this.add([
			area({shape: this.shape ?? new Rect(vec2(0,0), 16, 16)})
		])
		for(const [tag, action] of collisions) this.collisionBox.onCollide(tag, (...args)=>action(...args, this));
		this.unuse('area');
	}
})