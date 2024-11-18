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
		"[E   S   E]",
		"[         ]",
		"[         ]",
		"[         ]",
		"[         ]",
		",___)_____.",
	],
	ornaments: [
		"  !     !  ",
		"     $     ",
		"          ",
		"",
		"",
		"    @",
		"",
	],
	async setup() {
		const [door] = DM.dungeon.get('door');
		
		door.interact = (player) => {DM.go(15)}

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
	},
	tiles: {

	}
};
export default level19;