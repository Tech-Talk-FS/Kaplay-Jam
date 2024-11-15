const hrt = {sprite: 'heart', width: 16, height: 16, anchor: 'botleft'};

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
		height: 160,
		sliceX: 6,
		sliceY: 5
	},
	help: {
		x: 32,
		y: 220,
		width: 16,
		height: 16
	}
})

class HUD {
	characterLimit = 32
	lineLimit = 3
	//messages will be added to a queue this will allow for key based scrolling
	messageQueue = [];
	
	constructor(player){
		this.hp = 0
		this.player = player;
		this.player.hud = this;

		//handle dialog
		player.onKeyPress("enter", ()=>this.nextMessage());

		//player.onUpdate(this.updateHealth.bind(this));
		player.onDraw(this.onDraw.bind(this));
	}

	/**
	 * This method will be used to handle the ondraw method. this will be used to draw the sprites that dont need a large amount of control. 
	 * @private
	 */
	onDraw(){
		this.drawWeapon();
		this.drawHealth();
		this.drawMessageBox();
	}

	/**
	 * draw weapon
	 * @returns 
	 */
	drawMessageBox(){
		if(!this.messageQueue.length) return;
		drawSprite({
			sprite: 'panel',
			anchor: 'bot',
			pos: vec2(0, height()/2),
			width: 128,
			height: 32
		});
		drawText({
			text: this.messageQueue[0],
			size: 4,
			width: 128,
			height: 32,
			align: 'center',
			anchor: 'bot',
			pos: vec2(0, height()/2-12),
		});
		drawText({
			text: 'ENTER to continue',
			size: 3,
			align: 'right',
			anchor: 'botright',
			pos: vec2(42, height()/2-6),
			color: rgb(128,128,128)
		});
	}

	/**
	 * @private
	 */
	drawHealth(){
		const hp = this.player.hp();
		const fullHeartsWidth = Math.floor(hp/4);
		const rem = hp%4;
		
		const btm = height()/2
		//render the health
		for(let i = 0; i<fullHeartsWidth;i++){
			drawSprite({
				frame: 3,
				pos: vec2(-width()/2+i*16, btm),
				...hrt
			});
		}
		if(rem) drawSprite({	
			frame: rem-1,
			pos: vec2(-width()/2+fullHeartsWidth*16, btm),
			...hrt
		});
	}

	drawWeapon(){
		//if(!this.player.weapon) return;
		drawSprite({
			sprite: 'sword',
			frame: 0,
			width: 16,
			height: 16,
			pos: vec2(-width()/2+4, height()/2-16),
			anchor: 'botleft'
		})
	}

	/**
	 * Prepends the message to the message queue.
	 * @param  {...any} values 
	 */
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
			const vs = value.match(reg);
			for(let i = 0; i<vs.length; i+=this.lineLimit){
				this.messageQueue.push(vs.slice(i, this.lineLimit+i).join('\n'));
			}
		}
		
		if(!q) return this.nextMessage(true);
	}

	nextMessage = (isInitial=false)=>{
		if(!isInitial) this.messageQueue.shift();
	}
}

/**
 * Create hud object for the level
 * @param {import("kaplay").GameObj} player 
 * @returns 
 */
export const createHud = (player) => new HUD(player);