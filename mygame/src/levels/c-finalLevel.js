import { interact, damage, damagable } from "../objects";

const cFinalLevel = {
	title: "The Road to Freedom",
	floor: [
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
	],
	dungeon: [
		"[=====(=====]",
		"[JZ        J]",
		"[        Z$ ]",
		"[           ]",
		"[     e     ]",
		"[ $Z        ]",
		"[        Z  ]",
		"[J         J]",
		",_____(_____.",
	],
	ornaments: [
		"   b     b",
		"",
		"",
		"",
		"",
		"",
		"",
		"      @",
		"",
	],
	async setup() {
		const [topDoor, bottomDoor] = DM.dungeon.get('door');
        const [statue] = DM.dungeon.get('goblin-statue');
        const skeletons = DM.dungeon.get('skeleton');
        const enemiesKilled = [];
        statue.setMaxHP(40);
        statue.setHP(40);
        statue.damageAmount = 4;

		topDoor.interact = (player) => {
            if (DM.locals.finalLevelCleared) {
                //TODO: End the game.
                console.log("GAME ENDS");
            } else {
                DM.player?.dialog(`Locked... The statue, it stirs!`);
                statue.enterState("idle");
                skeletons.forEach(skeleton => {
                    skeleton.hidden = false;
                    skeleton.paused = false;
                })
            }
		}

		bottomDoor.interact = (player) => {
			DM.player?.dialog(`This is it. There's no turning back now.`);
		};

        skeletons.forEach(skeleton => {
            skeleton.hidden = true;
            skeleton.paused = true;

            skeleton.onDeath(action => {
                enemiesKilled.push("skeleton");

                if (enemiesKilled.length === skeletons.length + 1) {
                    DM.locals.finalLevelCleared = true;
                }
            });
        });

        statue.onDeath(action => {
            enemiesKilled.push("statue");

            if (enemiesKilled.length === skeletons.length + 1) {
                DM.locals.finalLevelCleared = true;
            }
        });


	},
	tiles: {
        "e": ()=>[
            scale(2,2)
        ]
	}
};
export default cFinalLevel;