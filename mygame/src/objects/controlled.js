import { DIRS } from "../constants"

const DIRECTIONS = [
	["Left", -1, 0],
	["Right", 1,0],
	["Up", 0, -1],
	["Down", 0, 1]
]
export const controlled = () => {
	debug.inspect = true;
	return {
		id: 'controlled',
		require: ['mobile', 'offensive'],
		add(){
			this.onButtonPress('interact', () => {
				this.interactWith();
			});
			this.onButtonPress('attack', () => {
				console.log("Time to attack");
				this.attack();
			});
			
		},
		update(){
			camPos(this.pos);
			const vec = DIRECTIONS.filter(([k])=>isButtonDown(k)).reduce((o,[,...v])=>o.add(...v), vec2(0));
			if(!vec.isZero()){
				this.go(vec, Number(isKeyDown('shift')))
			} else {
				this.do('idle')
			}
		}
	}
}