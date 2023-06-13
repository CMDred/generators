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
                alert("unknown type: " + option.type);
                break;
        }
    }
    return;
}

function output(){
    const tags = `${get("Tags")} ${get("Custom Agressive Mob") ? "CustomAgressiveMob" : ""}`.split(" ").filter(e => e).map(item => `"${item}"`).join(",");

    textarea.innerText= `/summon ${get("Mob Type")} ~ ~ ~ {Attributes:[{Name:generic.max_health,Base:${get("HP")}f},{Name:generic.attack_damage,Base:${get("Damage")}},{Name:generic.armor,Base:${get("Defense")}},{Name:generic.armor_toughness,Base:${get("Magic Defense")}},{Name:generic.attack_knockback,Base:${get("Magic Damage")}}, ${(get("Speed") != 0) ? "{Name:generic.movement_speed,Base:" + get("Speed") + "},": ''}{Name:generic.knockback_resistance,Base:${get("Knockback Resistance")}}],Tags:[${tags}],PortalCooldown:${(parseInt(get("Mob Level")) + 1).toString()},ActiveEffects:[{Ambient: 0b, ShowIcon: 0b, ShowParticles: 0b, Duration: -1, Id: 11, Amplifier: 4b}],DeathLootTable:"${get("Death Loot table")}",CustomNameVisible:1b,ArmorDropChances:[0.000F,0.000F,0.000F,0.000F],HandDropChances:[0.000F,0.000F],ArmorItems:[{},{},{},{id:"minecraft:scute",Count:1b,tag:{MobName:'{"text":"${get("Name")}","color":"${get("Name Color")}"}',MobNameRaw:"${get("Name")}",CustomModelData:1b}}],CustomName:'["",{"text":"${get("HP")}","color":"green"},{"text":"/","color":"white"},{"text":"${get("HP")}","color":"green"},{"text":"❤ ","color":"dark_red"},{"text":"${get("Name")} ","color":"${get("Name Color")}"},{"text":"[","color":"dark_gray"},{"text":"Lv${get("Mob Level")}","color":"gray"},{"text":"]","color":"dark_gray"}]'}`;
}