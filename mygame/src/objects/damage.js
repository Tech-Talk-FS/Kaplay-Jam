const DEFAULTS = {
    damageAmount: 1,
    attackSpeed: 0.25
}
export function damage({
    damageAmount=DEFAULTS.damageAmount, 
    attackSpeed=DEFAULTS.attackSpeed,
    hitbox
}=DEFAULTS) {
    return {
        id :"damage",
        require: ['area', 'mobile', 'state'], //knockback is not required but utilized if present
        damageAmount,
        attackSpeed,
        /**
		 * The offensive adds a hitbox if one is defined otherwise it replaces the hitbox with the entities area shape
		 */
		add(){
			if(hitbox){
				this.hitbox = this.add([area({shape: hitbox}), anchor('center'), rotate()])
			}

            this.onStateEnter('attack', async ()=>{
                this.do('attack');
                for(const c of this.hitbox.getCollisions()){
                    if(c.target !== this && 'takeDamage' in c.target && typeof c.target.takeDamage === 'function') c.target.takeDamage(this.damageAmount, this.knockback, this.vec);
                }
                await wait(1/this.attackSpeed);
                this.enterState('idle');
            });
		},

		update(){
			this.hitbox?.rotateTo(this.viewAngle)
		},

		attack(){
            if(this.state === 'attack') return;
            this.enterState('attack');
		},



        inspect() {
            return `damage: ${damageAmount}`;
        },
    }
    
}