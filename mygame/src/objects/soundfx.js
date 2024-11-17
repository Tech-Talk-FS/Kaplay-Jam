export const soundfx = (fx) => ({
	id: 'soundfx',
	fx,
	add(){
		for(const f in fx){
			if(typeof fx[f] === 'object'){
				const {name, ...op} = fx[f];
				this.onStateEnter(f, this.soundHandler(name,op).bind(this));
				this.onStateEnd(f, this.stopSound.bind(this));
			} else {
				this.onStateEnter(f, this.soundHandler(fx[f]).bind(this));
				this.onStateEnd(f, this.stopSound.bind(this));
			}
		}
	},
	soundHandler(name,ops){return ()=>this.currentfx = play(name, ops);},
	stopSound(){
		this.currentfx.stop();
		this.currentfx = undefined;
	}
})