const combinator = (srcFn, tileFn) => ()=>{
	const src = srcFn();
	for(const t of tilesFn()){

	}
}
/**
 * Combine two complists 
 * currently this is quick and dirty it does not like duplicate keys. 
 * @param {import('kaplay').LevelOpt} sheet - The tiles object will combine any duplicates
 * @param {...import("kaplay").CompList} args
 */
export const combine = (oldSheet, tiles) => {
	const sheet = {...oldSheet};
	for(const k in tiles){
		if(k in sheet.tiles) {
			const s = sheet.tiles[k];
			sheet.tiles[k] = () => {
				const src = s();
				
				for(const t of tiles[k]()){
					if(typeof t !== 'object' || t.id !== 'mods') {
						src.push(t);
						continue;
					}
					for(const k in t){
						if(k === 'id') continue;
						let found = false;
						for(const sr of src){
							if(typeof sr !== 'object') continue
							if(k === "health" && sr.id === "health"){
								sr.setHP(t[k]);
								found = true;
								break;
							} if (k in sr) {
								
								sr[k] = t[k];
								found = true;
								break;
							}
						}
					}
				}
				return src;
			}
		} else sheet.tiles[k] = tiles[k];
	}
	return sheet;
}