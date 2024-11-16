export const interact = (fn, shouldDestroy=false) => {
	return {
		id: 'interact',
		require: ['area'],
		interact(player){
			fn(player);
			if(shouldDestroy) this.destroy();
		}
	}
}