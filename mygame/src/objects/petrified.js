export const petrified = () => ({
	id: 'petrified',
	require: ['area'],
	invulnerable: true,
	add(){
		this.onStateEnter('idlestone', ()=>{
			this.collisionIgnore = ['hitbox'];
		})
		
		this.onStateEnter('idle', ()=>{
			this.collisionIgnore = [];
		})
	},

	wakeUp(){
		this.enterState('idle');
	},
	fallAsleep(){
		this.enterState('idlestone');
	}
})