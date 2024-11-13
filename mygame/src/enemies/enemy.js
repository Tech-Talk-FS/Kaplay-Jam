export function enemy() {
  return {
    id: "enemy",
    require: ["health", "state", "damage"],
    speed: 100,
    armor: 0,
  };
}
