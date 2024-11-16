
/**
 * While directional will use Left down right up as the cardinal
 * @param {"Right" | "Left" | "Down" | "Up"} initial 
 * @returns 
 */
export const directional = (initial = "Right") => {
	return {
		id: "directional",
		direction: initial,
		/**
		 * Instead of lazy play do is a simpler verb. 
		 * This method will only run the animation if the entity is doing nothing or the animation is a looping animation.
		 * @param {string} animation 
		 * @returns {boolean} - If the animation was run or not.
		 */
		do(animation){
			//only interupt looping animations
			const cur = this.getCurAnim();
			if(!(cur?.loop ?? true)) return false;
			const action = animation+this.direction;
			if(action === cur?.name || !this.hasAnim(action)) return false; //no point in repeating a looping animation
			this.play(action);
			return true;
		},
	}
}