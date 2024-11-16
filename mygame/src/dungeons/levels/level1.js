import { interact } from "../../objects";
import { mod } from "../../objects/mod";

const level1 = {
	title:"Dungeon - 0",
	floor:[
		"XXXXXX XXXXXX",
		"X           X",
		"X           X",
		"X           X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
	],
	dungeon: [
		"[=======(===]",
		"[l         l]",
		"[           ]",
		"[           ]",
		",_______<  $]",
		"        [   ]",
		"        [   ]",
		"        [  V]",
		"        ,___."
	],
	//ornaments
	ornaments: [
		"    b",
		"            ",
		"   @        ",
		"            ",
		"            ",
		"          w ",
		"          W ",
		"           X",
	],
	async setup(){

	},
	tiles: {
			l:()=>[
				interact(player=>player.dialog("This hasn't been\nlit in years"))
			],
			"(":()=>[
				interact(player=>player.dialog("The door\nis stuck"))
			],
			b:()=>[
				interact(player=>{
					player.dialog('Not all is as it seems"\n... ')
					const web = DM.ornaments.get('web')[0];
					web.destroy();
					player.unlockedLvl1 = true;
				})
			],
			V:()=>[
				interact(player=>{
					console.log(player)
					if(player.unlockedLvl1) go("main", 1);
				})
			],
			$:()=>[
				//perpetual respawn
				{async onDied(){
					const p = this.pos;
					await wait(3),
					DM.dungeon.add([...DM.tiles.$(), pos(p)]);
				}}
			]
		}
};
export default level1;