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

class Tag {
    constructor(condition, value1, content = []) {
        this.condition = condition;
        this.value1 = value1;
        this.content = content;
    }
}

function getNBT(nbt) {
    out = ""
    for(const tag of nbt){
        if(tag.condition){
            if(tag.content.length){ 
                out += tag.value1[0] + getNBT(tag.content) + tag.value1[1] + ",";
            }else{
                out += tag.value1 + ",";
            }
        }
    }
    return out.slice(0, -1);
}

function addTag(list, tag){
    if(tag.condition){
        list.push(tag)
    }
}

function output(){
    let nbt = [];

    addTag(nbt,new Tag(get("Death Loot table"), `DeathLootTable:"${get("Death Loot table")}"`));

    let Attributes = [];
    addTag(Attributes,new Tag(get("HP"), `{Name:generic.max_health,Base:${get("HP")}d}`));
    addTag(Attributes,new Tag(!get("Custom Agressive Mob") && get("Damage"), `{Name:generic.attack_damage,Base: ${get("Damage")}}`));
    addTag(Attributes,new Tag(get("Defense"), `{Name:generic.armor,Base:${get("Defense")}}`));
    addTag(Attributes,new Tag(get("Magic Defense"), `{Name:generic.armor_toughness,Base:${get("Magic Defense")}}`));
    addTag(Attributes,new Tag(get("Magic Damage"), `{Name:generic.attack_knockback,Base:${get("Magic Damage")}}`));
    addTag(Attributes,new Tag(get("Speed"), `{Name:generic.movement_speed,Base:${get("Speed")}}`));
    addTag(Attributes,new Tag(get("Knockback Resistance"), `{Name:generic.knockback_resistance,Base:${get("Knockback Resistance")}}`));
    addTag(nbt, new Tag(Attributes.length, ['Attributes:[',']'], Attributes));

    let Tags = [];
    addTag(Tags, new Tag(get("Custom Agressive Mob"), `"CustomAgressiveMob"`));
    addTag(Tags, new Tag(get("Tags"), get("Tags").split(" ").filter(Boolean).map(item => `"${item}"`).join(",")));
    addTag(nbt, new Tag(Tags.length, ['Tags:[',']'], Tags));

    let ActiveEffects = [];
    addTag(ActiveEffects, new Tag(true, `{Ambient: 0b, ShowIcon: 0b, ShowParticles: 0b, Duration: -1, Id: 11, Amplifier: 4b}`));
    addTag(ActiveEffects, new Tag(get("Custom Agressive Mob") && get("Damage"), `{Id:3,Amplifier:0b,Duration:${String(parseInt(get("Damage"))+1)},ShowParticles:0b}`));
    addTag(nbt, new Tag(ActiveEffects.length, ['ActiveEffects:[',']'], ActiveEffects));

    addTag(nbt,new Tag(get("Mob Level"), `PortalCooldown:${String(parseInt(get("Mob Level")) + 1)}`));

    addTag(nbt,new Tag(true, `CustomNameVisible:1b`));
    addTag(nbt,new Tag(true, `ArmorDropChances:[0.000F,0.000F,0.000F,0.000F]`));
    addTag(nbt,new Tag(true, `HandDropChances:[0.000F,0.000F]`));
    let ArmorItems = [];
    addTag(ArmorItems, new Tag(true, `{}`));
    addTag(ArmorItems, new Tag(true, `{}`));
    addTag(ArmorItems, new Tag(true, `{}`));
    {
        let tag = [];
        let json = [];
        addTag(json, new Tag(get("Name"), `"text":"${get("Name")}"`));
        addTag(json, new Tag(get("Name Color"), `"color":"${get("Name Color")}"`));
        addTag(tag, new Tag(get("Name"), [`MobName:'{`,`}'`], json));

        addTag(tag, new Tag(get("Name"), `MobNameRaw:"${get("Name")}"`));
        addTag(tag, new Tag(true, `CustomModelData:1b`));

        addTag(ArmorItems, new Tag(true, [`{id:"minecraft:scute",Count:1b,tag:{`,`}}`], tag));
    }
    addTag(nbt, new Tag(ArmorItems.length, ['ArmorItems:[',']'], ArmorItems));
    let CustomName = [];
    addTag(CustomName, new Tag(true, `""`));
    {
        let textComponent = [];
        addTag(textComponent, new Tag(true, `"text":"${get("HP")}"`));
        addTag(textComponent, new Tag(true, `"color":"green"`));
        addTag(CustomName, new Tag(textComponent.length, [`{`,`}`], textComponent));
    }
    {
        let textComponent = [];
        addTag(textComponent, new Tag(true, `"text":"/"`));
        addTag(textComponent, new Tag(true, `"color":"white"`));
        addTag(CustomName, new Tag(textComponent.length, [`{`,`}`], textComponent));
    }
    {
        let textComponent = [];
        addTag(textComponent, new Tag(true, `"text":"${get("HP")}"`));
        addTag(textComponent, new Tag(true, `"color":"green"`));
        addTag(CustomName, new Tag(textComponent.length, [`{`,`}`], textComponent));
    }
    {
        let textComponent = [];
        addTag(textComponent, new Tag(true, `"text":"❤ "`));
        addTag(textComponent, new Tag(true, `"color":"dark_red"`));
        addTag(CustomName, new Tag(textComponent.length, [`{`,`}`], textComponent));
    }
    {
        let textComponent = [];
        addTag(textComponent, new Tag(true, `"text":"${get("Name")} "`));
        addTag(textComponent, new Tag(true, `"color":"${get("Name Color")}"`));
        addTag(CustomName, new Tag(textComponent.length, [`{`,`}`], textComponent));
    }
    {
        let textComponent = [];
        addTag(textComponent, new Tag(true, `"text":"["`));
        addTag(textComponent, new Tag(true, `"color":"dark_gray"`));
        addTag(CustomName, new Tag(textComponent.length, [`{`,`}`], textComponent));
    }
    {
        let textComponent = [];
        addTag(textComponent, new Tag(true, `"text":"Lv${get("Mob Level")}"`));
        addTag(textComponent, new Tag(true, `"color":"gray"`));
        addTag(CustomName, new Tag(textComponent.length, [`{`,`}`], textComponent));
    }
    {
        let textComponent = [];
        addTag(textComponent, new Tag(true, `"text":"]"`));
        addTag(textComponent, new Tag(true, `"color":"dark_gray"`));
        addTag(CustomName, new Tag(textComponent.length, [`{`,`}`], textComponent));
    }
    addTag(nbt, new Tag(get("HP") && get("Mob Level") && get("Name"), [`CustomName:'[`,`]'`], CustomName));

    //CustomName:'["",{"text":"${get("HP")}","color":"green"},{"text":"/","color":"white"},{"text":"${get("HP")}","color":"green"},{"text":"❤ ","color":"dark_red"},{"text":"${get("Name")} ","color":"${get("Name Color")}"},{"text":"[","color":"dark_gray"},{"text":"Lv${get("Mob Level")}","color":"gray"},{"text":"]","color":"dark_gray"}]'}`;
    
    textarea.innerText= `/summon ${get("Mob Type")} ~ ~ ~ {${getNBT(nbt)}}`;
}