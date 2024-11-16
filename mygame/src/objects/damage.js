export function damage(damageAmount=1, hitbox) {
    return {
        id :"damage",
        require: ['area', 'mobile', 'state'], //knockback is not required but utilized if present
        damageAmount,
        
        /**
		 * The offensive adds a hitbox if one is defined otherwise it replaces the hitbox with the entities area shape
		 */
		add(){
			if(hitbox){
				this.hitbox = this.add([area({shape: hitbox}), anchor('center'), rotate()])
			}

            this.onStateEnter('attack', ()=>{
                for(const c of this.hitbox.getCollisions()){
                    if(c.target !== this && 'takeDamage' in c.target && typeof c.target.takeDamage === 'function') c.target.takeDamage(this.damageAmount, this.knockback, this.vec);
                }
            });

            this.onAnimEnd(anim => {
                if(anim === 'attack') this.enterState('idle');
            })
		},

		update(){
			this.hitbox?.rotateTo(this.viewAngle)
		},

		attack(){
            if(this.do('attack')) this.enterState('attack');
		},



        inspect() {
            return `damage: ${damageAmount}`;
        },
    }
    
}