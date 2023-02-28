const textarea = document.getElementById("output");

function get(name){
    return getvalue(settings,name);
}

function getvalue(settings,name){
    index = settings.findIndex(e => e.name == name);
    if(index == -1){
        console.log("not found");
    }else{
        option = options.children[index].children[1]
        switch (option.type) {
            case "text":
                return option.value;
            case "number":
                return option.value == "" ? 0 : option.value;
            case "checkbox":
                return option.checked;
            default:
                console.log("unknown type: " + option.type);
                break;
        }
    }
    return;
}

function output(){
    const tags = `${get("Tags")} ${get("Custom Agressive Mob") ? "CustomAgressiveMob" : ""}`.split(" ").map(item => `"${item}"`).join(","); 

    textarea.innerText= `/summon ${get("Mob Type")} {Health:${get("HP")}f,Attributes:[{Name:generic.attack_damage,Base:${get("Damage")}},{Name:generic.armor,Base:${get("Defense")}},{Name:generic.armor_toughness,Base:${get("Magic Defense")}},{Name:generic.attack_knockback,Base:${get("Magic Damage")}},{Name:generic.movement_speed,Base:${get("Speed")}},{Name:generic.knockback_resistance,Base:${get("Knockback Resistance")}}],Tags:[${tags}]},PortalCooldown:${get("Mob Level")},ActiveEffects:[{Ambient: 0b, ShowIcon: 0b, ShowParticles: 0b, Duration: -1, Id: 11, Amplifier: 4b}],DeathLootTable:"${get("Death Loot table")}",CustomNameVisible:1b,ArmorDropChances:[0.000F,0.000F,0.000F,0.000F],HandDropChances:[0.000F,0.000F],ArmorItems:[{},{},{},{id:"minecraft:scute",Count:1b,CustomModelData:1b,tag:{MobName:"${get("Name")}",NameColor:"'{"text":"","color":"${get("Name Color")}"}'"}}]}`
}

ArmorItems[3].tag.MobName