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
	}
})