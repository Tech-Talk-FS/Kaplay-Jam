import { directionalAnimationGenerator } from "./directionalAnimationGenerator";

const anims = [
	['idle', 5, {loop: true}],
	['walk', 5, {loop: true}],
    ['run', 5, {loop: true}],
    ['attack', 3],
    ['damage', 3],
	['death', 3],
];

export const loadPlayers = () =>{
	const directionalAnimations = directionalAnimationGenerator(...anims); //only need to make this once.
	for(let i = 0; i<6; i++){
		loadSprite(`player-${i}`, `assests/Player/player-${i}.png`, directionalAnimations);
	}
}