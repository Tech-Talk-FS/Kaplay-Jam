/**
 * Combine two complists 
 * currently this is quick and dirty it does not like duplicate keys. 
 * @param {import('kaplay').LevelOpt} sheet - The tiles object will combine any duplicates
 * @param {...import("kaplay").CompList} args
 */
export const combine = (sheet, tiles) => {
	for(const k in tiles){
		if(k in sheet.tiles) {
			console.log(k);
			const s = sheet.tiles[k];
			sheet.tiles[k] = () => [...s(), ...tiles[k]()];
		} else sheet.tiles[k] = tiles[k];
	}
	return sheet;
}