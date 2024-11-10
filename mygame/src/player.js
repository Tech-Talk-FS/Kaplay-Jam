import { character } from "./character";
import { damage } from "./damage";

String.prototype.capitalize = function(){ return this[0].toUpperCase()+this.slice(1); }
/**
 * The base name and the number of frames. the name will be suffixed with Left, Down, Right, Up
 * @typedef ActionDefinition
 * @type {[string, number, import("kaplay").SpriteAnim | undefined]}
 */
/**
 * The HanaCaraka sprite offer specialized animations in each direction because the directions are in the same order I can automate a lot of the declaration.
 * @param {number} maxX - The max columns expected
 * @param  {...ActionDefinition} opts - The actions being supported. these should be declared in the order they occure in the sprite grid.
 * @returns { import("kaplay").LoadSpriteOpt } - The arguments with the sliceX and sliceY as well as the animations. 
 */
export const directionalAnimations = (...opts) => {
	const maxX = Math.max(...opts.map(v=>v[1]))+1;
	const options = {
		sliceX: maxX,
		sliceY: opts.length*4,
		anims: opts.reduce((o,[name,x, op={}],i)=>{
			const y = i*4*maxX;
			['Right', 'Left', 'Down', 'Up'].forEach((d,j)=>{
				const my = y + maxX*j
				o[name+d] = {
					from: my,
					to: my+x,
					...op
				}
			});
			return o;
		},{})
	};
	return options;
}

const anims = [
	['idle', 3, {loop: true}],
	['walk', 7, {loop: true}],
	['run', 7, {loop: true}],
	['jump', 5],
	['damage', 3],
	['death', 5],
	['sword', 5],
	['spear', 5],
	['axe', 5],
	['hammer', 5],
	['pickaxe', 5],
	['planting', 3],
	['sickle', 5],
	['water', 5]
];
const colors = ['white', 'blue', 'green', 'orange', 'pink', 'red', 'yellow'];
const dirs = ["Right", "Left", "Down", "Up"];

export const loadPlayerSprites = () => {
	for(let i = 0; i<colors.length; i++){
		const color = colors[i];
		loadSprite(`hana${color ? '-'+color:''}`, `assests/Player/hana${color ? '-'+color:''}.png`, directionalAnimations(...anims));
	}
}

export function createPlayer(color="white") {
    const SPEED_MOD = 1.5;
    const upgrade_modifiers = {
        speed: 1.0,
    };
    const playerActions = ["idle", "walk", "run", "attack"];
    let animToPlay = "idle";
    let dirToFace = "Down";

	const statics = new Set(anims.filter(([,,{loop}={}])=>!loop).flatMap(([n])=>dirs.map(d=>n+d)));
    // Creates the player sprite
    const player = add([
		sprite('hana-'+color),
        pos(center()),
        anchor("center"),
        area({
            shape: new Rect(vec2(1, 0), 13, 15)
        }),
        body(),
        state(playerActions[0], playerActions),
        health(5),
        character(),
        {
            lazyPlay: (action) => {
                const animToPlay = action+player.dir;
                const currAnimName = player.getCurAnim()?.name

                // If this action is overrideable before it ends and it is a new animation...
                if(!statics.has(currAnimName) && animToPlay !== currAnimName) {
                    // If the action is different than its previous one, change its state
                    // Example: walkUp is the same walk state as walkDown
                    if (!currAnimName?.includes(action)) {
                        // If the action is a weapon, change it to attack
                        const state = playerActions.includes(action) ? action : "attack";
                        player.enterState(state);
                    }
                    // Play the new animation
                    player.play(animToPlay);
                }
            },
        },
        "player",
    ]);

    // Attaches attack hitbox onto player
    const attack = player.add([
        anchor("left"),
        rotate(0),
        damage(2),
        "player_attack",
    ]);

    // Attaches interactable hitbox onto player
    const interact = player.add([
        anchor("left"),
        rotate(90),
        area({
            shape: new Rect(vec2(0, 0), 17, 22)
        }),
        "player_interact",
    ]);

    player.onButtonDown(["Left", "Right", "Up", "Down"], button => {
        let xMod = 0;
        let yMod = 0;
        // If the shift key is pressed, increase run speed
        let shiftMod = isKeyDown("shift") ? SPEED_MOD : 1;
        const action = shiftMod === 1 ? "walk" : "run";

        // Only change the direction if not in the middle of an attack.
        if (player.state !== "attack") {
            player.dir = button;
        }
        dirToFace = button;

        // Move character left if the "Left" button is pressed
        if (button === "Left") {
            xMod = -1;
        }
        // Move character right if the "Right" button is pressed
        else if (button === "Right") {
            xMod = 1;
        }

        // Move character up if the "Up" button is pressed
        if (button === "Up") {
            yMod = -1;
        }
        // Move character down if the "Down" button is pressed
        else if (button === "Down") {
            yMod = 1;
        }

        // Player direction might be different than walking direction
        switch(player.dir) {
            case "Left":
                attack.rotateTo(180);
                interact.rotateTo(180);
                break;
            case "Right":
                attack.rotateTo(0);
                interact.rotateTo(0);
                break;
            case "Up":
                interact.rotateTo(270);
                break;
            case "Down":
                interact.rotateTo(90);
                break;
        }

        const speedX = player.speed * shiftMod * xMod * upgrade_modifiers.speed;
        const speedY = player.speed * shiftMod * yMod * upgrade_modifiers.speed;

        player.move(
            speedX,
            speedY
        );

        // Queue the "walk"/"run" animation
        // The "attack" animation takes higher priority.
        if (animToPlay != player.currEquipment) {
            animToPlay = action;
        }
    });

    // Queues the attack animation when the "attack" button is held down.
    player.onButtonDown("attack", button => {
        animToPlay = player.currEquipment;
    });

    player.onButtonPress("weaponSwap", button => {
        player.changeEquipment();
    });

    player.onButtonPress("paletteSwap", button => {
        const i = (colors.indexOf(player.sprite.slice(5))+1)%colors.length;
        const newSprite = `hana-${colors[i]}`;
        player.use(sprite(newSprite));
    });

    // Used to change direction after the attack animations end.
    // Without this, holding down the attack button will prevent
    // the direction from changing as the state is not changed
    // from attacking.
    player.onAnimEnd(action => {
        player.dir = dirToFace;
    });

    player.onUpdate(() => {
        // If the "attack" animation reaches the sword swipe section,
        // activate the attack hitbox.
        if (player.getCurAnim()?.name === "attack" &&
        (player.animFrame === 3 ||
        player.animFrame === 4)) {
            enableAttack();
        }
        // If the "attack" animation is no longer playing,
        // disable the attack hitbox.
        else if (attack.is("area")) {
            disableAttack();
        }

        // Update is called after any button press functions
        // so this would prevent changing animations multiple times before
        // one update call, which should allow something like holding
        // up+right without the animations constantly resetting.
        player.lazyPlay(animToPlay);

        // Default back to "idle" animation
        animToPlay = "idle";

        // Set camera to the player's position
        camPos(player.pos);
    });

    // Removes the area component from attack
    function disableAttack() {
        attack.unuse("area");
    }

    // Adds the area component to attack
    // Allows the attack hitbox to be active
    function enableAttack() {
        attack.use(area({
            shape: new Rect(vec2(0, 0), 22, 23)
        }));
    }

    // Adds an upgrade event for the player to be called
    // from other locations.
    on("upgrade", "player", (obj, field, value) => {
        upgrade_modifiers[field] = value;
    });

    debug.inspect = true;

    return player;
}