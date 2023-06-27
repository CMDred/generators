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
        switch (option.tagName) {
            case "INPUT":
                switch (option.type) {
                    case "text":
                        return option.value;
                    case "number":
                        return option.value == "" ? 0 : option.value;
                    case "checkbox":
                        return option.checked;
                    case "color":
                        return option.value;
                    default:
                        alert("unknown INPUT type: " + option.type);
                        break;
                }
                break;
            case "DIV":
                return [option.children[0].value,option.children[1].value];
            default:
                alert("unknown tagName: " + option.tagName);
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
    italic
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }
    
    get get() {
        let segment = [];
        addTag(segment, new Tag(this.value != undefined,`"text":"${this.value}"`));
        addTag(segment, new Tag(this.color != undefined,`"color":"${this.color}"`));
        addTag(segment, new Tag(this.italic != undefined,`"italic":"${this.italic}"`));
        return new Tag(true,[`{`,`}`],segment);
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

Array.prototype.get = function(key, value){
    let item = this.find(item => item[key].localeCompare(value, undefined, { sensitivity: 'accent' }) === 0);
    return item ? item : false;
}

function getSign(number) {
    if (number >= 0) {
        return "+" + number;
    }
    return number;
}

const shade = (hexColor, magnitude) => {
    const decimalColor = parseInt(hexColor.replace('#', ''), 16);
    let r = parseInt(Math.min(Math.max((decimalColor >> 16 & 255) * magnitude, 0), 255));
    let g = parseInt(Math.min(Math.max((decimalColor >> 8 & 255) * magnitude, 0), 255));
    let b = parseInt(Math.min(Math.max((decimalColor & 255) * magnitude, 0), 255));
    return rgbToHex(r,g,b);
};

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')


function output(){
    const rarity = rarities.get("name", get("Rarity"));
    const type = types.get("name", get("Type"));


    let nbt = [];
    let display = [];

    addTag(display,new Tag(get("display.color (leather armor only):") != "#a06540", `{Name:generic.max_health,Base:${get("display.color (leather armor only):")}d}`));

    let Name = new jsonSegment(get("Name"), rarity.color);
    Name.italic = false;
    addTag(display, new Tag(get("Name"),[`Name:'[`,`]'`],[Name.get]));

    let description = new jsonSegment(get("Description"),"dark_gray");
    var Lore = [];
    addTag(Lore, new Tag(get("Description"),[`'[`,`]'`],[description.get]));

    let lastgroup = 0;

    if(document.getElementsByClassName("hidestat2").length == statData.length){//all stats are a set value
        let stats = [];
        for(const stat of statData){
            let values = get(stat.id);
            if(values[0]){
                addStatToLore(stat,values);
            }
            addTag(stats, new Tag(values[0], `${stat.nbt}:${values[0]}`));
        }
        addTag(nbt, new Tag(stats.length,['Stats:{','}'],stats));
        addTag(nbt, new Tag(stats.length,['BaseStats:{','}'],stats));
    }else{//at least one stat is a range
        let RandomStats = [];
        for(const stat of statData){
            let values = get(stat.id);
            if(values[0]){
                addStatToLore(stat,values);
            }
            addTag(RandomStats, new Tag(values[0], `Min_${stat.nbt}:${values[0]}`));
            if(values[0] && ! values[1]){//second value isn't set
                addTag(RandomStats, new Tag(values[0], `Max_${stat.nbt}:${values[0]}`));
            }else{//full range is set
                addTag(RandomStats, new Tag(values[1], `Max_${stat.nbt}:${values[1]}`));
            }
        }
        addTag(nbt, new Tag(RandomStats.length,['RandomStats:{','}'],RandomStats));
    }

    function addStatToLore(stat, values) {
        if(stat.group != lastgroup){
            addTag(Lore, new Tag(true, [`'[`,`]'`],[new jsonSegment(``,``).get]));//empty line
            lastgroup = stat.group;
        }
        let line = [];
        let symbol = new jsonSegment(`${stat.symbol}${" ".repeat(stat.numberOfSpaces)}`, `${stat.symbolColor}`);
        symbol.italic = false;
        addTag(line, symbol.get);
        let name = new jsonSegment(`${stat.name}: `, `gray`);
        name.italic = false;
        addTag(line, name.get);
        let value = new jsonSegment(`${getSign(values[0])}${stat.isPercentage == true ? "%" : ""}`, `${stat.numberColor}`);
        value.italic = false;
        addTag(line, value.get);
        console.log(value);
        addTag(Lore, new Tag(line.length,[`'[`,`]'`],line));
    }

    addTag(Lore, new Tag(true, [`'[`,`]'`],[new jsonSegment(``,``).get]));//empty line

    addTag(Lore, new Tag(get(`Can be upgraded? (has "This item can be upgraded" text) `), [`'[`,`]'`], [Object.assign(new jsonSegment(`This item can be upgraded`,`dark_gray`),{italic: false}).get]));

    addTag(display, new Tag(Lore.length,[`Lore:[`,`]`], Lore));
    addTag(nbt, new Tag(display.length,['display:{','}'],display));
    addTag(nbt, new Tag(get("Description"),['Description:[',']'],[description.get]));

    addTag(nbt,new Tag(get("Name"),`Name:'${get("Name")}'`));
    if(type){
        addTag(nbt,new Tag(get("Type"),`Type:'${type.name.toUpperCase()}'`));
        addTag(nbt,new Tag(type.isTool,`isTool:1b`));

        if(!["","Material"].includes(type.name)){
            let CustomEnchantments = [];
            for (let i = 0; i < rarities.indexOf(rarity)+1; i++) {
                CustomEnchantments.push(new Tag(true, `Slot${i}:""`))
            }
            addTag(nbt, new Tag(true, [`CustomEnchantments:{`,`}`],CustomEnchantments));
        }
        let SkullOwner = get("SkullOwner (Enter Value or Username):");
        if(get("Item ID") == "player_head" && SkullOwner){
            if(SkullOwner.length < 17){
                addTag(nbt, new Tag(true, `SkullOwner:"${SkullOwner}"`));
            }else {
                addTag(nbt, new Tag(true, `,SkullOwner:{Id:[I;0,0,7,0],Properties:{textures:[{Value:"${skullOwner}"}]}}`));
            }
        }
        const AttributeModifiers = [];
        addTag(AttributeModifiers, new Tag(true, `AttributeName:"minecraft:generic.luck",Amount:-0.000999999999,Operation:0,UUID:${type.attributeUuid.id},Slot:"${type.attributeUuid.slot}"`));
        addTag(nbt, new Tag(true, [`AttributeModifiers:[`,`]`],AttributeModifiers));
    }
    if(rarity){
        addTag(nbt,new Tag(get("Rarity"),`Rarity:'${rarity.name.toUpperCase()}'`));
        addTag(nbt, new Tag(true, [`RarityColor:`,``],[new jsonSegment(``,rarity.color).get]));
        addTag(nbt, new Tag(true, [`LevelColor:`,``],[new jsonSegment(``,shade(rarity.color,2/3)).get]));
        let raritynbt = [];
        addTag(raritynbt, new jsonSegment(`${rarity.name.toUpperCase()} ${ type.name.toUpperCase()}`).get);
        addTag(Lore, new Tag(raritynbt.length,[`'[`,`]'`],raritynbt));
    }

    // output += `${input.canBeUpgraded === true ? ",Level:0,Upgradable:1b" : ""}${input.customModelData > 0 ? `,CustomModelData:${input.customModelData}` : ""},AttributeModifiers:[{AttributeName:"minecraft:generic.luck",Amount:-0.000999999999,Operation:0,UUID:${types[input.type].attributeUuid.id},Slot:"${types[input.type].attributeUuid.slot}"}]}`;
    addTag(nbt,new Tag(true, `HideFlags:127`));
    addTag(nbt,new Tag(true, `Unbreakable:1b`));
    if(get(`Can be upgraded? (has "This item can be upgraded" text) `)){
        addTag(nbt, new Tag(true, `Level:0`));
        addTag(nbt, new Tag(true, `Upgradable:1b`));
    }
    addTag(nbt, new Tag(get(`CustomModelData`), `CustomModelData:${get(`CustomModelData`)}`));

    textarea.innerText= `/give @p ${get("Item ID")}{${getNBT(nbt)}}`;
}