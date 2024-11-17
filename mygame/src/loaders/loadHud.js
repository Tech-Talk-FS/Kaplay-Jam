export const loadHUD = () => loadSpriteAtlas("./hudui.png", {
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
		x: 0,
		y: 320,
		width: 16,
		height: 48,
		sliceY: 3
	},
	info: {
		x: 16,
		y: 320,
		sliceY: 3,
		width: 16,
		height: 48
	},
	sound: {
		x: 32,
		y: 320,
		sliceX: 2,
		sliceY: 3,
		width: 32,
		height: 48
	},
	button: {
		x:64,
		y: 320,
		sliceX: 2,
		width: 64,
		height: 32
	},
	spaceBar: {
		x: 64,
		y: 224,
		width: 128,
		height: 32,
		sliceX:2,
		anims: {
			move: {
				from: 0,
				to: 1,
				loop: true
			}
		}
	},

	f:{
		x: 0,
		y: 224,
		width: 64,
		height: 32,
		sliceX: 2,
		anims: {
			move: {
				from: 0,
				to: 1,
				loop: true
			}
		}
	},

	w: {
		x: 0,
		y: 256,
		width: 64,
		height: 32,
		sliceX: 2,
		anims: {
			move: {
				from: 0,
				to: 1,
				loop: true
			}
		}
	},

	a: {
		x: 64,
		y: 256,
		width: 64,
		height: 32,
		sliceX: 2,
		anims: {
			move: {
				from: 0,
				to: 1,
				loop: true
			}
		}
	},

	s: {
		x: 128,
		y: 256,
		width: 64,
		height: 32,
		sliceX: 2,
		anims: {
			move: {
				from: 0,
				to: 1,
				loop: true
			}
		}
	},

	d: {
		x: 0,
		y: 288,
		width: 64,
		height: 32,
		sliceX: 2,
		anims: {
			move: {
				from: 0,
				to: 1,
				loop: true
			}
		}
	},

	shift: {
		x: 64,
		y: 288,
		width: 96,
		height: 32,
		sliceX: 2,
		anims: {
			move: {
				from: 0,
				to: 1,
				loop: true
			}
		}
	}
});