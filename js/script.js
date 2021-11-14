function say(what) {
  let elem = document.getElemendByID('lyrics');

  let newElem = document.createElement('p');

  newElem.innerHTML = what;

  elem.appendChild(newElem);
}
