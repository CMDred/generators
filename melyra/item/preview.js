function preview(Name, Lore) {
    icon();
    toolTip(Name, Lore);
}

function swapContext(canvas,context){
    var newCvs = canvas.cloneNode(false);
    canvas.parentNode.replaceChild(newCvs, canvas);
    canvas = newCvs;
    return canvas.getContext(...context);
}

function icon() {
    let item = get("Item ID");
    let file = get("SkullOwner (Enter Value or Username):");
    if ((item === "minecraft:player_head" || item === "player_head") && file != "") {
        updateSkin(file);
    } else {
        if(item == "") return
        Object.assign(
            new Image(), {
                onload: function () {
                    let canvas = document.getElementById('Item_Icon');

                    let ctx = swapContext(canvas, ["2d"]);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
                },
                src: "https://minecraftitemids.com/item/64/" + get("Item ID") + ".png",
                onerror: function () {
                    this.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png'
                }
            }
        );
    }
}
let oldSkin;
async function updateSkin(skin) {
    try {
        //document.getElementById('player_head').style = ""
        if (skin.includes("SkullOwner")) {
            skin = skin.substring(skin.indexOf("[{Value:\"") + 9, skin.indexOf("\"}]}}"));
        }else{
            await fetch(`https://api.allorigins.win/raw?url=https://api.mojang.com/users/profiles/minecraft/` + skin).then(
                response => {
                    if(response.ok) return response.json();
                    throw new Error('Network response was not ok.')
                }
            ).then(
                async data => {
                    let uuid = data.id;
                    await fetch(`https://api.allorigins.win/raw?url=https://sessionserver.mojang.com/session/minecraft/profile/` + uuid).then(
                        response => {
                            if(response.ok) return response.json();
                            throw new Error('Network response was not ok.')
                        }
                    ).then(
                        async data => {
                            skin = data.properties[0].value
                        }
                    )
                }
            );
        }
        skin = atob(skin);
        skin = JSON.parse(skin).textures.SKIN.url
        if (skin != oldSkin) {
            oldSkin = skin;
            await fetch(`https://api.allorigins.win/raw?url=` + skin).then(response => {
                return response.blob();
            }).then(blob => {
                Object.assign(
                    new Image(), {
                        onload: (function () {updateSkull(this.height, this)}),
                        src: URL.createObjectURL(blob),
                    }
                );
            });
        }
    } catch {
        console.log("catch");
        //document.getElementById('player_head').style = "display: none;"
    }
}

function updateSkull(height, img) {
    var canvas = document.getElementById('Item_Icon')
    var gl = swapContext(canvas, ["webgl2", {
        alpha: true,
        preserveDrawingBuffer: true
    }])
    if (!gl) {
        console.log('WebGL2 not supported, falling back on WebGL');
        gl = swapContext(canvas, ["webgl", {
            alpha: true,
            preserveDrawingBuffer: true
        }])
    }
    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = swapContext(canvas, ['experimental-webgl']);
    }
    if (!gl) {
        alert('Your browser does not support WebGL');
    }
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    var i;
    for (i = 0; i < 2; i++) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader, vertexShaderText);
        gl.shaderSource(fragmentShader, fragmentShaderText);
        gl.compileShader(vertexShader)
        gl.compileShader(fragmentShader)
        var program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        if (height == 64) {
            var headVertices = [
                0.0, 0.0, 0.125, 0.125,
                0.0, -1.0, 0.125, 0.25,
                -0.866, -0.5, 0, 0.25,
                -0.866, 0.5, 0, 0.125,
                -0.866, 0.5, 0.125, 0,
                0.0, 1.0, 0.25, 0,
                0.866, 0.5, 0.25, 0.125,
                0.866, -0.5, 0.25, 0.25
            ];
        } else {
            var headVertices = [
                0.0, 0.0, 0.125, 2 * 0.125,
                0.0, -1.0, 0.125, 2 * 0.25,
                -0.866, -0.5, 0, 2 * 0.25,
                -0.866, 0.5, 0, 2 * 0.125,
                -0.866, 0.5, 0.125, 0,
                0.0, 1.0, 0.25, 0,
                0.866, 0.5, 0.25, 2 * 0.125,
                0.866, -0.5, 0.25, 2 * 0.25
            ];
        }
        var headIndices = [
            0, 1, 2,
            0, 2, 3,
            0, 4, 5,
            0, 5, 6,
            0, 6, 7,
            0, 7, 1
        ];
        var headVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, headVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(headVertices), gl.STATIC_DRAW);
        var headIndexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, headIndexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(headIndices), gl.STATIC_DRAW);
        var positionAttribLocation = gl.getAttribLocation(program, 'position');
        var texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');
        var Scale = gl.getUniformLocation(program, "scale");
        var offset = gl.getUniformLocation(program, "offset");
        gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(texCoordAttribLocation, 2, gl.FLOAT, gl.FALSE, 4 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(texCoordAttribLocation);
        var headTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, headTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
            gl.UNSIGNED_BYTE,
            img
        );
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.useProgram(program)
        if (i <= 0) {
            gl.uniform1f(Scale, 0.95);
            gl.uniform2f(offset, 0.0, 0.0);
        } else {
            gl.uniform1f(Scale, 1.0);
            gl.uniform2f(offset, 0.5, 0.0);
        }
        gl.bindTexture(gl.TEXTURE_2D, headTexture);
        gl.activeTexture(gl.TEXTURE0);
        gl.drawElements(gl.TRIANGLES, headIndices.length, gl.UNSIGNED_SHORT, 0);
    }
}
var vertexShaderText = [
    'attribute vec2 position;',
    'attribute vec2 vertTexCoord;',
    'uniform float scale;',
    'uniform vec2 offset;',
    'varying vec2 fragTexCoord;',
    'void main() {',
    'fragTexCoord = vertTexCoord + offset;',
    'gl_Position = vec4(position * scale, 0.0, 1.0);',
    '}'
].join('\n');

var fragmentShaderText = [
    'precision mediump float;',
    'varying vec2 fragTexCoord;',
    'uniform sampler2D sampler;',
    'void main() {',
    'gl_FragColor = texture2D(sampler, fragTexCoord);',
    '}'
].join('\n');

function toolTip(Name, Lore) {
    let ToolTip = document.getElementById('ToolTip');
    ToolTip.innerHTML = '';
    Name = getNBT([Name.get])
    Name.substr(1,Name.length -2)
    ToolTip.append(SegmentToElement(JSON.parse(Name)),document.createElement('br'))
    for(line of Lore){
        line = getNBT([line])
        line = line.substr(1,line.length -2) // remove quotes
        console.log(line);
        line = JSON.parse(line)
        ToolTip.append(...LineToSegments(line),document.createElement('br'));
    }
}

function LineToSegments(line){
    elemtents = []
    if(line.length){
        elemtents = []
        for(segment of line){
            if(segment.length){
                elemtents.push(LineToSegments(segment))
            }else{
                elemtents.push(SegmentToElement(segment))
            }
        }
    }else{
        elemtents.push(SegmentToElement(line));
    }
    return elemtents
}



function SegmentToElement(segment){
    if(segment.text  != undefined){
        let element = document.createElement('span');
        element.textContent = segment.text;
        if(segment.italic == true) {element.classList.add('italic')};
        if(segment.bold == true) {element.classList.add('bold')};
        if(segment.obfuscated == true) {element.classList.add('obfuscated')};
        if(segment.color != undefined && segment.color != "") {
            if(segment.color.startsWith(`#`)){
                element.style.color = segment.color;
            }else{
                element.style.color = `#`+colorCodes[segment.color];
            }
        };
        return element
    }else if (typeof(segment) == "string"){
        return document.createTextNode(segment);
    }else{
        console.log(`unknown segment`,segment);
        alert(`unknown segment ${segment}`)
    }
}

const obfuscationTable = new Array(181).fill(null).map(() => []);
const measurement = document.createElement('span')
measurement.classList.add('hidden');
document.body.appendChild(measurement);
for (let i=0; i<Math.pow(2,10)-1; i++){
    measurement.innerText = String.fromCharCode(i);
    const rect = measurement.getBoundingClientRect()
    if(measurement.innerText.length && rect.height == 23){
        width = parseInt(rect.width * 4)
        if(width != rect.width * 4) continue
        try{
            obfuscationTable[width].push(i);
        }catch{
            break;
        }
    }
}
obfuscate();
function obfuscate() {
    elements = document.getElementsByClassName('obfuscated');
    for(element of elements){
        let chars = ""
        for(character of element.innerText){
            measurement.innerText = character
            const posibilities = obfuscationTable[width = parseInt(measurement.getBoundingClientRect().width * 4)]
            chars += String.fromCharCode(posibilities[Math.floor(Math.random() * posibilities.length+1)]);
        }
        element.innerText = chars
    }
    setTimeout(obfuscate, 1000/20);//1 tick
}