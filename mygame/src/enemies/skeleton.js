import { enemy } from "./enemy";
import { damage } from "../damage";
import { entity } from "../entity";
import { directionalAnimations } from "../player";

String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};
const dirs = ["Right", "Left", "Down", "Up"];

const anims = [
  ["idle", 5, { loop: true }],
  ["walk", 5, { loop: true }],
  ["attack", 5],
  ["damage", 3],
  ["death", 3],
];

export const loadSkeletonSprite = () => {
  loadSprite(
    "skeleton",
    "assests/enemies/skeleton.png",
    directionalAnimations(...anims)
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
    health(10),
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

  skeleton.onUpdate(async (...args) => {
    // Use state for tracking
    if (skeleton.state === "idle") {
      await wait(2);
      skeleton.enterState("detect");
    }
    if (skeleton.state === "detect") {
      // Calculate the difference in x and y coordinates
      const distance = player.pos.dist(skeleton.pos);
      const radius = 100;

      // Calculate the actual distance using the Pythagorean theorem

      // Check if the distance is less than or equal to the radius
      const isWithinRadius = distance <= radius;

      if (isWithinRadius) {
        skeleton.enterState("walk");
      }

      //await wait(5); you dont want to wait inside an update method as this method is being called from within the render loop therefore subsequent renders can be delayed
      skeleton.enterState("idle");
    }
    if (skeleton.state === "walk") {
      skeleton.lazyPlay("walk");
      const dir = player.pos.sub(skeleton.pos).unit();
      skeleton.move(dir.scale(3));
      await wait(5);
      skeleton.enterState("idle");
    }

    // Update is called after any button press functions
    // so this would prevent changing animations multiple times before
    // one update call, which should allow something like holding
    // up+right without the animations constantly resetting.
    skeleton.lazyPlay(animToPlay);

    // Default back to "idle" animation
    animToPlay = "idle";
  });

  skeleton.onCollide("player_attack", (otherObj, collision) => {
    //debug.log("💀 " + skeleton.hp());
    skeleton.hurt(otherObj.is("damage") ? otherObj.damageAmount : 1);
  });

  skeleton.onHurt(async () => {
    skeleton.lazyPlay(skeleton.hp() > 0 ? "damage":"death");
    // loadSprite(
    //   "coin",
    //   `assests/Player/player-${i}.png`,
    //   directionalAnimations(...anims)
    // );

    const particle = add([
      pos(skeleton.pos),
      rect(4, 4),
      outline(2),
      anchor("center"),
      //   scale(rand(0.5, 1)),
      area({ collisionIgnore: ["particle", "player", "skeleton"] }),
      body({ isStatic: true }),
      lifespan(1, { fade: 0.3 }),
      opacity(0.5),
      move(choose([LEFT, RIGHT]), rand(10, 20)),
      "particle",
    ]);

    particle.onUpdate(async () => {
      particle.move(10, 10);
    });

    // trying to fade it out
    // await tween(
    //   particle.opacity,
    //   0,
    //   0.3,
    //   (val) => (particle.opacity = val),
    //   easings.linear
    // );
    /*
    if (skeleton.hp() <= 0) {
      skeleton.lazyPlay("death");
      //await wait(3);
      //   destroy(skeleton);
    }*/
  });
  skeleton.onAnimEnd((anim)=>{
    if(anim.startsWith('death')) skeleton.destroy();
  })
  //debug.inspect = true;

  return skeleton;
}
