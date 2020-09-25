import { DND5E } from '/systems/dnd5e/module/config.js';
import Actor5e from "/systems/dnd5e/module/actor/entity.js";

DND5E.skills["dat"] = "Data";
DND5E.skills["pil"] = "Piloting";
DND5E.skills["tec"] = "Technology";
DND5E.weaponProficiencies["simBl"] = "Simple Blasters";
DND5E.weaponProficiencies["marBl"] = "Martial Blasters";
DND5E.weaponTypes["simpleB"] = "Simple Blaster";
DND5E.weaponTypes["martialB"] = "Martial Blaster";

//Add the skills to the character sheet as a skill if, and only if, the actors being created are npcs or characters
//If the type is vehicle, it makes no changes.
const prep = Actor5e.prototype.prepareBaseData;	
function extendActorData() {
	if(this.data.type === "npc" || this.data.type === "character") {
		const skl = this.data.data.skills;
        skl["dat"] = skl["dat"] || {value: 0, ability: "int"};
        skl["pil"] = skl["pil"] || {value: 0, ability: "dex"};
		skl["tec"] = skl["tec"] || {value: 0, ability: "int"};
    }
	return prep.call(this);
}
Actor5e.prototype.prepareBaseData = extendActorData;