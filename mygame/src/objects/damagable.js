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
				const hp = this.hp();
				//if(hp < 0) this.destroy();
				this.enterState(hp > 0 ? "damage":"death");
			});

      this.onStateEnter("idle", () => {
        this.do("idle");
      });

			this.onStateEnter('damage', ()=>{
				this.do('damage')	
			});

			this.onStateEnter('death', async ()=>{
				this.do('death');
				await wait(0.25);
				return this.destroy();
			})

      this.onAnimEnd((anim) => {
        if (anim.startsWith("death")) return this.destroy();
        if (anim.startsWith("attack") || anim.startsWith("damage"))
          this.enterState("idle");
      });
    },

    takeDamage(dmg, knockback = 0, knockbackVector) {
      this.hurt(dmg);
      if (knockback)
        tween(
          this.pos,
          vec2(
            knockback * Math.cos(knockbackVector),
            knockback * Math.sin(knockbackVector)
          ).add(this.pos),
          0.2,
          (v) => (this.pos = v),
          easings.easeOutBack
        );
    },
  };
};
