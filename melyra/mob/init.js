let settings = [
    {"name":"Name","type":"text"},
    {"name":"Name Color","type":"autocomplete","autocomplete":colors},
    {"name":"HP","type":"number"},
    {"name":"Damage","type":"number"},
    {"name":"Defense","type":"number"},
    {"name":"Magic Defense","type":"number"},
    {"name":"Magic Damage","type":"number"},
    {"name":"Speed","type":"number"},
    {"name":`RandomAttack`, "type":"RandomAttack"},
    {"name":"WhenDamaged","type":"text","placeholder":"1,5,13"},
    {"name":"WhenKilled","type":"number"},
    {"name":"WhenPoofed","type":"number"},
    {"name":"WhenTargeting","type":"number"},
    {"name":"Death Loot table","type":"text"},
    {"name":"Mob Type","type":"autocomplete","autocomplete":summonableMobs},
    {"name":"Custom Agressive Mob","type":"checkbox"},
    {"name":"Tags","type":"text"},
    {"name":"Mob Level","type":"number"},
    {"name":"Knockback Resistance","type":"number"}
];

document.title = "Melyra Mob Generator";

var options = document.getElementById("options");


function generateSetting(option){
    let setting = document.createElement("p");

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
            input.id = option.name;
            input.onchange = (() => output());
            setting.append(input);
            break;
        case "autocomplete":
            setting.classList.add("autocomplete");
            input = document.createElement("input");
            input.type = "text";
            input.onchange = (() => output());
            new Autocomplete(input,option.autocomplete);
            setting.append(input);
            break;
        case "checkbox":
            input = document.createElement("input");
            input.type = "checkbox";
            input.onchange = (() => output());
            setting.append(input);
            break;
        case "RandomAttack":
            {
                let container = document.createElement("div");
                newRandomAttackLine(container);
                setting.append(container);
            }
            break;
        default:
            console.log("error", option);
            break;
    }
    if(option.placeholder){
        input.placeholder = option.placeholder;
    }
    return setting;
}

function newRandomAttackLine(container){
    let line = document.createElement("div");
    let ID = document.createElement("input");
    ID.placeholder = "ID";
    ID.type = "text";
    ID.onchange = (() => output());
    let Timer = document.createElement("input");
    Timer.placeholder = "Timer";
    Timer.type = "Amount";
    Timer.onchange = (() => output());
    let addRandomAttackButton = document.createElement("button");
    addRandomAttackButton.innerText = '+';
    addRandomAttackButton.onclick = ((e) => addRandomAttack(e));
    line.append(ID,Timer,addRandomAttackButton)
    container.append(line);
}

function addRandomAttack(e) {
    let container = e.target.parentElement.parentElement;
    const maxRandomAttacks = 3;
    if(container.children.length == maxRandomAttacks){
        return;
    }
    newRandomAttackLine(container);
    for(child of container.children){
        if(child.children[3]){
            child.children[3].remove()
        }
        let removeRandomAttackButton = document.createElement("button");
        removeRandomAttackButton.innerText = '-';
        removeRandomAttackButton.onclick = ((e) => removeRandomAttack(e));
        child.append(removeRandomAttackButton);
    }
}

function removeRandomAttack(e){
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

    setUpdate() {
        this.input.addEventListener("input", (e) => {
            closeAllLists();
            let input = e.originalTarget;
            if (input.value == "") return;
            this.focus = -1;
            input.parentNode.appendChild(this.container);
            this.array.filter((optie) => optie.startsWith(input.value)).forEach(element => {
                let box = document.createElement("DIV");
                box.innerHTML = "<strong>" + input.value + "</strong>";
                box.innerHTML += element.substr(input.value.length);
                box.innerHTML += "<input type='hidden' value='" + element + "'>";
                box.addEventListener("click", function (e) {
                    input.value = this.getElementsByTagName("input")[0].value;
                    output();
                    closeAllLists();
                });
                this.container.appendChild(box);
            });
        })

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
output();