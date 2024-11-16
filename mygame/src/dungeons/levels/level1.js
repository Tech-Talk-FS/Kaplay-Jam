const level1 = [
	"Dungeon - 0",
	[
		"XXXXXX XXXXXX",
		"X           X",
		"X           X",
		"X           X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
	],
	[
		"[=======(===]",
		"[l         l]",
		"[       $   ]",
		"[           ]",
		",_______<   ]",
		"        [   ]",
		"        [   ]",
		"        [  V]",
		"        ,___."
	],
	//ornaments
	[
		"    b",
		"            ",
		" @          ",
		"            ",
		"            ",
		"            ",
		"            ",
		"           X",
	],
	async () => {
		const door = DM.dungeon.get('door')[0];
		door.interact = (player) => player.dialog("The door\nis stuck")
		for(const torch of DM.dungeon.get('torch')){
			console.log("Setting torch interaction");
			torch.interact = (player) => {
				player.dialog("This hasn't been\nlit in years");
			}
		}
		const banner = DM.ornaments.get('banner')[0];
		banner.interact = (player) => {
			player.dialog('Not all is as it seems"\n... ');
			const web = DM.ornaments.get('web')[0];
			DM.ornaments.remove(web);
			player.unlockedLvl1 = true;
		}
		const orn = DM.dungeon.get('right-wall-ornament')[0];
		orn.interact = (player) => {
			if(player.unlockedLvl1) go("main", 1);
			
		}
		DM.player?.dialog(`...
...
...
What?... Where am I?
How did I get here`);
		}
];
export default level1;