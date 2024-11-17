/**
 * The hazard component makes any static component with an area and adds a mechanic to cause damage and knockback
 * 
 * This component expects a state with ['idle', 'attack'] to work, along with an area() tag which it uses to get collisions.
 * 
 * 
 * @param {number} damageAmount 
 * @param {number} [knockback] - defaults to 0
 * @param {number} [attackDelay] - defaults to 1
 * @returns 
 */
export const hazard = (damageAmount, knockback=0, attackDelay=1) => ({
	id: 'hazard',
	require: ['area', 'state'],
	damageAmount,
	knockback,

	add(){
		console.log("Adding");
		this.onStateUpdate('idle', ()=>{
			for(const c of this.getCollisions()){
				if(c.target.is('player')) return this.enterState('attack');
			}
		});

		this.onStateEnter('attack', async ()=>{
			for(const c of this.getCollisions()){
				if(c.target !== this && 'takeDamage' in c.target && typeof c.target.takeDamage === 'function') c.target.takeDamage(this.damageAmount, this.knockback, c.target.vec * Math.PI);
			}
			await wait(attackDelay);
			this.enterState('idle');
		})
	},
	destroy(){
		
	}
})