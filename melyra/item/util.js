function NewElement(type, ...classes) {
    let element = document.createElement(type);
    if (classes[0]) {
      element.classList.add(...classes);
    }
    return element;
}