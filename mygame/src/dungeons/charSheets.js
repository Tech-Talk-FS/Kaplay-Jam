import { createPlayer } from "../player";
import { FLOOR_TILE_RANGE, HORIZONTAL_WALL_TILE_RANGE } from "./constants"

const TILE_DIM = {tileWidth: 16, tileHeight: 16}
const STATIC = () => [body({isStatic: true}), anchor('center')];
const OBSTACLE = () => [...STATIC(), area()]
const rnd = (range)=>({frame: ~~rand(...range)});

export const FLOOR_SHEET = {
	...TILE_DIM,
	tiles: {
		" ": () => [
			sprite('tiles', rnd(FLOOR_TILE_RANGE)),
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
			sprite('tiles',rnd(HORIZONTAL_WALL_TILE_RANGE)),
			...OBSTACLE()
		]
	}
}