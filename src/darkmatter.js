import { DND5E } from '/systems/dnd5e/module/config.js';
import Actor5e from "/systems/dnd5e/module/actor/entity.js";

DND5E.weaponProficiencies["simBl"] = "Simple Blasters";
DND5E.weaponProficiencies["marBl"] = "Martial Blasters";
DND5E.weaponTypes["simpleB"] = "Simple Blaster";
DND5E.weaponTypes["martialB"] = "Martial Blaster";

//Add the skills to the character sheet as a skill if, and only if, the actors being created are npcs or characters
//If the type is vehicle, it makes no changes.
const prep = Actor5e.prototype.prepareBaseData;	
function extendActorData() {
  console.log(this);
  const dat = this.data.data;
	dat["newskills"] = dat["newskills"] || 
	{ "dat": 
		{
			total: ''
    },
    "pil": 
		{
			total: ''
    },
    "tec": 
		{
			total: ''
    }
	};

	if(this.data.type === "npc" || this.data.type === "character") {
	}
	else {
		const atr = this.data.data.attributes;
		atr["maneuver"] = atr["maneuver"] || 0;
		atr["engineclass"] = atr["engineclass"] || 0;
	}
	return prep.call(this);
}
Actor5e.prototype.prepareBaseData = extendActorData;

//Adding elements to CarbonCompact sheet
Hooks.on("renderActorSheet", (app, html, data) => {
    
  if(data.isCharacter || data.isNPC){
    const skillslist = html.find("section.sheet-body").find("ul.skills-list");
    skillslist.append(`
      <li class="skill flexrow dat" data-skill="int">
        <input type="hidden" name="data.newskills.dat.value" data-dtype="Number">
        <h4 class="skill-name">Data</h4>
        <span class="skill-ability custom">Int</span>
        <span class="skill-mod custom"><input name="data.newskills.dat.total" type="text" value="${data.data.newskills.dat.total}" data-dtype="Text" placeholder="+0"/></span>
      </li>

      <li class="skill flexrow pil" data-skill="dex">
      <input type="hidden" name="data.newskills.pil.value" data-dtype="Number">
      <h4 class="skill-name">Piloting</h4>
      <span class="skill-ability custom">Dex</span>
      <span class="skill-mod custom"><input name="data.newskills.pil.total" type="text" value="${data.data.newskills.pil.total}" data-dtype="Text" placeholder="+0"/></span>
      </li>

      <li class="skill flexrow tec" data-skill="int">
      <input type="hidden" name="data.newskills.tec.value" data-dtype="Number">
      <h4 class="skill-name">Technology</h4>
      <span class="skill-ability custom">Int</span>
      <span class="skill-mod custom"><input name="data.newskills.tec.total" type="text" value="${data.data.newskills.tec.total}" data-dtype="Text" placeholder="+0"/></span>
      </li>
    `); 
  }

else{
    const traits = html.find("div.traits");
    traits.prepend(`
    <div class="form-group {{#unless data.attributes.maneuver}}inactive{{/unless}}">
      <label>Maneuverability</label>
      <input type="text" name="data.attributes.maneuver" data-dtype="Number" placeholder="0"
        value="${data.data.attributes.maneuver}" />
    </div>
    <div class="form-group {{#unless data.attributes.engineclass}}inactive{{/unless}}">
      <label>Engine Class</label>
      <input type="text" name="data.attributes.engineclass" data-dtype="Number" placeholder="0"
        value="${data.data.attributes.engineclass}" />
    </div>
    `);
  }
});