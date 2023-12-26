const textarea = document.getElementById("output");

function get(name){
    return getvalue(settings,name);
}

function getvalue(settings,name){
    index = settings.findIndex(e => e.name == name);
    if(index == -1){
        console.log("setting name not found");
    }else if(settings[index].type == "Abilities"){
        let values = [];
        let container = options.children[index];
        for(ability of container.children){
            Ability_Name = ability.children[2].children[1].value;
            Activation =  ability.children[3].children[1].value;
            if(Ability_Name == "" || Activation == ""){
                continue;
            }
            Display_Ability_Name = ability.children[1].children[1].value;
            Description =  ability.children[4].children[1].value;
            Mana_Cost =  ability.children[5].children[1].value;
            values.push([Ability_Name, Activation, Display_Ability_Name, Description, Mana_Cost]);
        }
        return values;
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
                if(settings[index].type == "upgradecost"){
                    values = [];
                    for(child of option.children){
                        values.push([child.children[0].value, child.children[1].value])
                    }
                    return values;
                }
                return [option.children[0].value,option.children[1].value];
            case "LABEL"://checkbox/slider
                return option.children[0].checked
            case "SELECT":
                return option.selectedIndex;
            default:
                alert("unknown tagName: " + option.tagName);
                break;
        }
    }
    return;
}

class Tag {
    constructor(value1, content = []) {
        this.value1 = value1;
        this.content = content;
    }
}

class jsonSegment {
    italic = false
    obfuscated
    bold
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }
    
    get get() {
        let segment = [];
        if(this.value == "" && this.color == ""){
            return new Tag(`""`);
        }
        if(this.value != undefined){
            addTag(segment, new Tag(`"text":"${this.value}"`));
        }
        if(this.color != ""){
            addTag(segment, new Tag(`"color":"${this.color}"`));
        }
        if(this.italic != undefined){
            addTag(segment, new Tag(`"italic":${this.italic}`));
        }
        if(this.obfuscated != undefined){
            addTag(segment, new Tag(`"obfuscated":${this.obfuscated}`));
        }
        if(this.bold != undefined){
            addTag(segment, new Tag(`"bold":${this.bold}`));
        }
        return new Tag([`{`,`}`],segment);
    }
}

function getNBT(nbt) {
    out = ""
    for(const tag of nbt){
        if(tag.content.length){ 
            out += tag.value1[0] + getNBT(tag.content) + tag.value1[1] + ",";
        }else{
            out += tag.value1 + ",";
        }
    }
    return out.slice(0, -1);
}

function addTag(list, tag){
    list.push(tag)
}

function addjsonSegment(list, tag){
    list.push(tag)
}

Array.prototype.get = function(key, value){
    let item = this.find(item => item[key].localeCompare(value, undefined, { sensitivity: 'accent' }) === 0);
    return item ? item : false;
}

function getSign(number, isPercentage) {
    if (number >= 0 && isPercentage) {
        return "+" + number;
    }
    return number;
}

function getColor(value){
    return value > 0 ? 'white' : "red";
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

function getDecimal(hex){
    hex = hex.replace('#', '');
    return (parseInt(hex.substr(0,2),16) * 256 + parseInt(hex.substr(2,2),16) * 1) * 256 + parseInt(hex.substr(4,2),16) * 1
}

function output(){
    const rarity = rarities[get("Rarity")];
    const TypeID = get('Type');
    const Type = Types[TypeID];


    let nbt = [];
    let display = [];
    var Lore = [];

    if(get("display.color (leather armor only):") != "#a06540"){
        addTag(display,new Tag(`color:${getDecimal(get("display.color (leather armor only):"))}`));
    }

    let Name = new jsonSegment(get("Name").replaceAll(`\\`, `\\\\\\\\`).replaceAll(`'`, `\\'`).replaceAll(`"`, `\\\\"`), rarity.color);
    if(get("Name")){
        addTag(display, new Tag([`Name:'[`,`]'`],[Name.get]));
    }
    let descriptionText = get("Description").replaceAll(`\\`, `\\\\\\\\`).replaceAll(`'`, `\\'`).replaceAll(`"`, `\\\\"`).split('\\\\\\\\n');
    if(TypeID){
        addTag(Lore, new Tag([`'[`,`]'`],[new jsonSegment(`[${Type} | ${rarity.name}]` , "#EDEDED").get]));
    }else{
        addTag(Lore, new Tag([`'[`,`]'`],[new jsonSegment(`[${rarity.name}]` , "white").get]));
    }
    if(get(`Can be upgraded? (has "This item can be upgraded" text) `)){
        addTag(nbt, new Tag(`Level:0b`));
        addTag(Lore, new Tag([`'[`,`]'`],[new jsonSegment(`Level +0` , "#EDEDED").get]));
        let UpgradeCost = []
        for (let i = 0; i < 9; i++) {
            let values = get(`upgradecost: ${i}`);
            let row = [];
            for(set of values){
                if(set[0] != "" && set[1] != ""){
                    addTag(row, new Tag(`{Count: ${set[1]}, MaterialID: ${set[0]}}`));
                }
            }
            if(row.length == 0){
                addTag(UpgradeCost, new Tag(`[]`));
            }else{
                addTag(UpgradeCost, new Tag([`[`,`]`], row));
            }
        }
        addTag(nbt, new Tag([`UpgradeCost:[`,`]`], UpgradeCost));
    }
    let description = [];
    if(descriptionText.length > 1 || descriptionText[0] != ""){
        addTag(Lore, new Tag([`'[`,`]'`],[new jsonSegment(``,``).get]));//empty line
        for(segement of descriptionText){
            addTag(description, new Tag([`'`,`'`], [Object.assign(new jsonSegment(segement,"dark_gray"),{italic: true}).get]));
            addTag(Lore, new Tag([`'`,`'`], [Object.assign(new jsonSegment(segement,"dark_gray"),{italic: true}).get]));
        }
    }

    let lastgroup = 0;

    let hasStat = false;
    let Stats = [];
    let RandomStats = [];
    for(const stat of statData){
        let values = get(stat.id);
        if(values[0]){//the stat has a value
            hasStat = true;
            addStatToLore(stat,values);
            if(values[1]){
                addTag(RandomStats, new Tag(`Min_${stat.nbt}:${values[0]}`));
                addTag(RandomStats, new Tag(`Max_${stat.nbt}:${values[1]}`));
            }else{
                addTag(Stats, new Tag(`${stat.nbt}:${values[0]}`));
            }
        }
    }

    if(hasStatRange()){
        if(RandomStats.length){
            addTag(nbt, new Tag(['RandomStats:{','}'],RandomStats));
        }
        if(Stats.length){
            addTag(nbt, new Tag(['BaseStats:{','}'],Stats));
        }
    }else{
        if(Stats.length){
            addTag(nbt, new Tag(['Stats:{','}'],Stats));
            addTag(nbt, new Tag(['BaseStats:{','}'],Stats));
        }
    }

    function addStatToLore(stat, values) {
        if(stat.group != lastgroup){
            addTag(Lore, new Tag([`'[`,`]'`],[new jsonSegment(``,``).get]));//empty line
            lastgroup = stat.group;
        }
        let line = [];
        let symbol = new jsonSegment(`${stat.symbol}${" ".repeat(stat.numberOfSpaces)}`, `${stat.symbolColor}`);
        addTag(line, symbol.get);
        let name = new jsonSegment(`${stat.name} `, `gray`);
        addTag(line, name.get);
        if(values[1] == 0){
            let value = new jsonSegment(`${getSign(values[0],stat.isPercentage)}${stat.isPercentage == true ? "%" : ""}`, getColor(values[0]));
            addTag(line, value.get);
        }else{
            addTag(line,new jsonSegment(`${getSign(values[0],stat.isPercentage)}${stat.isPercentage == true ? "%" : ""}`, getColor(values[0])).get);
            addTag(line,new jsonSegment(` - `,`white`).get)
            addTag(line,new jsonSegment(`${getSign(values[1],stat.isPercentage)}${stat.isPercentage == true ? "%" : ""}`, getColor(values[1])).get);
        }
        if(line.length){
            addTag(Lore, new Tag([`'[`,`]'`],line));
        }
    }
    AbilityData = get("Abilities")
    if(AbilityData.length > 0){
        AbilityNBT = [];
        for(ability of AbilityData){
            let Activation = {};
            for(a of Activations){
                if(a.name.toLowerCase() == ability[1]){
                    Activation = a;
                    break;
                }
            }
            
            AbilityNBT.unshift(new Tag(`{Name:"${ability[0]}", Activation:${Activation.id}b}`));
            if(ability[2] != "" || ability[3] != ""|| ability[4] != ""){
                addTag(Lore, new Tag([`'[`,`]'`],[new jsonSegment(``,``).get]));//empty line
                if(ability[2] != ""){
                    let n = new jsonSegment(ability[2], rarity.color);
                    let b1 = new jsonSegment(` [`, 'yellow');
                    b1.bold = true;
                    let a = new jsonSegment(Activation.display, 'gold');
                    let b2 = new jsonSegment(`]`, 'yellow');
                    b2.bold = true;
                    addTag(Lore, new Tag([`'[`,`]'`], [n.get,b1.get,a.get,b2.get]));
                    console.log(Lore);
                }
                if(ability[3] != ""){
                    let descriptionText = ability[3].replaceAll(`\\`, `\\\\\\\\`).replaceAll(`'`, `\\'`).replaceAll(`"`, `\\\\"`).split('\\\\\\\\n');
                    console.log(descriptionText);
                    if(descriptionText.length > 1 || descriptionText[0] != ""){
                        for(segement of descriptionText){
                            addTag(Lore, new Tag([`'`,`'`], [new jsonSegment(segement,"gray").get]));
                        }
                    }
                }
                if(ability[4] != ""){
                    addTag(Lore, new Tag([`'[`,`]'`], [new jsonSegment(` ₪ Mana: `,`aqua`).get, new jsonSegment(ability[4],`white`).get]));
                }
            }
        }
        addTag(nbt, new Tag([`Abilities:[`,`]`], AbilityNBT));
    }

    if(TypeID && rarity){
        addTag(Lore, new Tag([`'[`,`]'`],[new jsonSegment(``,``).get]));//empty line
        let CustomEnchantments = [];
        let start = new jsonSegment(`||`, rarity.color);
        start.obfuscated = true;
        addTag(CustomEnchantments, new Tag(`""`));
        addTag(CustomEnchantments, start.get);
        for (let i = 0; i < rarities.indexOf(rarity)+1; i++) {
            addTag(CustomEnchantments, new jsonSegment(` [`, shade(colorCodes.white,2/3)).get);
            addTag(CustomEnchantments, new jsonSegment(`❌`, `white`).get);
            addTag(CustomEnchantments, new jsonSegment(`] `, shade(colorCodes.white,2/3)).get);
        }
        let enchantements = new jsonSegment(` Enchantments`, rarity.color);
        addTag(Lore, new Tag([`'[`,`]'`],[new Tag(`""`), start.get,enchantements.get]));
        addTag(Lore, new Tag([`'[`,`]'`],CustomEnchantments));
    }

    if(TypeID){
        addTag(nbt,new Tag(`TypeID:${TypeID}b`)); 
        let CustomEnchantments = [];
        for (let i = 0; i < rarities.indexOf(rarity)+1; i++) {
            CustomEnchantments.push(new Tag(`Slot${i}:-2`))
        }
        if(hasStatRange()){
            addTag(nbt, new Tag([`RandomEnchantments:{`,`}`],CustomEnchantments));
        }else{
            addTag(nbt, new Tag([`CustomEnchantments:{`,`}`],CustomEnchantments));
        }
        let SkullOwner = get("SkullOwner (Enter Value or Username):");
        if(get("Item ID") == "player_head" && SkullOwner){
            if(SkullOwner.length < 17){
                addTag(nbt, new Tag(`SkullOwner:"${SkullOwner}"`));
            }else {
                addTag(nbt, new Tag(`,SkullOwner:{Id:[I;0,0,7,0],Properties:{textures:[{Value:"${skullOwner}"}]}}`));
            }
        }
        const AttributeModifiers = [];
        let attributeUuid;
        switch (TypeID) {
            case 1:
                attributeUuid = attributeUuids.HEAD;
                break;
            case 2:
                attributeUuid = attributeUuids.CHEST;
                break;
            case 3:
                attributeUuid = attributeUuids.LEGS;
                break;
            case 4:
                attributeUuid = attributeUuids.FEET;
                break;
            default:
                attributeUuid = attributeUuids.MAINHAND;
                break;
        }
        addTag(AttributeModifiers, new Tag(`{AttributeName:"minecraft:generic.luck",Amount:-0.000999999999,Operation:0,UUID:${attributeUuid.id},Slot:"${attributeUuid.slot}"}`));
        if(["bow", "minecraft:bow"].includes(get("Item ID").toLocaleLowerCase())){
            addTag(AttributeModifiers, new Tag(`{AttributeName:"generic.attack_speed",Amount:-999,Operation:0,UUID:${attributeUuid.id},Slot:"${attributeUuid.slot}"}`));
        }
        addTag(nbt, new Tag([`AttributeModifiers:[`,`]`],AttributeModifiers));
    }
    if(rarity){
        addTag(nbt,new Tag(`Rarity:'${rarity.name}'`));
        addTag(nbt, new Tag([`RarityColor:'`,`'`],[new jsonSegment(``,rarity.color).get]));
    }

    addTag(nbt,new Tag(`HideFlags:127`));
    addTag(nbt,new Tag(`Unbreakable:1b`));
    if(get(`CustomModelData`)){
        addTag(nbt, new Tag(`CustomModelData:${get(`CustomModelData`)}`));
    }
    if(get(`RandomCustomModelData`)){
        addTag(nbt, new Tag(`RandomCustomModelData:${get(`RandomCustomModelData`)}`));
    }

    let RandomName = new jsonSegment(get("RandomName").replaceAll(`\\`, `\\\\\\\\`).replaceAll(`'`, `\\'`).replaceAll(`"`, `\\\\"`), rarity.color);
    if(get("RandomName")){
        addTag(nbt, new Tag([`RandomName:'[`,`]'`],[RandomName.get]));
    }
    if(Lore.length){
        addTag(display, new Tag([`Lore:[`,`]`], Lore));
    }
    if(display.length){
        addTag(nbt, new Tag(['display:{','}'],display));
    }
    if(get("Description")){
        addTag(nbt, new Tag([`Description:[`,`]`],description));
    }

    textarea.innerText= `/give @p ${get("Item ID")}{${getNBT(nbt)}}`;
    console.log("Lore");
    console.log(getNBT(Lore));
    preview(Name,Lore);
    checkhidden()
}

function compareItems(input, options){
    input = input.toLowerCase()
    for(option of options){
        if(input.endsWith(option.toLowerCase())){
            return true
        }
    }
    return false
}

function checkhidden(){
    for(let setting in settings){
        const element = options.children[setting];
        switch (settings[setting].hidden) {
            case "Upgradeable":
                if(get(`Can be upgraded? (has "This item can be upgraded" text) `)){
                    element.classList.remove('hide');
                }else{
                    element.classList.add('hide');
                }
                break;
            case "skull":
                if(compareItems(get("Item ID"),["player_head"])){
                    element.classList.remove('hide');
                }else{
                    element.classList.add('hide');
                }
                break;
            case "leather":
                if(compareItems(get("Item ID"),["LEATHER_HELMET","LEATHER_CHESTPLATE", "LEATHER_LEGGINGS", "LEATHER_BOOTS", "LEATHER_HORSE_ARMOR"])){
                    element.classList.remove('hide');
                }else{
                    element.classList.add('hide');
                }
                break;
            default:
                break;
        }
    }
}