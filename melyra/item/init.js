let settings = [
    {"name":"Item ID","type":"text"},
    {"name":"Name","type":"text"},
    {"name":"RandomName","type":"text","hidden":"hasSecondStat"},
    {"type":"html","value":"<br><p>Enter the description of the item. Use \n to begin a new line.</p>"},
    {"name":"Description","type":"text"},
    {"name":"Rarity","type":"select","options":rarities.map(rarity => rarity.name.toLowerCase())},
    {"name":"Type","type":"autocomplete","options":types.map(type => type.name.toLowerCase())},
    {"name":"TypeID","type":"autocomplete","options":TypeIDs.map(type => type.name.toLowerCase())},
    {"name":`Can be upgraded? (has "This item can be upgraded" text) `,"type":"checkbox"},
    {"type":"html","value":"<br><p>Base Stats (leave at 0 if you don't want it applied to the item)</p>"},
    ...statSettings(),
    {"type":"html","value":"<br><p>Additional Values (leave at default to ignore)</p>"},
    {"name":"SkullOwner (Enter Value or Username):","type":"text"},
    {"name":"display.color (leather armor only):","type":"color"},
    {"name":"CustomModelData","type":"number"},
    {"name":"RandomCustomModelData","type":"number","hidden":"hasSecondStat"}
];

function statSettings() {
    let settings = [];
    for (const stat of statData) {
        settings.push({"name":stat.id, "type":"stat"})
    }
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
            input.type = "text";
            new Autocomplete(input,option.options);
            setting.append(input);
            break;
        case "select":
            input = document.createElement("select");
            setting.append(input);
            for(option of option.options){
                input.append(Object.assign(document.createElement("option"), {value:option, innerText:option}));
            }
            break;
        case "checkbox":
            input = document.createElement("input");
            input.type = "checkbox";
            input.onchange = (() => output());
            setting.append(input);
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
    //RandomCustomModelData
    //RandomName
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
            this.array.filter((optie) => optie.startsWith(input.value.toLowerCase())).forEach(element => {
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
        this.input.addEventListener("focusout", (e) => {if (this.container.children.length) return this.container.children[0].click();output();});

        this.input.addEventListener("keydown", (e) => {
            if (!this.container.children.length || ![13,38,40].includes(e.keyCode)) return; // if there are options and a navigation key is presed
            if (e.keyCode == 13) {
                if(this.focus = -1){
                    return this.container.children[0].click();
                }
                this.container.children[this.focus].click(); // enter is pressed and the current element is clicked
                return output();
            }
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