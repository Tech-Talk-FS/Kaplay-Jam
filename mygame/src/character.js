export function character() {
    const possibleEquipments = ["sword", "pickaxe", "axe", "sickle", "spear"];

    return {
        id: "character",
        require: ["health", "state", "damage"],
        speed: 100,
        armor: 0,
        currEquipment: "sword",
        dir: "Right",
        /**
         * Changes the equipment to the designated one. If none are specified,
         * it cycles to the next weapon.
         * @param {"sword" | "pickaxe" | "axe" | "sickle" | "spear"} equipment 
         */
        changeEquipment(equipment="") {
            if (equipment) {
                this.currEquipment = equipment;
            }
            else {
                const i = (possibleEquipments.indexOf(this.currEquipment)+1)%possibleEquipments.length;
                this.currEquipment = possibleEquipments[i];
            }

            switch(this.currEquipment) {
                case "sword":
                    this.damageAmount = 3;
                    break;
                case "pickaxe":
                    this.damageAmount = 2;
                    break;
                case "axe":
                    this.damageAmount = 3;
                    break;
                case "sickle":
                    this.damageAmount = 2;
                    break;
                case "spear":
                    this.damageAmount = 3;
                    break;
                default:
                    this.damageAmount = 1;
            }
        },
    }
}