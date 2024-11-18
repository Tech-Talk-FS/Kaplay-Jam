import { interact, hazard } from "../objects";

export const jLevel4 = {
    title: "Scorched Ball Room",

    floor: [
        "XXXXXXX",
		"X      ",
		"X      ",
		"X      ",
		"X      ",
		"X      ",
		"X      ",
    ],

    dungeon: [
       "[======]",
	   "/      ]",
	   "[     V]",
	   "[      ]",
	   "[v    V]",
	   "[      ]",
	   "[______]"

    ],

    ornaments: [
		"",
       	"   @"
    ],

    setup(){
		DM.locals.guardTowerSwitches = 0;
	},

    tiles: {
		V: ()=>[
			interact(player=>{
				DM.locals.guardTowerSwitches++
				if(DM.locals.guardTowerSwitches < 3) return player.dialog("So much dust... I'd hate to have to clean this place");
				DM.go(15);
			})
		],
		v: ()=>[
			interact(player=>{
				DM.locals.guardTowerSwitches++
				if(DM.locals.guardTowerSwitches < 3) return player.dialog("So much dust... I'd hate to have to clean this place");
				DM.go(15);
			})
		]
	}
};

