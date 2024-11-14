

export const loadHUD = () => loadSpriteAtlas("assests/hud-ui.png", {
	heart: {
		x: 0,
		y: 0,
		width: 64,
		height: 16,
		sliceX: 4
	},
	panel: {
		x: 0,
		y: 32,
		width: 32,
		height: 32,
		slice9: {
			left: 4,
			top: 4,
			right: 4,
			bottom: 4
		}
	},
	sword: {
		x: 0,
		y: 64,
		width: 192,
		height: 224,
		sliceX: 6,
		sliceY: 5
	}
})

class HUD {
	characterLimit = 32
	lineLimit = 3
	//messages will be added to a queue this will allow for key based scrolling
	messageQueue = [];
	
	constructor(player){
		this.hp = 0
		//this will be sort of a controlled component so static placement info only needs to be handled once 
		this.$hud = add([
			rect(width(), height(), {fill: false}),
			outline(1, Color.fromHex(0xffff00)),
			pos(center()),
			anchor('center'),
			fixed()
		])
		this.player = player;
		this.$msg = this.$hud.add([
			sprite('panel', {width: 128, height: 32}),
			pos(0, height()/2),
			anchor('bot'),
		]);
		this.$msg.hidden = true;
		this.$text = this.$msg.add([
			text("", {color:{r:255,g:255,b:255}, size: 4, align:'center'}),
			pos(0, -12),
			anchor('bot'),
		]);
		this.$msg.add([
			//apparently cant set color in the initializer
			text('ENTER to continue', {size: 3}),
			anchor('bot'),
			pos(28, -5)
		]).color = Color.fromHex(0x888888)

		this.$msg.onKeyPress("enter", ()=>this.nextMessage());
		player.onUpdate(this.updateHealth.bind(this));
	}

	immediateMsg(...values){
		const msgs = [...this.messageQueue];
		this.messageQueue = [];
		this.msg(...values);
		this.messageQueue.push(...msgs)
	}
	/**
	 * Dialogs can be manually separated by adding more values. additionally each value provided will be split into dialogs based on the lineLimit
	 * @param  {...string} values 
	 */
	msg(...values){
		const reg = new RegExp(`\.{1,${this.characterLimit}}`,'g');
		const q = this.messageQueue.length;
		for(const value of values) {
			console.log(/.{1,2}/g,reg,value)
			const vs = value.match(reg);
			for(let i = 0; i<vs.length; i+=this.lineLimit){
				this.messageQueue.push(vs.slice(i, this.lineLimit+i).join('\n'));
			}
		}
		
		if(!q) return this.nextMessage(true);
	}

	nextMessage = (isInitial=false)=>{
		if(!isInitial) this.messageQueue.shift();
		this.$text.text = this.messageQueue[0] ?? "";
		this.$msg.hidden = !this.messageQueue.length;
	}

	updateHealth(){
		const hp = this.player.hp();
		if(this.hp === hp) return; //no need to update
		this.hp = hp; 
		if(this.$health){
			this.$health.destroy();
			delete this.$health;
		}
		
		this.$health = this.$hud.add([
			pos(-width()/2, height()/2),
			anchor('bot')
		]);
		const fullHearts = Math.floor(hp/4);
		const remainder = hp%4;
		if(fullHearts){
			const w = fullHearts*16;
			this.$health.add([
				sprite('heart', {frame: 3, tiled: true, width: w, height: 16}),
				pos(0,0),
				anchor('botleft')
			])
		}
		if(remainder>0) this.$health.add([
			sprite('heart', {frame: remainder-1, width: 16, height: 16}),
			pos(fullHearts*16, 0),
			anchor('botleft')
		])
	}
}

/**
 * Create hud object for the level
 * @param {import("kaplay").GameObj} player 
 * @returns 
 */
export const createHud = (player) => new HUD(player);