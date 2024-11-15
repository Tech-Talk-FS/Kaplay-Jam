/**
 * Splits a string by a specified length at the nearest space.
 * 
 * while regex is nice this is such a simple operation regex becomes the most expensive part. 
 * @param {*} str 
 * @param {*} ln 
 */
export const splitByLengthAndNewLine = (str, ln) => {
	let lastSpace = -1,
	start = 0
	const lines = [];
	for (let i = 0; i<str; i++){
		if(start >= i) continue; //no need to iterate.
		if(str[i] === " ") lastSpace = i;
		const length = i-start;
		if(length===ln){
			if(~lastSpace){
				lines.push(str.slice(start, lastSpace)); //dont include the space
				start = lastSpace+1;
			} else { //no spaces in section force split
				lines.push(str.slice(start, i+1)); //include the character in the line
				start = i+1
			}
		}
		//handle most newlines
		if(str[i] === "\n"){
			lines.push(str.slice(start, i)); //dont include the newline character
			start = i+1;
		} else if (str.slice(i,i+2) === "\r\n"){ //I might be able to get away with doing this whenever first char isa carriage return
			lines.push(str.slice(start, i)); //dont include the carriage return
			start = i+2; //skip the next char.
		}
	}
	return lines;
}