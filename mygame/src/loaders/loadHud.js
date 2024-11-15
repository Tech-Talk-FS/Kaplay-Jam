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
});