import { directionalAnimationGenerator } from "./directionalAnimationGenerator";

export const loadGoblinStatus = () => loadSprite(
	'goblin-statue', 
	'/enemies/goblin-statue.png', 
	directionalAnimationGenerator(
		['idlestone', 0, {loop: true}], //not sure why I made this animated
		['idle', 3, {loop: true}],
		['walk', 5, {loop: true}],
		['attack', 5],
		['damage', 5],
		['death', 7]
	)
)