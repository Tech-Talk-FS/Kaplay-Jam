import { enemy } from "./enemy";
import { damage } from "../damage";
import { entity } from "../entity";
import { directionalAnimations } from "../player";

String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};
const dirs = ["Right", "Left", "Down", "Up"];

const anims = [
	['idle', 5, {loop: true}],
	['walk', 5, {loop: true}],
    ['damage', 3],
	['death', 3],
];

export const loadSkeletonSprite = () => {
  loadSprite(
    "skeleton",
    "assests/enemies/skeleton.png",
    directionalAnimations(
      ...anims
    )
  );
};

export function createSkeleton(player) {
  const playerActions = ["idle", "walk", "detect", "damage", "death"];
  let animToPlay = "idle";
  let dirToFace = "Left";

  const statics = new Set(
    anims
      .filter(([, , { loop } = {}]) => !loop)
      .flatMap(([n]) => dirs.map((d) => n + d))
  );
  
  // Creates the player sprite
  const skeleton = add([
    sprite("skeleton"),
    anchor("center"),
    area({
      shape: new Rect(vec2(1, 0), 13, 15),
    }),
    pos(),
    body(),
    state(playerActions[0], playerActions),
    health(5),
    damage(3),
    entity(),
    enemy(),
    {
      lazyPlay: (action) => {
        
        const animToPlay = action + skeleton.dir;
        const currAnimName = skeleton.getCurAnim()?.name;

        // If this action is overrideable before it ends and it is a new animation...
        if (!statics.has(currAnimName) && animToPlay !== currAnimName) {
          // If the action is different than its previous one, change its state
          // Example: walkUp is the same walk state as walkDown
          if (!currAnimName?.includes(action)) {
            // If the action is a weapon, change it to attack
            const state = playerActions.includes(action) ? action : "attack";
            skeleton.enterState(state);
          }
          // Play the new animation
          skeleton.play(animToPlay);
        }
      },
    },
    "skeleton",
  ]);



  skeleton.onUpdate(async () => {
    // Use state for tracking
    if (skeleton.state === "idle") {
        await wait(2)
        skeleton.enterState("detect")
    }
    if (skeleton.state === "detect") {
        // Calculate the difference in x and y coordinates
        const dx = player?.pos.x - skeleton.pos.x;
        const dy = player?.pos.y - skeleton.pos.y;
        const radius = 100
        
        // Calculate the actual distance using the Pythagorean theorem
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Check if the distance is less than or equal to the radius
        const isWithinRadius = distance <= radius;

        console.log("How close?", isWithinRadius)

        if(isWithinRadius){
            skeleton.enterState("walk")
        }
            
        await wait(5)
        skeleton.enterState("idle")
    }
    if (skeleton.state === "walk") {
            console.log("walking", skeleton.pos )
            skeleton.lazyPlay("walk");
            const dir = player.pos.sub(skeleton.pos).unit();
            skeleton.move(dir.scale(3));
            await wait(5)
            skeleton.enterState("idle")
    }

    // Update is called after any button press functions
    // so this would prevent changing animations multiple times before
    // one update call, which should allow something like holding
    // up+right without the animations constantly resetting.
    skeleton.lazyPlay(animToPlay);

    // Default back to "idle" animation
    animToPlay = "idle";
  });

  skeleton.onCollide("player", (bullet) => {
    debug.log("Tech Talk is 🔥");
    destroy(skeleton);
});

  debug.inspect = true;

  return skeleton;
}
