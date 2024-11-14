

export const loadHUD = () => loadSpriteAtlas("assests/hud-ui.png", {
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
	}
})

class HUD {
	characterLimit = 32
	lineLimit = 3
	//messages will be added to a queue this will allow for key based scrolling
	messageQueue = [];
	constructor(){
		this.$msg = add([
			sprite('panel', {width: 128, height: 32}),
			pos(width()/2, height()-16),
			anchor('center'),
			fixed(),
		]);
		this.$msg.hidden = true;
		this.$text = this.$msg.add([
			text("", {color:{r:255,g:255,b:255}, size: 4, align:'center'}),
			anchor('center'),
		]);
		this.$msg.add([
			//apparently cant set color in the initializer
			text('ENTER to continue', {size: 3}),
			anchor('center'),
			pos(28, 9)
		]).color = Color.fromHex(0x888888)

		this.$msg.onKeyPress("enter", ()=>this.nextMessage());
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
		console.log(this.messageQueue);
		this.$text.text = this.messageQueue[0] ?? "";
		this.$msg.hidden = !this.messageQueue.length;
	}
}

export const createHud = () => new HUD();