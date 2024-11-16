import { directionalAnimationGenerator } from "./directionalAnimationGenerator";

const anims = [
	["idle", 5, { loop: true }],
	["walk", 5, { loop: true }],
	["attack", 5],
	["damage", 3],
	["death", 3],
];

export const loadSkeletons = () => {
	loadSprite(
		"skeleton",
		"assests/enemies/skeleton.png",
		directionalAnimationGenerator(...anims)
	);
}