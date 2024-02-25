function NewElement(type, ...classes) {
    let element = document.createElement(type);
    if (classes[0]) {
      element.classList.add(...classes);
    }
    return element;
}

function copyOutput() {
    document.getElementById("output").select();
    document.getElementById("output").setSelectionRange(0, 99999)
    document.execCommand("copy");
  }