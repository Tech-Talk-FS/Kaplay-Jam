/**
 * @typedef {object} EnemyOptions
 * @param {import("kaplay").Vec2[]} [path] - The paths to follow, this should be an array of units it will be multiplied by the characters speed
 * @param {[char: string, chance: number][]} [drops] - The drop percentage
 * @param { number } [patrolSpeed]
 */

import { DIRS } from "../constants";
import { chance } from "../utils";

const DEFAULTS = {
  patrolSpeed: 1,
  drops: [],
  patrolRange: 50,
};
/**
 *
 */
export const enemy = ({
  path,
  patrolSpeed = DEFAULTS.patrolSpeed,
  patrolRange = DEFAULTS.patrolRange,
  drops = DEFAULTS.drops,
} = DEFAULTS) => ({
  id: "enemy",
  require: ["damage", "damagable", "mobile", "directional"],
  patrolRange,
  patrolSpeed,
  drops,
  path,
  add() {
    this.onStateEnter("idle", async () => {
      for (const d of DIRS) {
        this.direction = d;
        this.do("idle");
        const dist = this.pos.dist(DM.player.pos);
        if (dist <= this.patrolRange) return this.enterState("persue");
        await wait(this.patrolSpeed);
      }

      //get the next direction
      if (this.path) {
        const v = this.path.shift();
        this.path.push(v);
        this.nextPos = v;
      } else {
        const s = this.speed ?? 50;
        this.nextPos = vec2(
          (0.5 - Math.random()) * s,
          (0.5 - Math.random()) * s
        ).unit();
      }
      this.enterState("patrol");
    });

    this.onStateEnter("patrol", async () => {
      this.do("walk");
      await wait(this.patrolSpeed);
      this.enterState("idle");
    });

    this.onStateUpdate("patrol", () => {
      if (!this.nextPos) return;
      this.go(this.nextPos.scale(this.speed));
    });

    this.onStateEnter("persue", async () => {
      this.do("walk");
    });

    this.onStateUpdate("persue", async () => {
      const v = DM.player.pos.sub(this.pos).unit();
      if (DM.player.pos.dist(this.pos) > this.patrolRange)
        this.enterState("idle");
      if (
        this.hitbox
          .getCollisions()
          .find((c) => c.target.tags.includes("player"))
      )
        this.enterState("attack");
      this.go(v);
    });

    this.onDestroy(() => {
      //The enemy was not killed
      if (this.hp() > 0) return;
      const ps = this.pos;
      for (const [char, p] of this.drops) {
        if (chance(p)) DM.dungeon.add([...DM.tiles[char](), pos(ps)]);
      }
      if ("onDied" in this && typeof this.onDied === "function")
        return this.onDied();
    });
  },
});
