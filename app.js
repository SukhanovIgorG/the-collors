const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (evt) => {
  evt.preventDefault();
  if (evt.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  // console.log(event.target.dataset)
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickBoardText(event.target.textContent);
  }
});

function generateRandomColors() {
  const hex = "0123456789ABCDEF";
  let randomColor = "";
  for (let i = 0; i < 6; i++) {
    randomColor += hex[Math.floor(Math.random() * hex.length)];
  }
  return "#" + randomColor;
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : generateRandomColors()
      : generateRandomColors();
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
    if (!isInitial) {
      colors.push(color);
    }
  });

  updateColorsHash(colors);
}
function copyToClickBoardText(text) {
  return navigator.clipboard.writeText(text);
}
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((col) => "#" + col);
  }
  return [];
}

setRandomColors(true);
