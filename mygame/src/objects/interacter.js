export const interacter = (reach) => ({
	id: 'interacter',
	require: ['area', 'mobile'],
	
	add(){
		this.reach = this.add([area({shape: reach}), anchor('center'), rotate()]);
	},

	update(){
		this.reach.rotateTo(this.viewAngle)
	},

	/**
	 * Attempts to interact with all objects within the area... one at a time
	 */
	async interactWith(){
		for(const c of this.reach.getCollisions()){
			if('interact' in c.target && typeof c.target.interact === 'function'){
				await c.target.interact(this);
			}
		}
	}
})