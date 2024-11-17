import { DIRS } from "../constants"

const DIRECTIONS = [
	["Left", -1, 0],
	["Right", 1,0],
	["Up", 0, -1],
	["Down", 0, 1]
]
export const controlled = () => {
	// debug.inspect = true;
	return {
		id: 'controlled',
		require: ['mobile', 'damage'],
		add(){
			this.onButtonPress('interact', () => {
				if(DM.paused) return;
				this.interactWith();
			});
			this.onButtonPress('attack', () => {
				if(DM.paused) return;
				this.attack();
			});
			this.onDestroy(()=>{
				if(this.hp() <= 0) go("main", 0)
			});
			this.onHurt(()=>{
				const hp = this.hp();
				if(hp > 0){
					DM.locals.health = hp;
				}
			})
		},
		update(){
			camPos(this.pos);
			const vec = DIRECTIONS.filter(([k])=>isButtonDown(k)).reduce((o,[,...v])=>o.add(...v), vec2(0));
			if(!vec.isZero()){
				this.go(vec, Number(isKeyDown('shift')))
			} else {
				this.do('idle')
			}
		},

		increaseHealth(amt){
			this.heal(amt);
			DM.locals.health = this.hp();
		},

		increaseDamage(){
			DM.locals.damageAmount++;
			this.damageAmount = DM.locals.damageAmount
		}
	}
}