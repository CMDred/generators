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

class jsonSegment {
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }
    
    get get() {
        return new Tag(true,`{"text":"${this.value}","color":"${this.color}"}`);
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

function addjsonSegment(list, tag){
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
    addTag(Tags, new Tag(get("Custom Agressive Mob"), `"MobStackVehicle"`));
    addTag(Tags, new Tag(get("Tags"), get("Tags").split(" ").filter(Boolean).map(item => `"${item}"`).join(",")));
    addTag(nbt, new Tag(Tags.length, ['Tags:[',']'], Tags));

    let active_effects = [];
    addTag(active_effects, new Tag(true, `{ambient: 0b, show_particles: 0b, duration: -1, id: "minecraft:resistance", amplifier: 4b}`));
    addTag(active_effects, new Tag(get("Custom Agressive Mob") && get("Damage"), `{id: "minecraft:haste", amplifier:0b, duration:${String(parseInt(get("Damage"))+1)},show_particles:0b}`));
    addTag(nbt, new Tag(active_effects.length, ['active_effects:[',']'], active_effects));

    addTag(nbt,new Tag(get("Mob Level"), `PortalCooldown:${String(parseInt(get("Mob Level")) + 1)}`));

    addTag(nbt,new Tag(true, `CustomNameVisible:1b`));
    addTag(nbt,new Tag(true, `ArmorDropChances:[0.000F,0.000F,0.000F,0.000F]`));
    addTag(nbt,new Tag(true, `HandDropChances:[0.000F,0.000F]`));
    

    let CustomName = [];
    addTag(CustomName, new Tag(true, `""`));
    addTag(CustomName, new jsonSegment(`${parseInt(get("HP")).toLocaleString('en-US')}`,`green`).get);
    addTag(CustomName, new jsonSegment(`/`,`white`).get);
    addTag(CustomName, new jsonSegment(`${parseInt(get("HP")).toLocaleString('en-US')}`,`green`).get);
    addTag(CustomName, new jsonSegment(`❤ `,`dark_red`).get);
    addTag(CustomName, new jsonSegment(`${get("Name")} `,`${get("Name Color")}`).get);
    addTag(CustomName, new jsonSegment(`[`,`dark_gray`).get);
    addTag(CustomName, new jsonSegment(`Lv${get("Mob Level")}`,`gray`).get);
    addTag(CustomName, new jsonSegment(`]`,`dark_gray`).get);
    

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
        addTag(tag, new Tag(true, `CustomModelData:1b`));
        addTag(tag, new Tag(true, `HealthBarName:'[${getNBT(CustomName.slice(2))}]'`));


        addTag(ArmorItems, new Tag(true, [`{id:"minecraft:turtle_scute",Count:1b,tag:{`,`}}`], tag));
    }
    addTag(nbt, new Tag(ArmorItems.length, ['ArmorItems:[',']'], ArmorItems));
    let Passengers = [];
    addTag(Passengers, new Tag(get("Custom Agressive Mob"), `{id:"minecraft:zombified_piglin",IsBaby:1b,Silent:1b,DeathLootTable:"",Tags:["MobStackPassenger","Registered"],active_effects:[{id:"minecraft:resistance",amplifier:4b,duration:-1,show_particles:0b},{id:"minecraft:invisibility",amplifier:0b,duration:-1,show_particles:0b}]}`));
    if(["skeleton", "stray", "wither_skeleton"].includes(get("Mob Type").toLowerCase())){
        addTag(Passengers, new Tag(true, [`{id:"minecraft:item_display",CustomNameVisible:1b,CustomName:'[`,`]'}`], CustomName));

        let FakeCustomName = [];
        addTag(FakeCustomName, new Tag(true, `""`));
        addTag(FakeCustomName, new jsonSegment(`${(0).toLocaleString('en-US')}`,`red`).get);
        addTag(FakeCustomName, new jsonSegment(`/`,`white`).get);
        addTag(FakeCustomName, new jsonSegment(`${parseInt(get("HP")).toLocaleString('en-US')}`,`green`).get);
        addTag(FakeCustomName, new jsonSegment(`❤ `,`dark_red`).get);
        addTag(FakeCustomName, new jsonSegment(`${get("Name")} `,`${get("Name Color")}`).get);
        addTag(FakeCustomName, new jsonSegment(`[`,`dark_gray`).get);
        addTag(FakeCustomName, new jsonSegment(`Lv${get("Mob Level")}`,`gray`).get);
        addTag(FakeCustomName, new jsonSegment(`]`,`dark_gray`).get);
        addTag(nbt, new Tag(true, [`CustomName:'[`,`]'`], FakeCustomName));
    }else{
        addTag(nbt, new Tag(true, [`CustomName:'[`,`]'`], CustomName));
    }
    addTag(nbt, new Tag(Passengers.length, ['Passengers:[',']'], Passengers));

    textarea.innerText= `/summon ${get("Mob Type")} ~ ~ ~ {${getNBT(nbt)}}`;
}