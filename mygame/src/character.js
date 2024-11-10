export function character() {
    const possibleEquipments = ["sword", "pickaxe", "axe", "sickle", "spear"];

    return {
        id: "character",
        require: ["health"],
        speed: 100,
        armor: 0,
        currEquipment: "sword",
        dir: "Down",
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
        },
    }
}