import { interact } from "../objects";

const cLevel5 = {
	title: "Dungeon - C4",
	floor: [
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
	],
	dungeon: [
		"[=========]",
		"[     Z   ]",
		"[ H      k]",
		"[         ]",
		"[         ]",
		",_________.",
	],
	ornaments: [
		"      !   ",
		"     $    ",
		"   @     X",
		"",
		"",
		"",
	],
	async setup() {
		const [ladder] = DM.dungeon.get('door');
		
		ladder.interact = (player) => {DM.go(3,3)}

		const [skeleton] = DM.ornaments.get('skeleton');

		skeleton.onDeath(() => {
			DM.locals.tutorialSkeletonDead = true;
		})

		if (DM.locals.tutorialSkeletonDead) {
			skeleton.destroy();
		}
		else if (!DM.locals.ironKey) {
			skeleton.hidden = true;
			skeleton.paused = true;
		}

		const [torch] = DM.ornaments.get("torch");

		if (DM.locals.torchUnlocked) {
			torch.destroy();
		}

		torch.interact = (player) => {
			DM.player?.dialog(`I can use this torch to burn the web.`);
			DM.locals.torchUnlocked = true;
			torch.destroy();
		}

		const [web] = DM.ornaments.get("web");

		const [ironKey] = DM.dungeon.get('iron-key')

		if (DM.locals.ironKey) {
			ironKey.destroy();
			web.destroy();
		} else {
			ironKey.interact = (player) => {
				if (!DM.locals.torchUnlocked) {
					DM.player?.dialog(`There's a key here, but I can't get it out.`);
				} else {
					DM.player?.dialog(`An iron key... I can use this for the other door.`);
					DM.locals.ironKey = true;
					ironKey.destroy();
					web.destroy();
	
					skeleton.hidden = false;
					skeleton.paused = false;
				}
			}
		}
	},
	tiles: {

	}
};
export default cLevel5;