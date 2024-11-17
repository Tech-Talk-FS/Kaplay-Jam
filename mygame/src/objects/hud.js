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
	shouldUnpause: false,
	isHelpActive: false,
	isInfoActive: false,
	//its beginning to look a lot like... a state machine
	add(){
		this.hud = add([
			rect(width(), height(), {fill: false}),
			outline(1, Color.fromHex(0xffff00)),
			fixed()
		]);
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
			
		]);

		const infoBtn = this.controlPanel.add([
			sprite('button', {frame: 0, width: 12, height: 12}),
			pos(-5, -26),
			anchor('topright'),
			area()
		]);

		const infoIcon = infoBtn.add([
			sprite('info', {frame: 0, width: 8, height: 8}),
			pos(-6, 5),
			anchor('center')
		]);

		const helpBtn = this.controlPanel.add([
			sprite('button', {frame: 0, width: 12, height: 12}),
			pos(-15, -26),
			anchor('topright'),
			area()
		]);

		const helpIcon = helpBtn.add([
			sprite('help', {frame: 0, width: 8, height: 8}),
			pos(-6, 5),
			anchor('center')
		]);

		const soundBtn = this.controlPanel.add([
			sprite('button', {frame: 0, width: 12, height: 12}),
			pos(-5, -16),
			anchor('topright'),
			area()
		]);

		const soundIcon = soundBtn.add([
			sprite('sound', {frame: 0, width: 8, height: 8}),
			pos(-6, 5),
			anchor('center')
		]);

		soundBtn.onHover(()=>{
			soundIcon.frame = Number(DM.mute)+2
		});
		soundBtn.onHoverEnd(()=>{
			soundIcon.frame = Number(DM.mute)
		});
		
		soundBtn.onClick(async ()=>{
			DM.mute = !DM.mute;
			soundIcon.frame = DM.mute ? 5:4;
			await wait(0.05);
			const f = Number(soundBtn.isHovering())*2 + Number(DM.mute);
			console.log(f);
			soundIcon.frame = f;
		});

		helpBtn.onClick(async () => {
			if(this.isHelpActive){
				this.isHelpActive = false;
				if(this.shouldUnpause) DM.paused = false;
				this.modal?.destroy()
				return;
			} else {
				this.isHelpActive = true;
			}
			this.shouldUnpause = !DM.paused
			DM.paused = true;
			helpIcon.frame = 2;
			await wait(0.05);
			helpIcon.frame = Number(soundBtn.isHovering());
			
			if(this.modal){
				this.modal.destroy();
			}
			this.modal = this.hud.add([
				sprite('panel', {width: 128, height: 128}),
				pos(center()),
				anchor('center')
			]);
			this.hud.paused = false
			this.modal.add([
				sprite('spaceBar', {width: 32, height: 16, anim:'move'}),
				anchor('center'),
				pos(-28,-32)
			]);
			this.modal.add([
				text("Attack", {size: 8}),
				anchor('right'),
				pos(42,-30)
			]);
			this.modal.add([
				sprite('w', {width: 16, height:16, anim:'move'}),
				anchor('center'),
				pos(-22, -16)
			]);
			this.modal.add([
				sprite('a', {width: 16, height: 16, anim:'move'}),
				anchor('center'),
				pos(-36,-4)
			]);
			this.modal.add([
				sprite('s', {width: 16, height: 16, anim:'move'}),
				anchor('center'),
				pos(-22, -4)
			]);
			this.modal.add([
				sprite('d', {width: 16, height: 16, anim:'move'}),
				anchor('center'),
				pos(-8, -4)
			]);
			this.modal.add([
				text("Move", {size: 8}),
				anchor('right'),
				pos(42, -8)
			]);
			this.modal.add([
				sprite('shift', {width: 24, height: 16, anim:'move'}),
				anchor('center'),
				pos(-32, 14)
			]);
			this.modal.add([
				text("Run", {size: 8}),
				anchor('right'),
				pos(42, 14)
			]);
			this.modal.add([
				sprite('f', {width: 16, height: 16, anim:'move'}),
				anchor('center'),
				pos(-36, 32)
			]);
			this.modal.add([
				text("Interact", {size: 8}),
				anchor('right'),
				pos(42, 34)
			]);
		});

		helpBtn.onHover(()=>{
			helpIcon.frame = 1;
		})
		
		helpBtn.onHoverEnd(()=>{
			helpIcon.frame = 0;
		});

		infoBtn.onHover(()=>{
			infoBtn.frame = 1;
		});

		infoBtn.onHoverEnd(()=>{
			infoBtn.frame = 0;
		});


		infoBtn.onClick(async ()=>{
			if(this.isInfoActive){
				this.isInfoActive = false;
				if(this.shouldUnpause) DM.paused = false;
				this.modal?.destroy()
				return;
			} else {
				this.isInfoActive = true;
			}
			this.shouldUnpause = !DM.paused
			DM.paused = true;
			infoIcon.frame = 2;
			await wait(0.05);
			infoIcon.frame = Number(soundBtn.isHovering());
			if(this.modal){
				this.modal.destroy();
			}
			this.modal = this.hud.add([
				sprite('panel', {width: 128, height: 128}),
				pos(center()),
				anchor('center')
			]);
			this.modal.add([
				text(`Meet the creators of ... 
what our name again?

Brad Beltowski,
Bradley Matera,
Carlos Mendez,
James Irwin,
Level Lawrence`, {size: 5, align: 'center'}),
				anchor('center'),
				pos(0,0)
			])
		})
		
	},

	drawDungeonName(){
		if(!DM.dungeonName) return;
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