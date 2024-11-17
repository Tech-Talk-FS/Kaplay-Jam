import { directionalAnimationGenerator } from "./directionalAnimationGenerator";

export const loadSlimeBall = () => loadSprite(
	'slime-ball', 
	'/enemies/slime.png',
	directionalAnimationGenerator(
		['idle', 3, {loop: true}],
		['walk', 5, {loop: true}],
		['attack', 5],
		['damage', 5],
		['death', 4]
	)
)