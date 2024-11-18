import { interact } from "../objects";

const cLevel1 = {
	title: "Dungeon - C0",
	floor: [
		"         ",
		"         ",
		"         ",
		"         ",
		"         ",
		"         ",
	],
	dungeon: [
		"[===(===]",
		"[J  ~  J]",
		"[  z    ]",
		"[       ]",
		"[   m z ]",
		"[Jzmmm J]",
		",_______."
	],
	ornaments: [
		"  b     ",
		"        ",
		"        ",
		"        ",
		"        ",
		"    @   ",
	],
	async setup() {
		if (!DM.locals.adventureBegins) {
			DM.player?.dialog(`...
...
...
Huh..? Where am I?
How did I get here?
I must find a way out.
Hmm... This necklace...
And its design...
What does it mean?`);
			DM.locals.adventureBegins = true;
		}

		const [door] = DM.dungeon.get("door");
		door.interact = (player) => {
			DM.go(1);
		}

		const banners = DM.ornaments.get("banner");
		banners.forEach(banner => {
			banner.interact = (player) => {
				DM.player?.dialog(`The symbol on this banner
looks familiar... I feel
compelled to hold my necklace.`);
			}
		});
	},
	tiles: {
		"l": ()=>[
			interact(player => DM.player?.dialog(`Doesn't seem like it's been lit in years.`))
		],
		"J": () =>[
			interact(player => DM.player?.dialog(`The fires hold strong in spite of its condition.`))
		]
	}
}
export default cLevel1