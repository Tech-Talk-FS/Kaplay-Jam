export const loadDungeonTiles = () => loadSpriteAtlas("assests/Dungeon_Tileset.png", {
	//treating all the tiles as the same type of entity at this level allows less lookups during render. why use two arrays when I can use one.
	tiles: {
		x: 0,
		y: 0,
		width: 128,
		height: 128,
		sliceX: 8,
		sliceY: 8
	}
});