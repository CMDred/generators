// TODO
// radio buttons work arcoss editors

class Editor {
    isMultiLine = undefined;
    id = ""
    constructor(isMultiLine, element){
        this.isMultiLine = isMultiLine;
        this.element = element;
        this.addLine();
    }

    Lines = [];
    Line = 0;

    addLine() {
        this.Line = this.Lines.push(new Line) - 1; //adda new line and update current line index

		displaySection(this);
    }
}

function displaySection(editor){
    const c = editor.element;
    c.innerHTML = "";
    let line = editor.Lines[editor.Line];
    let section = line.Sections[line.Section];
    c.appendChild(section.field());
}


class Line {
    constructor(){
        this.addSection();
    }

    Sections = [];
    Section = 0;

    addSection() {
        let section = new Section();
        section.text = "test2";
        this.Section = this.Sections.push(section) - 1; //add a new section and update current section index
    }
}

class TextJson {
    Editors = [];

    newEditor(isMultiLine, id){
        let editor = new Editor(isMultiLine, id);
        this.Editors.push(editor);
        return editor;
    }

    changeLine(Editor, direction){
        Editors[Editor].changeLine(direction);
    }

    changeSection(Editor, direction){
        Editors[Editor].changeSection(direction);
    }

}

class Section {
    text = "";

    font = "";

    color = "unset";
    bold = "unset";
    italic = "unset";
    underlined = "unset";
    strikethrough = "unset";
    obfuscated = "unset";

    translate = "";
    with = [""];
    fallback = "";

    keybind = "";

    #myField;
    #ready = false;

    field(){
        let container = nE("div");
        this.#myField = container;

        let text = nE("input");
        text.value = this.text;
        text.classList.add("text");
        text.onchange = () => this.#save();

        let color = nE("select");
        color.append(...colorOptions());
        color.classList.add("color");
        color.onchange = this.#save();

        let booleans = nE("table");
        let bc = nE("tbody");
        booleans.append(bc);
        let bh = nE("tr");
        bh.append(nE("td"),Object.assign(nE("td"),{innerText:"Unset"}),Object.assign(nE("td"),{innerText:"True"}),Object.assign(nE("td"),{innerText:"False"}));
        bc.append(bh);
        bc.append(this.#radio("Bold"));
        bc.append(this.#radio("Italic"));
        bc.append(this.#radio("Underlined"));
        bc.append(this.#radio("Obfuscated"));

        let font = nE("input");
        font.value = this.font;
        font.classList.add("font");
        font.onchange = this.#save();
        
        container.append(text,color,font,booleans);
        this.#init();
        return container;
    }

    #radio(name) {
        const row = nE("tr");
        let title = Object.assign(nE("td"), {innerText: name, align:"right"});

        let unset = nE("td");
        unset.append(Object.assign(nE("input"),{type:"radio",value:"unset",classList : [name],name:name}));
        let True = nE("td");
        True.append(Object.assign(nE("input"),{type:"radio",value:"True",classList : [name],name:name}));
        let False = nE("td");
        False.append(Object.assign(nE("input"),{type:"radio",value:"False",classList : [name],name:name}));

        row.append(title, unset, True, False);
        return row
    }

    #init() {
        const e = this.#myField;
        e.getElementsByClassName("text").value = this.text;
        e.getElementsByClassName("font").value = this.font;
        setRadio(e.getElementsByClassName("Bold"), this.bold);
        this.#ready = true;
    }

    #save() {
        if(!this.#ready){
            return
        }
        const e = this.#myField;
        this.text = e.getElementsByClassName("text")[0].value;
        this.color = e.getElementsByClassName("font")[0].selectedIndex;

        this.font = e.getElementsByClassName("font")[0].value;
        this.bold = getRadio(e.getElementsByClassName("Bold"));

        console.log(this.text,this.color,this.italic,this.underlined,this.strikethrough,this.obfuscated,this.font);
        // this.color = e.getElementsByClassName("color");
        // this.bold = e.getElementsByClassName("bold");
        // this.italic = e.getElementsByClassName("italic");
        // this.underlined = e.getElementsByClassName("underlined");
        // this.strikethrough = e.getElementsByClassName("strikethrough");
        // this.obfuscated = e.getElementsByClassName("obfuscated");
        // this.translate = e.getElementsByClassName("obfuscated");
        // this.with = e.getElementsByClassName("obfuscated");
        // this.fallback = e.getElementsByClassName("obfuscated");
        // this.keybind = e.getElementsByClassName("obfuscated");
    }
}

function getRadio(HTMLCollection){
    for(element of HTMLCollection){
        if(element.checked){
            return element.value;
        }
    }
}

function setRadio(HTMLCollection, value){
    for(element of HTMLCollection){
        console.log(element.value == value);
        if(element.value == value){
            console.log("set ", value);
            return element.checked = true;
        }
    }
}

let inputParts = {
    
} 

function showHide(...elements){
 for(e of elements){
    document.getElementById(e).classList.toggle("hiding");
 }
}

function colorOptions(){
    Options = []
    for(const [key, value] of Object.entries(colorCodes)){
        option = document.createElement("option");
        option.innerText = key;
        option.value = value;
        Options.push(option);
    }
    return Options
}

nE = (s) => document.createElement(s);