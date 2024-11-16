/**
 * @typedef {object} EnemyOptions
 * @param {import("kaplay").Vec2[]} [path] - The paths to follow, this should be an array of units it will be multiplied by the characters speed
 * @param {[char: string, chance: number][]} - The drop percentage
 */
/**
 * 
 */
export const enemy = ({
	path
} = {}) => ({
	id: 'enemy',
	require: ['damage', 'damagable'],
	add(){
		
	}
})