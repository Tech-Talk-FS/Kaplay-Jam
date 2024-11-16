/**
 * This method assumes the component has an animation to be damaged. it also expects the entity to have a damage state and death state
 * @returns 
 */
export const damagable = () => {
	return {
		id: 'damagable',
		require: ['health', 'sprite', 'state', 'pos'],
		/**
		 * When the entity is added I will need to watch the on hurt
		 */
		add(){
			this.onHurt((amt)=>{
				this.enterState(this.hp() > 0 ? "damage":"death");
			});

			this.onStateEnter("idle", ()=>{
				this.do("idle")
			});

			this.onStateEnter('damage', ()=>{
				this.do('damage')
			});

			this.onStateEnter('death', ()=>{
				this.do('death')
			})

			this.onAnimEnd(anim=>{
				if(anim === "damage" || anim === "attack") this.enterState("idle");
				if(anim === "death") this.destroy();
			})
		},
		
		takeDamage(dmg, knockback=0, knockbackVector){
			this.hurt(dmg);
			if(knockback) tween(
				this.pos,
				vec2(knockback*Math.cos(knockbackVector), knockback*Math.sin(knockbackVector)).add(this.pos),
				0.2,
				v=>this.pos = v,
				easings.easeOutBack
			)
		}
	}

}