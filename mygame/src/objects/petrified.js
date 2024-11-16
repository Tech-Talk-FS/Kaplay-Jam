export const petrified = () => ({
	id: 'petrified',
	require: ['area', 'state'],
	invulnerable: true,
	add(){
		this.onStateEnter('sleep', ()=>{
			this.collisionIgnore = ['hitbox'];
			console.log("Im petrified");
		});
		
		this.onStateEnter('idle', ()=>{
			this.collisionIgnore = [];
		});
	},

	wakeUp(){
		this.enterState('idle');
	},
	fallAsleep(){
		this.enterState('sleep');
	}
})