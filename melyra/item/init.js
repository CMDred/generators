let settings = [
    {"name":"Item ID","type":"autocomplete","autocomplete":itemIDS,"placeholder":"stone or minecraft:stone"},
    {"name":"Name","type":"text","placeholder":"Unidentified sword"},
    {"name":"Internal ID","type":"text","placeholder":"master_sword"},
    {"name":"Version Number","type":"number","placeholder":"1"},
    {"name":"RandomName","type":"text","hidden":"hasSecondStat","placeholder":"Master Sword"},
    {"type":"html","value":"<br><p>Enter the description of the item. Use \\n to begin a new line.</p>"},
    {"name":"Description","type":"text","placeholder":"Sword that Seals the Darkness"},
    {"name":"Rarity","type":"select","options":rarities.map(rarity => rarity.name.toLowerCase())},
    {"name":"Type","type":"select","options":Object.values(Types).map(type => type.toLowerCase()),"placeholder":"Melee"},
    {"name":`Can be upgraded? (has "This item can be upgraded" text) `,"type":"checkbox"},
    ...upgradecost(),
    {"type":"html","value":"<br><p>Base Stats (leave at 0 if you don't want it applied to the item)</p>"},
    ...statSettings(),
    ...Abilities(),
    {"type":"html","value":"<br><p>Additional Values (leave at default to ignore)</p>"},
    {"name":"SkullOwner (Enter Value or Username):","type":"text","placeholder":"GamingRedPandas", "hidden":"skull"},
    {"name":"display.color (leather armor only):","type":"color", "hidden":"leather"},
    {"name":"CustomModelData","type":"number"},
    {"name":"Other NBT","type":"text"},
    {"name":"RandomCustomModelData","type":"number","hidden":"hasSecondStat"}
];

function statSettings() {
    let settings = [];
    for (const stat of statData) {
        settings.push({"name":stat.id, "type":"stat"})
    }
    return settings;
}

function upgradecost() {
    let settings = [];
    settings.push({"type":"html","value":"<br><h2>Upgrade Cost</h2>"});
    for (let i = 0; i < 9; i++) {
        settings.push({"name":`upgradecost: ${i}`, "type":"upgradecost"})
    }
    for(let setting of settings){
        setting.hidden = "Upgradeable"
    }
    return settings;
} 

function Abilities(){
    let settings = [];
    settings.push({"type":"html","value":"<br><h2>Abilities</h2>"});
    settings.push({"name": "Abilities", "type":"Abilities"});
    return settings;
}

function hasStatRange(){
    return document.getElementsByClassName("hidestat2").length != statData.length
}

document.title = "Melyra Item Generator";

var options = document.getElementById("options");


function generateSetting(option){
    if(option.type == "html"){
        let setting = document.createElement("div");
        if(option.hidden){
            setting.classList.add('hide')
        }
        setting.innerHTML = option.value;
        return setting;
    }
    if(option.type == "Abilities"){
        let setting = document.createElement("div");
        newAbility(setting);
        return setting;
    }

    let setting = document.createElement("p");
    if(option.hidden){
        setting.classList.add('hide')
    }

    let label = document.createElement("label");
    label.innerText = option.name;
    label.for = option.name;
    setting.append(label);
    setting.append("\u00A0");
    let input = undefined;
    switch (option.type) {
        case "text":
        case "number":
            input = document.createElement("input");
            input.type = option.type;
            input.onchange = (() => output());
            setting.append(input);
            break;
        case "autocomplete":
            setting.classList.add("autocomplete");
            input = document.createElement("input");
            input.onchange = (() => output());
            input.type = "text";
            new Autocomplete(input,option.autocomplete);
            setting.append(input);
            break;
        case "select":
            input = document.createElement("select");
            input.onchange = (() => output());
            setting.append(input);
            for(option of option.options){
                input.append(Object.assign(document.createElement("option"), {value:option, innerText:option}));
            }
            break;
        case "checkbox":
            let sliderContainer = NewElement("label", "switch");
            let a = Object.assign(NewElement("input"),{type:"checkbox", onchange: (function () {output()})})
            sliderContainer.append(a, NewElement("span","slider"))

            setting.append(sliderContainer);
            break;
        case "stat":
            let container = document.createElement("div");
            let toggle = document.createElement("button");
            toggle.innerText = 'toggle range';
            toggle.onclick = (e) => toggleStat(e)
            let input1 = document.createElement("input");
            input1.type = "number";
            input1.onchange = (() => output());
            let input2 = document.createElement("input");
            input2.type = "number";
            input2.onchange = (() => output());
            input2.classList.add("hidestat2");
            container.append(input1,input2,toggle)

            setting.append(container);
            break;
        case "upgradecost":{
                let container = document.createElement("div");
                newLine(container);
                setting.append(container);
            }
            break;
        case "color":
                input = document.createElement("input");
                input.type = option.type;
                input.value = "#a06540";
                input.onchange = (() => output());
                setting.append(input);
                break;
        default:

            break;
    }
    if(option.placeholder){
        input.placeholder = option.placeholder;
    }
    return setting;
}

function toggleStat(e) {
    e.target.parentElement.children[1].classList.toggle("hidestat2")
    for(let setting in settings){
        if(settings[setting].hidden == "hasSecondStat"){
            let element = options.children[setting];
            if(hasStatRange()){
                element.classList.remove('hide')
            }else{
                element.classList.add('hide')
            }
        }
    }
}

function newLine(container){
    let line = document.createElement("div");
    let Material = document.createElement("input");
    Material.placeholder = "InternalID";
    Material.type = "text";
    Material.onchange = (() => output());
    let CountSpan = document.createElement("span");
    CountSpan.innerText = "     Count:";
    let Count = document.createElement("input");
    Count.placeholder = "1";
    Count.type = "number";
    Count.onchange = (() => output());
    let addMaterial = document.createElement("button");
    addMaterial.innerText = '+';
    addMaterial.onclick = ((e) => addcost(e));
    line.append(Material,CountSpan,Count,addMaterial)
    container.append(line);
}

function newAbility(container){
    console.log(container.children.length+1);
    let line = document.createElement("div");
    line.append(generateSetting({"type":"html","value":`<br><h3>Ability:</h3>`})); //  ${container.children.length+1}
    line.append(generateSetting({"name":`Display Ability Name:`, "type":"text"}));
    line.append(generateSetting({"name":`Ability Name:`, "type":"text"}));
    line.append(generateSetting({"name":`Activation:`, "type":"select","options":Activations.map(Activation => Activation.name.toLowerCase())}));
    line.append(generateSetting({"name":`Description:`, "type":"text"}));
    line.append(generateSetting({"name":`Mana Cost:`, "type":"number"}));
    let addButton = document.createElement("button");
    addButton.innerText = '+';
    addButton.onclick = ((e) => addAbility(e));
    line.append(addButton);
    container.append(line);
}

function addAbility(e) {
    let container = e.target.parentElement.parentElement;
    newAbility(container);
    for(child of container.children){
        if(child.children[7]){
            child.children[7].remove()
        }
        let removeButton = document.createElement("button");
        removeButton.innerText = '-';
        removeButton.onclick = ((e) => removeAbility(e));
        child.append(removeButton);
    }
}

function removeAbility(e){
    let container = e.target.parentElement.parentElement;
    e.target.parentElement.remove();
    if(container.children.length == 1){
        if(container.children[0].children[7]){
            container.children[0].children[7].remove()
        }
    }
}


function addcost(e) {
    let container = e.target.parentElement.parentElement;
    newLine(container);
    for(child of container.children){
        if(child.children[3]){
            child.children[3].remove()
        }
        let removeMaterial = document.createElement("button");
        removeMaterial.innerText = '-';
        removeMaterial.onclick = ((e) => removecost(e));
        child.append(removeMaterial);
    }
}

function removecost(e){
    let container = e.target.parentElement.parentElement;
    e.target.parentElement.remove();
    if(container.children.length == 1){
        if(container.children[0].children[3]){
            container.children[0].children[3].remove()
        }
    }
}


class Autocomplete {
    input;
    focus;
    container;
    constructor(input, array) {
        this.input = input;
        this.array = array;
        this.container = newElement("DIV");
        this.container.classList.add("autocomplete-list");
        this.setUpdate();
    }

    clickAuto(element) {
        this.input.value = element.toLowerCase();
        closeAllLists();
        output();
    }

    setUpdate() {
        this.input.addEventListener("input", (e) => {
            closeAllLists();
            let input = e.target;
            const v = input.value.toUpperCase()
            if (v == "") return;
            this.focus = -1;
            input.parentNode.appendChild(this.container);
            this.container.appendChild(document.createElement("DIV"));
            this.array.filter((optie) => optie.startsWith(v)).forEach(element => {
                let box = document.createElement("DIV");
                box.innerHTML = "<strong>" + v + "</strong>";
                box.innerHTML += element.substr(v.length);
                box.innerHTML += "<input type='hidden' value='" + element + "'>";
                box.addEventListener("click", () => this.clickAuto(element));
                this.container.appendChild(box);
            });
        })

        this.input.addEventListener("focusout", (e) => {if (this.container.children.length) return this.container.children[0].click();output();});

        this.input.addEventListener("keydown", (e) => {
            if (!this.container.children.length || ![13,38,40].includes(e.keyCode)) return; // if there are options and a navigation key is presed
            if (e.keyCode == 13) return this.container.children[this.focus].click(); // enter is pressed and the current element is clicked
            if (this.focus != -1) this.container.children[this.focus].classList.remove("autocomplete-active"); // if something is focused remove class from the old focus
            this.focus = e.keyCode == 40 ? Math.min(this.focus + 1, this.container.children.length - 1) : Math.max(this.focus - 1, 0);// the selection index is changed based on whether the up or down arrow was pressed
            this.container.children[this.focus].classList.add("autocomplete-active");// add the class to the new selected item
        });
    }
}

limit = (n,min,max) => n > max ? max : n < min ? min : n

closeAllLists = () => {
    for (let element of document.getElementsByClassName("autocomplete-list")) {
        removeChildren(element);
    }
}

removeChildren = (parrent) => {
    let x
    while (x = parrent.lastElementChild) {
        parrent.removeChild(x)
    }
}

newElement = (name,options) => Object.assign(document.createElement(name),options)


settings.forEach(option => options.appendChild(generateSetting(option)));

toggleSlash = () => localStorage.setItem("slash", hasSlash.checked);

toggleLootTable = () => localStorage.setItem("LootTable", switchLootTable.checked);

hasSlash.checked = localStorage.getItem("slash") == "true";

switchLootTable.checked = localStorage.getItem("LootTable") == "true";

output();