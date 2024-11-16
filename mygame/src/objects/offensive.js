
export const offensive = (hitbox) => {
	return {
		id: 'offensive',
		require: ['area', 'mobile', 'damage'],
		/**
		 * The offensive adds a hitbox if one is defined otherwise it replaces the hitbox with the entities area shape
		 */
		add(){
			if(hitbox){
				this.hitbox = this.add([area({shape: hitbox}), anchor('center'), rotate()])
			}
		},

		update(){
			this.hitbox?.rotateTo(this.viewAngle)
		},

		attack(){
			for(const c of this.hitbox.getCollisions()){
				if(c.target !== this && 'takeDamage' in c.target && typeof c.target.takeDamage === 'function') c.target.takeDamage(this.damageAmount, this.knockback, this.vec);
			}
		}
	}
}