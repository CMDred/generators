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
};

const statData = [
    { id: "health", group: 1, symbol: "❤", numberOfSpaces: 1, symbolColor: "red", name: "Health", nbt: "MaxHealth", isPercentage: false },
    { id: "defense", group: 1, symbol: "❂", numberOfSpaces: 1, symbolColor: "green", name: "Defense", nbt: "Defense", isPercentage: false },
    { id: "magicDefense", group: 1, symbol: "۞", numberOfSpaces: 1, symbolColor: "blue", name: "Magic Defense", nbt: "MagicDefense", isPercentage: false },
    { id: "healthRegeneration", group: 1, symbol: "❣", numberOfSpaces: 1, symbolColor: "red", name: "Health Regeneration", nbt: "HealthRegeneration", isPercentage: true },
    { id: "manaRegeneration", group: 1, symbol: "๑", numberOfSpaces: 1, symbolColor: "aqua", name: "Mana Regeneration", nbt: "ManaRegeneration", isPercentage: true },

    { id: "damage", group: 2, symbol: "🗡", numberOfSpaces: 1, symbolColor: "red", name: "Damage", nbt: "Damage", isPercentage: false },
    { id: "strength", group: 2, symbol: "❁", numberOfSpaces: 1, symbolColor: "red", name: "Strength", nbt: "Strength", isPercentage: false },
    { id: "critical", group: 2, symbol: "☣", numberOfSpaces: 1, symbolColor: "red", name: "Critical", nbt: "Critical", isPercentage: true },
    { id: "drawSpeed", group: 2, symbol: "➹", numberOfSpaces: 1, symbolColor: "green", name: "Draw Speed", nbt: "DrawSpeed", isPercentage: true },
    { id: "overdraw", group: 2, symbol: "🏹", numberOfSpaces: 1, symbolColor: "blue", name: "Overdraw", nbt: "Overdraw", isPercentage: true },
    { id: "attackSpeed", group: 2, symbol: "✲", numberOfSpaces: 1, symbolColor: "yellow", name: "Attack Speed", nbt: "AttackSpeed", isPercentage: true },
    { id: "mana", group: 2, symbol: "₪", numberOfSpaces: 1, symbolColor: "aqua", name: "Mana", nbt: "Mana", isPercentage: false },
    { id: "magicDamage", group: 2, symbol: "✯", numberOfSpaces: 1, symbolColor: "aqua", name: "Magic Damage", nbt: "MagicDamage", isPercentage: false },

    { id: "speed", group: 3, symbol: "✦", numberOfSpaces: 1, symbolColor: "white", name: "Speed", nbt: "Speed", isPercentage: true },
    { id: "arcane", group: 3, symbol: "¤", numberOfSpaces: 1, symbolColor: "light_purple", name: "Arcane", nbt: "Arcane", isPercentage: false },
    { id: "miningSpeed", group: 3, symbol: "⛏", numberOfSpaces: 1, symbolColor: "gold", name: "Mining Speed", nbt: "MiningSpeed", isPercentage: false },
    { id: "woodcuttingSpeed", group: 3, symbol: "🪓", numberOfSpaces: 1, symbolColor: "gold", name: "Woodcutting Speed", nbt: "WoodcuttingSpeed", isPercentage: false },
    { id: "fishingSpeed", group: 3, symbol: "🎣", numberOfSpaces: 1, symbolColor: "gold", name: "Fishing Speed", nbt: "FishingSpeed", isPercentage: false },
];

const attributeUuids = {
    MAINHAND: { id: "[I;12,42069,0,10]", slot: "mainhand" },
    OFFHAND: { id: "[I;12,42069,0,11]", slot: "offhand" },
    HEAD: { id: "[I;12,42069,0,12]", slot: "head" },
    CHEST: { id: "[I;12,42069,0,13]", slot: "chest" },
    LEGS: { id: "[I;12,42069,0,14]", slot: "legs" },
    FEET: { id: "[I;12,42069,0,15]", slot: "feet" }
};

const Types = {
    0  : "",
    1  : "Helmet",
    2  : "Chestplate",
    3  : "Leggings",
    4  : "Boots",
    10  : "Melee",
    20  : "Ranged",
    30  : "Mining",
    40  : "Foraging",
    50  : "Materials",
    //100  : "Fishing",
};

const Activations = [
    {"name":"Full Set", "display":"Full Set", "id":1},
    {"name":"Passive" ,"display":"Passive", "id":2},
    {"name":"Right-click" ,"display":"Right-click", "id":3},
    {"name":"Right-click Shift" ,"display":"Shift-click", "id":4},
    {"name":"Right-click Hold" ,"display":"Right-click", "id":5},
    {"name":"Sneak" ,"display":"Sneak", "id":6},
    {"name":"Sneak Double" ,"display":"Double Sneak", "id":7},
    {"name":"Kill" ,"display":"Kill", "id":8},
    {"name":"Shoot" ,"display":"Shoot", "id":9},
    {"name":"Throw" ,"display":"Throw", "id":9},
    {"name":"Hit" ,"display":"Hit", "id":10},
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
];