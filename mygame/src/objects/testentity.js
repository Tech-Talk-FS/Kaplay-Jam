/**
 * This is a test but by attaching different function types to the modifier can I get direct reference to said game object
 */
export const TestEntity = () => {
	return {
		testMethod(){
			console.log("Test method", this);
		},

		testFunction: function(){
			console.log("Test function", this);
		},

		testArrow: ()=>{
			console.log("Test Arrow", this);
		}
	}
}