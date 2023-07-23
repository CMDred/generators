const rarities = [
    { name: "Common", color: "white" },
    { name: "Uncommon", color: "green" },
    { name: "Rare", color: "blue" },
    { name: "Epic", color: "light_purple" },
    { name: "Legendary", color: "aqua" }
];

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

const statData = [
    { id: "health", group: 1, symbol: "❤", numberOfSpaces: 1, symbolColor: "red", numberColor: "green", name: "Health", nbt: "MaxHealth", isPercentage: false },
    { id: "defense", group: 1, symbol: "❂", numberOfSpaces: 1, symbolColor: "green", numberColor: "green", name: "Defense", nbt: "Defense", isPercentage: false },
    { id: "magicDefense", group: 1, symbol: "۞", numberOfSpaces: 1, symbolColor: "blue", numberColor: "green", name: "Magic Defense", nbt: "MagicDefense", isPercentage: false },
    { id: "healthRegeneration", group: 1, symbol: "❣", numberOfSpaces: 1, symbolColor: "red", numberColor: "green", name: "Health Regeneration", nbt: "HealthRegeneration", isPercentage: true },
    { id: "manaRegeneration", group: 1, symbol: "๑", numberOfSpaces: 1, symbolColor: "aqua", numberColor: "green", name: "Mana Regeneration", nbt: "ManaRegeneration", isPercentage: true },

    { id: "damage", group: 2, symbol: "🗡", numberOfSpaces: 1, symbolColor: "red", numberColor: "red", name: "Damage", nbt: "Damage", isPercentage: false },
    { id: "strength", group: 2, symbol: "❁", numberOfSpaces: 1, symbolColor: "red", numberColor: "red", name: "Strength", nbt: "Strength", isPercentage: false },
    { id: "critical", group: 2, symbol: "☣", numberOfSpaces: 1, symbolColor: "red", numberColor: "red", name: "Critical", nbt: "Critical", isPercentage: true },
    { id: "drawSpeed", group: 2, symbol: "➹", numberOfSpaces: 1, symbolColor: "green", numberColor: "red", name: "Draw Speed", nbt: "DrawSpeed", isPercentage: true },
    { id: "overdraw", group: 2, symbol: "🏹", numberOfSpaces: 1, symbolColor: "blue", numberColor: "red", name: "Overdraw", nbt: "Overdraw", isPercentage: true },
    { id: "attackSpeed", group: 2, symbol: "✲", numberOfSpaces: 1, symbolColor: "yellow", numberColor: "red", name: "Attack Speed", nbt: "AttackSpeed", isPercentage: true },
    // { id: "lifeSteal", group: 2, symbol: "♡", numberOfSpaces: 1, symbolColor: "white", numberColor: "red", name: "Life Steal", nbt: "LifeSteal", isPercentage: true },
    { id: "mana", group: 2, symbol: "₪", numberOfSpaces: 1, symbolColor: "aqua", numberColor: "red", name: "Mana", nbt: "Mana", isPercentage: false },
    { id: "magicDamage", group: 2, symbol: "✯", numberOfSpaces: 1, symbolColor: "aqua", numberColor: "red", name: "Magic Damage", nbt: "MagicDamage", isPercentage: false },

    { id: "speed", group: 3, symbol: "✦", numberOfSpaces: 1, symbolColor: "white", numberColor: "white", name: "Speed", nbt: "Speed", isPercentage: true },
    { id: "arcane", group: 3, symbol: "¤", numberOfSpaces: 1, symbolColor: "light_purple", numberColor: "white", name: "Arcane", nbt: "Arcane", isPercentage: false },
    { id: "miningSpeed", group: 3, symbol: "⛏", numberOfSpaces: 1, symbolColor: "gold", numberColor: "white", name: "Mining Speed", nbt: "MiningSpeed", isPercentage: false },
    { id: "woodcuttingSpeed", group: 3, symbol: "🪓", numberOfSpaces: 1, symbolColor: "gold", numberColor: "white", name: "Woodcutting Speed", nbt: "WoodcuttingSpeed", isPercentage: false },
    { id: "fishingSpeed", group: 3, symbol: "🎣", numberOfSpaces: 1, symbolColor: "gold", numberColor: "white", name: "Fishing Speed", nbt: "FishingSpeed", isPercentage: false },
]

const attributeUuids = {
    MAINHAND: { id: "[I;12,42069,0,10]", slot: "mainhand" },
    OFFHAND: { id: "[I;12,42069,0,11]", slot: "offhand" },
    HEAD: { id: "[I;12,42069,0,12]", slot: "head" },
    CHEST: { id: "[I;12,42069,0,13]", slot: "chest" },
    LEGS: { id: "[I;12,42069,0,14]", slot: "legs" },
    FEET: { id: "[I;12,42069,0,15]", slot: "feet" }
};

const TypeIDs = [
    { name: "", isTool: false, attributeUuid: attributeUuids.MAINHAND }, // Normal item
    { name: "Helmet", isTool: false, attributeUuid: attributeUuids.HEAD },
    { name: "Chestplate", isTool: false, attributeUuid: attributeUuids.CHEST },
    { name: "Leggings", isTool: false, attributeUuid: attributeUuids.LEGS },
    { name: "Boots", isTool: false, attributeUuid: attributeUuids.FEET },
    { name: "Sword", isTool: false, attributeUuid: attributeUuids.MAINHAND },
    { name: "Bow", isTool: false, attributeUuid: attributeUuids.MAINHAND },
    { name: "Pickaxe", isTool: true, attributeUuid: attributeUuids.MAINHAND },
    { name: "Axe", isTool: true, attributeUuid: attributeUuids.MAINHAND }
];


const JSONColor = {
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_aqua',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    '0': 'black',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white'
};

const colors = [
    'dark_blue',
    'dark_green',
    'dark_aqua',
    'dark_red',
    'dark_purple',
    'gold',
    'gray',
    'dark_gray',
    'blue',
    'black',
    'green',
    'aqua',
    'red',
    'light_purple',
    'yellow',
    'white'
]