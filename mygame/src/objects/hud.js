import { splitByLengthAndNewLine } from "../utils/stringTools";

const hrt = {sprite: 'heart', width: 16, height: 16, anchor: 'botleft', fixed: true};
/**
 * Attatches the hud element to the provided character
 * @returns 
 */
export const hud = ()=>({
	id: 'hud',
	require: ['damage', 'health'],
	messageQueue: [],
	add(){
		this.hud = addLevel(['#'], {tileWidth: width(), tileHeight: height(), tiles: {
			"#": ()=>[
				rect(width(), height(), {fill:false}),
				anchor('topleft'),
				//outline(1, Color.fromHex(0xffff00)),
				fixed()
			]
		}});
		this.hud.onDraw(()=>{
			this.drawWeapon();
			this.drawHealth();
			this.drawMessageBox();
			this.drawDungeonName();
		});

		this.onKeyPress('enter', ()=>{
			if(this.messageQueue.length) this.messageQueue.shift();
			if(!this.messageQueue.length) DM.paused = false;
		});

		//add interactive buttons to panel on the right side. 
		this.controlPanel = this.hud.add([
			sprite('panel', {width: 32, height: 32}),
			anchor('botright'),
			pos(width(), height()),
			fixed()
		]);

		const infoBtn = this.controlPanel.add([
			sprite('button', {frame: 0, width: 12, height: 12}),
			pos(-5, -26),
			anchor('topright')
		]);

		infoBtn.add([
			sprite('info', {frame: 0, width: 8, height: 8}),
			pos(-6, 5),
			anchor('center')
		]);

		const helpBtn = this.controlPanel.add([
			sprite('button', {frame: 0, width: 12, height: 12}),
			pos(-15, -26),
			anchor('topright')
		]);
		const soundBtn = this.controlPanel.add([
			sprite('button', {frame: 0, width: 12, height: 12}),
			pos(-5, -16),
			anchor('topright')
		]);
	},

	drawDungeonName(){
		drawSprite({
			sprite: 'panel',
			width: 64,
			height: 16,
			pos: vec2(4, 4),
			anchor: 'topleft',
			fixed: true
		});
		drawText({
			text: DM.dungeonName,
			size: 4,
			anchor: 'center',
			pos: vec2(36,12),
			fixed: true
		})
	},

	drawWeapon(){
		
		if(this.damageAmount-1 < 0) return;
		drawSprite({
			sprite: 'sword',
			frame: this.damageAmount-1,
			width: 16,
			height: 16,
			pos: vec2(4,height()-16),
			anchor: 'botleft',
			fixed: true
		})
	},

	/**
	 * @private
	 */
	drawHealth(){
		const hp = this.hp();
		const fullHeartsWidth = Math.floor(hp/4);
		const rem = hp%4;
		//render the health
		for(let i = 0; i<fullHeartsWidth;i++){
			drawSprite({
				frame: 3,
				pos: vec2(i*16, height()),
				...hrt
			});
		}
		if(rem > 0) drawSprite({	
			frame: rem-1,
			pos: vec2(fullHeartsWidth*16, height()),
			...hrt
		});
	},

	/**
	 * draw weapon
	 * @returns 
	 */
	drawMessageBox(){
		if(!this.messageQueue.length) return;
		
		drawSprite({
			sprite: 'panel',
			anchor: 'bot',
			pos: vec2(width()/2, height()),
			width: 128,
			height: 32,
			fixed: true
		});
		drawText({
			text: this.messageQueue[0],
			size: 4,
			width: 128,
			height: 32,
			align: 'center',
			anchor: 'bot',
			pos: vec2(width()/2, height()-14),
			fixed: true
		});
		drawText({
			text: 'ENTER to continue',
			size: 3,
			align: 'right',
			anchor: 'botright',
			pos: vec2(width()/2+42, height()-6),
			color: rgb(128,128,128),
			fixed: true
		});
	},

	dialog(msg, pause=true, timeout){
		if(timeout) return setTimeout(()=>this.dialog(msg, pause), timeout);
		//split the msg by new lines and by characters
		const lines = splitByLengthAndNewLine(msg, 32);
		DM.paused = pause
		this.messageQueue = [];
		for(let i = 0; i<lines.length; i+=3){
			this.messageQueue.push(lines.slice(i,i+3).join('\n'))
		}
	}	
})