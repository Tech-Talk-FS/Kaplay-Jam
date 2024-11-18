import { interact } from "../objects";

const level19 = {
	title: "Dungeon - C4",
	floor: [
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
	],
	dungeon: [
		"[=========]",
		"[        E]",
		"[ H       ]",
		"[        S]",
		"[         ]",
		"[        E]",
		",_________.",
	],
	ornaments: [
		"  !     !  ",
		"     $     ",
		"   @       ",
		"",
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
			DM.player?.dialog(`With this torch, the web should pose no trouble.`);
			DM.locals.torchUnlocked = true;
			torch.destroy();
		}

		const [web] = DM.ornaments.get("web");

		const [silverKey] = DM.dungeon.get('iron-key')

		if (DM.locals.silverKey) {
			silverKey.destroy();
			web.destroy();
		} else {
			silverKey.interact = (player) => {
				if (!DM.locals.torchUnlocked) {
					DM.player?.dialog(`There's a key here, but the web's hold is too strong.`);
				} else {
					DM.player?.dialog(`A silver key...
Within my grasp, I can't help but
feel something stir.
Could I have used it before?
Was it to lock something in
or keep something out?`);
					DM.locals.silverKey = true;
					silverKey.destroy();
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
export default level19;