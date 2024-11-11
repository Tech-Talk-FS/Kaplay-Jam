import { BANNER, BONES, CENTER_TORCH, CHAIN_1, CHAIN_2, COIN, EAST_CORNER, EAST_JOINT, EAST_WALL_TILES, FLOOR_TILES, GOLD_KEY, IRON_KEY, LADDER, LARGE_CHEST_1, LARGE_CHEST_2, LARGE_DIRT, LARGE_HEALTH, LARGE_MANA, LARGE_WOOD_CHEST, LEFT_RECT_DOOR, LEFT_ROUND_DOOR, LEFT_TORCH, LEFT_VERT_DOOR, LEFT_WALL_ORNAMENT, LEFT_WEB, NORTH_WALL_TILES, RIGHT_RECT_DOOR, RIGHT_ROUND_DOOR, RIGHT_TORCH, RIGHT_VERT_DOOR, RIGHT_WALL_ORNAMENT, RIGHT_WEB, SHORT_CANDLE, SHORT_CANDLE_LIT, SKELETONS, SMALL_CHEST_1, SMALL_CHEST_2, SMALL_DIRT, SMALL_HEALTH, SMALL_MANA, SMALL_WOOD_CHEST, SOUTH_WALL_TILES, TALL_CANDLE, TALL_CANDLE_LIT, TRAPDOOR, WEST_CORNER, WEST_JOINT, WEST_WALL_TILES } from "./constants"

const TILE_DIM = {tileWidth: 16, tileHeight: 16}
const STATIC = () => [body({isStatic: true}), anchor('center')];
const OBSTACLE = () => [...STATIC(), area()]
const rnd = (range)=>({frame: ~~rand(...range)});
const sp = (tile) => sprite('tiles', Array.isArray(tile) ? rnd(tile):{frame: tile});
export const FLOOR_SHEET = {
	...TILE_DIM,
	tiles: {
		" ": () => [
			sp(FLOOR_TILES),
			body({isStatic: true}),
			anchor('center')
		],
	}
}

export const MAIN_SHEET = {
	...TILE_DIM,
	tiles: {
		"@": () => [
			rect(16, 16),
			...STATIC(),
			'plyr'
		],
		"=": () => [
			sp(NORTH_WALL_TILES),
			...OBSTACLE()
		],
		"_": () => [
			sp(SOUTH_WALL_TILES),
			...OBSTACLE()
		],
		"[": () => [
			sp(WEST_WALL_TILES),
			...OBSTACLE()
		],
		"]": () => [
			sp(EAST_WALL_TILES),
			...OBSTACLE()
		],
		",": () => [
			sp(WEST_CORNER),
			...OBSTACLE()
		],
		".": () => [
			sp(EAST_CORNER),
			...OBSTACLE()
		],
		"<": () => [
			sp(WEST_JOINT),
			...OBSTACLE()
		],
		">": () => [
			sp(EAST_JOINT),
			...OBSTACLE()
		],
		/**
		 * Doors and ornaments will have multiple tags so they can be selected in varying degress of granularity. 
		 * @returns 
		 */
		"?": () => [
			sp(LEFT_VERT_DOOR),
			...OBSTACLE(),
			'left-vert-door',
			'left-door',
			'door'
		],
		"/":() => [
			sp(RIGHT_VERT_DOOR),
			...OBSTACLE(),
			'right-vert-door',
			'right-door',
			'door',
		],
		")":()=>[
			sp(RIGHT_RECT_DOOR),
			...OBSTACLE(),
			'right-rect-door',
			'right-door',
			'door'
		],
		"(":()=>[
			sp(LEFT_RECT_DOOR),
			...OBSTACLE(),
			'left-rect-door',
			'left-door',
			'door'
		],
		"9":()=>[
			sp(LEFT_ROUND_DOOR),
			...OBSTACLE(),
			'left-round-door',
			'left-door',
			'door'
		],
		"0":()=>[
			sp(RIGHT_ROUND_DOOR),
			...OBSTACLE(),
			'right-round-door',
			'right-door',
			'door'
		],
		"H":()=>[
			sp(LADDER),
			...STATIC(),
			'ladder',
			'door'
		],
		"h":()=>[
			sp(TRAPDOOR),
			...STATIC(),
			'trap-door',
			'door'
		],
		"a":()=>[
			sp(SMALL_WOOD_CHEST),
			...OBSTACLE(),
			'small-wood-chest',
		],
		"s":()=>[
			sp(SMALL_CHEST_1),
			...OBSTACLE(),
			'small-chest-1',
			
		],
		"d":()=>[
			sp(SMALL_CHEST_2),
			...OBSTACLE(),
			'small-chest-2'
		],
		"A":()=>[
			sp(LARGE_WOOD_CHEST),
			...OBSTACLE(),
			'large-wood-chest',
		],
		"S":()=>[
			sp(LARGE_CHEST_1),
			...OBSTACLE(),
			'large-chest-1'
		],
		"D":()=>[
			sp(LARGE_CHEST_2),
			...OBSTACLE(),
			'large-chest-1'
		],
		"q":()=>[
			sp(SMALL_MANA),
			...STATIC(),
			'small-mana'
		],
		"Q":()=>[
			sp(LARGE_MANA),
			...STATIC(),
			'large-mana'
		],
		"w":()=>[
			sp(SMALL_HEALTH),
			...STATIC(),
			'small-healt'
		],
		"W":()=>[
			sp(LARGE_HEALTH),
			...STATIC(),
			'large-health'
		],
		"k":()=>[
			sp(IRON_KEY),
			...STATIC(),
			'iron-key'
		],
		"K":()=>[
			sp(GOLD_KEY),
			...STATIC(),
			'gold-key'
		],
		"c":()=>[
			sp(CHAIN_1),
			...STATIC(),
			'chain-1',
			'chain'
		],
		"C":()=>[
			sp(CHAIN_2),
			...STATIC(),
			'chain-2',
			'chain'
		],
		"x":()=>[
			sp(LEFT_WEB),
			...STATIC(),
			'left-web',
			'web'
		],
		"X":()=>[
			sp(RIGHT_WEB),
			...STATIC(),
			'right-web',
			'web'
		],
		"!":()=>[
			sp(CENTER_TORCH),
			...STATIC(),
			'center-torch',
			'torch'
		],
		"t":()=>[
			sp(LEFT_TORCH),
			...STATIC(),
			'left-torch',
			'torch'
		],
		"T":()=>[
			sp(RIGHT_TORCH),
			...STATIC(),
			'right-torch',
			'torch'
		],
		"l":()=>[
			sp(TALL_CANDLE),
			...STATIC(),
			'tall-candle',
			'torch'
		],
		"L":()=>[
			sp(TALL_CANDLE_LIT),
			...STATIC(),
			'tall-candle-lit',
			'torch'
		],
		"j":()=>[
			sp(SHORT_CANDLE),
			...STATIC(),
			'short-candle',
			'torch'
		],
		"J":()=>[
			sp(SHORT_CANDLE_LIT),
			...STATIC(),
			'short-candle-lit',
			'torch'
		],
		"b":()=>[
			sp(BANNER),
			...STATIC(),
			'banner'
		],
		"z":()=>[
			sp(BONES),
			...STATIC(),
			'bones'
		],
		"Z":()=>[
			sp(SKELETONS),
			...STATIC(),
			'skeleton'
		],
		"v":()=>[
			sp(LEFT_WALL_ORNAMENT),
			...STATIC(),
			'left-wall-ornament'
		],
		"V":()=>[
			sp(RIGHT_WALL_ORNAMENT),
			...STATIC(),
			'right-wall-ornament'
		],
		"n":()=>[
			sp(COIN),
			...STATIC(),
			'coin'
		],
		"m":()=>[
			sp(SMALL_DIRT),
			...STATIC(),
			'small-dirt'
		],
		"M":()=>[
			sp(LARGE_DIRT),
			...STATIC(),
			'large-dirt'
		]
	}
}