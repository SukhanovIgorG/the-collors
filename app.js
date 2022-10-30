const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', evt => {
  if (evt.code.toLowerCase() === 'space') {
    setRandomColors();
  }
})

function generateRandomColors () {
  const hex = '0123456789ABCDEF'
  let randomColor = ''
  for (let i = 0; i < 6; i++) {
    randomColor += hex[Math.floor(Math.random() * hex.length)] 
  }
  return "#" + randomColor
}

function setRandomColors () {
  cols.forEach(col => {
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    const color = generateRandomColors();
    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  })
}

function setTextColor (text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? "black" : "white";
}

setRandomColors()
