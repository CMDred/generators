/*

Made by Pruper
For the Melyra Project

*/


let input = {
    itemId: "iron_ingot",
    dye: null,
    name: "Placeholder Item",
    description: "This item is cool.\nTwo lines!",
    rarity: 0,
    type: 0,
    canBeUpgraded: false,
    color: 10511680,
    customModelData: 0,

    stat_health: 0,
    stat_defense: 0,
    stat_magicDefense: 0,
    stat_healthRegeneration: 0,
    stat_manaRegeneration: 0,

    stat_damage: 0,
    stat_strength: 0,
    stat_critical: 0,
    stat_drawSpeed: 0,
    stat_overdraw: 0,
    stat_attackSpeed: 0,
    stat_lifeSteal: 0,
    stat_mana: 0,
    stat_magicDamage: 0,

    stat_speed: 0,
    stat_arcane: 0,
    stat_miningSpeed: 0,
    stat_woodcuttingSpeed: 0,
    stat_fishingSpeed: 0
}

const statData = [
    { id: "health", group: 1, symbol: "❤", numberOfSpaces: 1, symbolColor: "red", numberColor: "green", name: "Health", nbt: "MaxHealth", isPercentage: false },
    { id: "defense", group: 1, symbol: "❂", numberOfSpaces: 1, symbolColor: "green", numberColor: "green", name: "Defense", nbt: "Defense", isPercentage: false },
    { id: "magicDefense", group: 1, symbol: "۞", numberOfSpaces: 1, symbolColor: "blue", numberColor: "green", name: "Magic Defense", nbt: "MagicDefense", isPercentage: false },
    { id: "healthRegeneration", group: 1, symbol: "❣", numberOfSpaces: 1, symbolColor: "red", numberColor: "green", name: "Health Regeneration", nbt: "HealthRegeneration", isPercentage: true },
    { id: "manaRegeneration", group: 1, symbol: "๑", numberOfSpaces: 1, symbolColor: "blue", numberColor: "green", name: "Mana Regeneration", nbt: "ManaRegeneration", isPercentage: true },

    { id: "damage", group: 2, symbol: "🗡", numberOfSpaces: 1, symbolColor: "red", numberColor: "red", name: "Damage", nbt: "Damage", isPercentage: false },
    { id: "strength", group: 2, symbol: "❁", numberOfSpaces: 1, symbolColor: "red", numberColor: "red", name: "Strength", nbt: "Strength", isPercentage: false },
    { id: "critical", group: 2, symbol: "☣", numberOfSpaces: 1, symbolColor: "red", numberColor: "red", name: "Critical", nbt: "Critical", isPercentage: true },
    { id: "drawSpeed", group: 2, symbol: "➹", numberOfSpaces: 1, symbolColor: "green", numberColor: "red", name: "Draw Speed", nbt: "DrawSpeed", isPercentage: true },
    { id: "overdraw", group: 2, symbol: "🏹", numberOfSpaces: 1, symbolColor: "blue", numberColor: "red", name: "Overdraw", nbt: "Overdraw", isPercentage: true },
    { id: "attackSpeed", group: 2, symbol: "✲", numberOfSpaces: 1, symbolColor: "yellow", numberColor: "red", name: "Attack Speed", nbt: "AttackSpeed", isPercentage: true },
    { id: "lifeSteal", group: 2, symbol: "♡", numberOfSpaces: 1, symbolColor: "white", numberColor: "red", name: "Life Steal", nbt: "LifeSteal", isPercentage: true },
    { id: "mana", group: 2, symbol: "₪", numberOfSpaces: 1, symbolColor: "aqua", numberColor: "red", name: "Mana", nbt: "Mana", isPercentage: false },
    { id: "magicDamage", group: 2, symbol: "✯", numberOfSpaces: 1, symbolColor: "aqua", numberColor: "red", name: "Magic Damage", nbt: "MagicDamage", isPercentage: false },

    { id: "speed", group: 3, symbol: "✦", numberOfSpaces: 1, symbolColor: "white", numberColor: "white", name: "Speed", nbt: "Speed", isPercentage: true },
    { id: "arcane", group: 3, symbol: "¤", numberOfSpaces: 1, symbolColor: "light_purple", numberColor: "white", name: "Arcane", nbt: "Arcane", isPercentage: false },
    { id: "miningSpeed", group: 3, symbol: "⛏", numberOfSpaces: 1, symbolColor: "gold", numberColor: "white", name: "Mining Speed", nbt: "MiningSpeed", isPercentage: false },
    { id: "woodcuttingSpeed", group: 3, symbol: "🪓", numberOfSpaces: 1, symbolColor: "gold", numberColor: "white", name: "Woodcutting Speed", nbt: "WoodcuttingSpeed", isPercentage: false },
    { id: "fishingSpeed", group: 3, symbol: "🎣", numberOfSpaces: 1, symbolColor: "gold", numberColor: "white", name: "Fishing Speed", nbt: "FishingSpeed", isPercentage: false },
]

const colorCodes = {
    dark_red: "AA0000",
    red: "FF5555",
    gold: "FFAA00",
    yellow: "FFFF55",
    dark_green: "00AA00",
    green: "55FF55",
    aqua: "55FFFF",
    dark_aqua: "00AAAA",
    dark_blue: "0000AA",
    blue: "5555FF",
    light_purple: "FF55FF",
    dark_purple: "AA00AA",
    white: "FFFFFF",
    gray: "AAAAAA",
    dark_gray: "555555",
    black: "000000",
}


const rarities = [
    { name: "Common", color: "white" },
    { name: "Uncommon", color: "green" },
    { name: "Rare", color: "blue" },
    { name: "Epic", color: "light_purple" },
    { name: "Legendary", color: "aqua" },
]

const attributeUuids = {
    MAINHAND: { id: "[I;12,42069,0,10]", slot: "mainhand" },
    OFFHAND: { id: "[I;12,42069,0,11]", slot: "offhand" },
    HEAD: { id: "[I;12,42069,0,12]", slot: "head" },
    CHEST: { id: "[I;12,42069,0,13]", slot: "chest" },
    LEGS: { id: "[I;12,42069,0,14]", slot: "legs" },
    FEET: { id: "[I;12,42069,0,15]", slot: "feet" }
}

const types = [
    { name: "", isTool: false, attributeUuid: attributeUuids.MAINHAND }, // Normal item
    { name: "Material", isTool: false, attributeUuid: attributeUuids.MAINHAND }, // Material
    { name: "Pickaxe", isTool: true, attributeUuid: attributeUuids.MAINHAND },
    { name: "Axe", isTool: true, attributeUuid: attributeUuids.MAINHAND },
    { name: "Sword", isTool: false, attributeUuid: attributeUuids.MAINHAND },
    { name: "Dagger", isTool: false, attributeUuid: attributeUuids.MAINHAND },
    { name: "Spear", isTool: false, attributeUuid: attributeUuids.MAINHAND },
    { name: "Bow", isTool: false, attributeUuid: attributeUuids.MAINHAND },
    { name: "Helmet", isTool: false, attributeUuid: attributeUuids.HEAD },
    { name: "Chestplate", isTool: false, attributeUuid: attributeUuids.CHEST },
    { name: "Leggings", isTool: false, attributeUuid: attributeUuids.LEGS },
    { name: "Boots", isTool: false, attributeUuid: attributeUuids.FEET }
]

function generateOutput() {
    let output = `/give @p ${input.itemId}{display:{`;

    // Leather dye color
    if (input.itemId.startsWith("leather_") && input.color != 10511680) {
        output += `color:${input.color},`;
    }

    // Item Name
    input.name = input.name.replaceAll("'", "\\'").replaceAll("\"", "\\" + "\\\"");
    output += `Name:'{"text":"${input.name}","color":"${rarities[input.rarity].color}","italic":false}'`;

    // Lore
    output += `,Lore:['PlaceholderLore'` // PlaceholderLore tag gets removed, only here for leading comma support.

    // Item description
    let descriptionnbt = ""
    if (input.description != "") {
        input.description = input.description.replaceAll("'", "\\'").replaceAll("\"", "\\" + "\\\"");
        output += `,'{"text":"${input.description}","color":"dark_gray"}'`.replaceAll("\\n", `","color":"dark_gray"}','{"text":"`);
        descriptionnbt += `['{"text":"${input.description}","color":"dark_gray"}'`.replaceAll("\\n", `","color":"dark_gray"}','{"text":"`) + `]`;
    }

    // Stats
    let statnbt = `{Placeholder:1b` // Placeholder tag gets removed, only here for leading comma support.

    // Group 1
    let sol = JSON.parse(JSON.stringify(statData));
    sol.sort(function(a, b) {
        return a - b;
    });

    let currentGroup = 0;
    for (i in sol) {
        if (sol[i].group != currentGroup && input[`stat_${sol[i].id}`] != 0) {
            output += `,'{"text":""}'`;
            currentGroup = sol[i].group;
        }

        if (input[`stat_${sol[i].id}`] != 0) {
            output += `,'[{"text":"${sol[i].symbol}${" ".repeat(sol[i].numberOfSpaces)}","color":"${sol[i].symbolColor}","italic":false},{"text":"${sol[i].name}: ","color":"gray"},{"text":"${getSign(input[`stat_${sol[i].id}`])}${sol[i].isPercentage == true ? "%" : ""}","color":"${sol[i].numberColor}"}]'`;
            statnbt += `,${sol[i].nbt}:${input[`stat_${sol[i].id}`]}`;
        }
    }

    statnbt = statnbt.replace("Placeholder:1b,", "").replace("Placeholder:1b", "") + `}`;

    // Line before rarity
    output += `,'{"text":""}'`;

    // Can be upgraded?
    if (input.canBeUpgraded === true) {
        output += `,'{"text":"This item can be upgraded","color":"dark_gray","italic":false}'`;
    }

    // Rarity text
    output += `,'{"text":"${rarities[input.rarity].name.toUpperCase()} ${types[input.type].name.toUpperCase()}","color":"${rarities[input.rarity].color}","bold":true,"italic":false}'`;

    // Finish lore
    output += `]`;
    output = output.replace("'PlaceholderLore',", "").replace("'PlaceholderLore'", "");

    // Remaining tags

    // Lore generator tags
    output += `}`
    if (descriptionnbt != "") {
        output += `,Description:${descriptionnbt}`;
    }

    let outputnamenbttag = input.name.replaceAll("\\'", "'").replaceAll("\\\"", "\"");
    output += `,Name:"${outputnamenbttag}",Type:"${types[input.type].name.toUpperCase()}"${types[input.type].isTool === true ? ",isTool:1b" : ""},Rarity:"${rarities[input.rarity].name.toUpperCase()}",RarityColor:'{"text":"","color":"${rarities[input.rarity].color}"}',LevelColor:'{"text":"","color":"${"#" + darkenColor(rarities[input.rarity].color, -85)}"}'`

    // SkullOwner
    if (input.itemId == "player_head" && input.skullOwner != "") {
        if (input.skullOwner.length < 17) {
            output += `,SkullOwner:"${input.skullOwner}"`;

            /*

            /give @p minecraft:player_head{display:{Name:"{\"text\":\"French Fries\"}"},SkullOwner:{Id:[I;-770079510,-1463729170,-2146636326,-1335659767],Properties:{textures:[{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjBhNTEwZGI4NGMwMThkOGQyNTBhYjFlZTU2NDQxODUyOWU4OGQzYWYzYWVjMTZmYzFiZGVmNDA4ZDFkNGVjOCJ9fX0="}]}}} 1

            */
        } else {
            output += `,SkullOwner:{Id:[I;696969,420420,696969,420420],Properties:{textures:[{Value:"${input.skullOwner}"}]}}`;
        }
    }

    // Remaining tags (stats, hideflags, attributes...)
    output += `,HideFlags:127,Unbreakable:1b`;
    if (statnbt != "{}") {
        output += `,Stats:${statnbt},BaseStats:${statnbt}`;
    }
    output += `${input.canBeUpgraded === true ? ",Level:0,Upgradable:1b" : ""}${input.customModelData > 0 ? `,CustomModelData:${input.customModelData}` : ""},AttributeModifiers:[{AttributeName:"minecraft:generic.luck",Amount:-0.000999999999,Operation:0,UUID:${types[input.type].attributeUuid.id},Slot:"${types[input.type].attributeUuid.slot}"}]}`;

    return output;
}

function loadInputs() {
    let currentValue;

    currentValue = document.getElementById("input_itemId").value;
    input.itemId = currentValue != "" ? currentValue : "diamond_sword";

    currentValue = document.getElementById("input_name").value;
    input.name = currentValue != "" ? currentValue : "Unnamed";

    currentValue = document.getElementById("input_description").value;
    input.description = currentValue != "" ? currentValue : "";

    currentValue = document.getElementById("input_rarity").value;
    input.rarity = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_type").value;
    input.type = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    currentValue = document.getElementById("input_canBeUpgraded").checked;
    input.canBeUpgraded = typeof currentValue != 'undefined' ? currentValue : false;

    currentValue = document.getElementById("input_skullOwner").value;
    input.skullOwner = currentValue != "" ? currentValue : "";

    currentValue = document.getElementById("input_color").value;
    input.color = hexToDecimal(currentValue);

    currentValue = document.getElementById(`input_customModelData`).value;
    input.customModelData = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;

    // STAT INPUTS
    for (i in statData) {
        currentValue = document.getElementById(`input_stat_${statData[i].id}`).value;
        input[`stat_${statData[i].id}`] = !isNaN(parseFloat(currentValue)) ? parseFloat(currentValue) : 0;
    }
}

function generateCommand() {
    loadInputs();

    document.getElementById("output").value = generateOutput();
}

function generatePreview() {
    loadInputs();
    let element = document.getElementById("outputPreview");

    let name = JSON.parse(getStringBetweenTwoStrings(generateOutput(), "Name:", ",Lore").replaceAll("'{", "{").replaceAll("}'", "}").replaceAll("'[", "[").replaceAll("]'", "]").replaceAll("\\" + "\\\"", "\\" + "\"").replaceAll("\\\'", "'"));

    let loreList = getStringBetweenTwoStrings(generateOutput(), "Lore:", "},Name").replaceAll("'{", "{").replaceAll("}'", "}").replaceAll("'[", "[").replaceAll("]'", "]").replaceAll("\\" + "\\" + "\\" + "\\" + "\\\"", "\"").replaceAll("\\" + "\\" + "\\\'", "'");

    if (loreList.length < 1) {
        loreList = getStringBetweenTwoStrings(generateOutput(), "Lore:", "},Description").replaceAll("'{", "{").replaceAll("}'", "}").replaceAll("'[", "[").replaceAll("]'", "]").replaceAll("\\" + "\\" + "\\" + "\\" + "\\\"", "\"").replaceAll("\\" + "\\" + "\\\'", "'");
    }

    console.log(loreList);

    loreList = JSON.parse(loreList);
    loreList.unshift(name);

    let html = "";
    for (i in loreList) {
        html += generateColorTextFromJson(loreList[i]);
        if (i != loreList.length - 1) {
            html += "<br>"
        }
    }

    element.innerHTML = `<p>${html}</p>`;
}

function generateColorTextFromJson(json) {
    if (!Array.isArray(json)) {
        json = [json];
    }

    let htmlLine = "";
    let inheritedProperties = {
        italic: json[0].italic,
        bold: json[0].bold,
        underlined: json[0].underlined,
        strikethrough: json[0].strikethrough,
        obfuscated: json[0].obfuscated
    }
    let inheritance = Object.keys(inheritedProperties)

    for (i in json) {
        for (j in inheritance) {
            if (typeof json[i][inheritance[j]] === 'undefined') {
                json[i][inheritance[j]] = inheritedProperties[inheritance[j]]
            }
        }

        let html = `<span style="`;

        if (typeof json[i].color != 'undefined') {
            html += `color: #${getColor(json[i].color)};`
        } else {
            html += `color: #FFFFFF;`
        }

        // Italic by default
        if (typeof json[i].italic === 'undefined') {
            html += `font-style: italic;`
        } else {
            if (json[i].italic == true) {
                html += `font-style: italic;`
            }
        }

        if (typeof json[i].bold != 'undefined') {
            if (json[i].bold == true) {
                html += `font-weight: bold;`
            }
        }

        if (typeof json[i].underlined != 'undefined' || typeof json[i].strikethrough != 'undefined') {
            html += `text-decoration:${typeof json[i].underlined != 'undefined' ? (json[i].underlined == true ? " underline" : "") : ""}${typeof json[i].strikethrough != 'undefined' ? (json[i].strikethrough == true ? " line-through" : "") : ""};`
        }

        if (typeof json[i].obfuscated != 'undefined') {
            if (json[i].obfuscated == true) {
                json[i].text = json[i].text.replace(/\S/g, "#");
            }
        }

        html += `">${json[i].text}</span>`;

        htmlLine += html;
    }

    return htmlLine;
}

function getSign(number) {
    if (number >= 0) {
        return "+" + number;
    }
    return number;
}

function getColor(color) {
    if (typeof colorCodes[color] != 'undefined') {
        color = colorCodes[color];
    }

    return color;
}

function darkenColor(color, amount) {
    if (typeof colorCodes[color] != 'undefined') {
        color = colorCodes[color];
    }

    var number = parseInt(color, 16);
    var r = (number >> 16) + amount;
    var b = ((number >> 8) & 0x00FF) + amount;
    var g = (number & 0x0000FF) + amount;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
}

function getStringBetweenTwoStrings(text, prefix, suffix) {
    let string = text;
    let i = string.indexOf(prefix);
    if (i >= 0) {
        string = string.substring(i + prefix.length);
    }
    else {
        return '';
    }
    if (suffix) {
        i = string.indexOf(suffix);
        if (i >= 0) {
            string = string.substring(0, i);
        }
        else {
            return '';
        }
    }
    return string;
};

function hexToDecimal(hex) {
    hex = hex.replace("#", "");
    return parseInt(hex, 16);
}

function resetColor() {
    document.getElementById("input_color").value = "#a06540";
}


document.getElementById("inputs").addEventListener("change", generatePreview)
generatePreview();
