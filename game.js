let currentRotation = 0;
window.addEventListener('DOMContentLoaded', init);

function init() {
  createSpinnerWheel();
  const spinButton = document.getElementById("spin-button");
  spinButton.addEventListener('click',rotateWheelRandomly);
}

function createSpinnerWheel() {
  const slices = localStorage.getItem('options')
  const wheel = document.getElementById("wheel");
  wheel.innerHTML = ""; 

  const sliceAngle = 360 / slices;

  for (let i = 0; i < slices; i++) {
    const slice = document.createElement("div");
    slice.className = "slice";
    slice.style.transform = `rotate(${sliceAngle * i}deg)`;
    slice.style.clipPath = getSliceClipPath(sliceAngle); 
    slice.style.backgroundColor = getRandomColor(); 
    const text = document.createElement("div");
    text.style.fontSize = slices < 15 ? `40px`: `${600 / slices}px`;
    text.style.marginLeft = slices < 50 ? `10%` : slices < 140 ? '3%' : '1%';
    text.className = "text";
    text.textContent = i + 1;

    slice.appendChild(text);
    

    wheel.appendChild(slice);
  }
}

function getSliceClipPath(sliceAngle) {
  const arcRadius = 250; 
  const startAngle = 0; 
  const endAngle = sliceAngle; 

  const startAngleRad = (startAngle - 90) * (Math.PI / 180);
  const endAngleRad = (endAngle - 90) * (Math.PI / 180);

  const startX = arcRadius + arcRadius * Math.cos(startAngleRad);
  const startY = arcRadius + arcRadius * Math.sin(startAngleRad);

  const endX = arcRadius + arcRadius * Math.cos(endAngleRad);
  const endY = arcRadius + arcRadius * Math.sin(endAngleRad);

  return `path('M ${arcRadius} ${arcRadius} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 0 1 ${endX} ${endY} Z')`;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomRotation() {
  return Math.floor(360 + Math.random() * 360); 
}

function rotateWheelRandomly() {
  const slices = localStorage.getItem('options')
  const wheel = document.getElementById("wheel");
  const clicksNumber = document.getElementById("clicksNumber").value;
  const isRandomSelected = document.getElementById("randomCheckBox").checked;
  if(isRandomSelected){
    currentRotation += getRandomRotation();
  }else if (clicksNumber != ''){
    currentRotation += clicksNumber * (360/slices);
  }else{
    warn("Please select number of clicks or random clicks");
  }
  

  wheel.style.transform = `rotate(${currentRotation}deg)`;
  wheel.style.transition = "transform 2s ease";
}

function warn(message) {
  alert (message);
}