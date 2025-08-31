// // --- DOM SELECTORS ---

// // 1. getElementById
const heading = document.getElementById("title");
heading.style.color = "blue"; // Change title color

// // 2. getElementsByClassName
const texts = document.getElementsByClassName("text");
texts[0].style.color = "red";   // First para red
texts[1].style.color = "green"; // Second para green

// // 3. querySelector
const firstPara = document.querySelector(".text");
firstPara.style.fontWeight = "1000"; // Make bold

// // 4. querySelectorAll
const allParas = document.querySelectorAll(".text");
allParas.forEach(p => p.style.fontSize = "18px");


// // --- EVENTS ---

// // Button click
const button = document.getElementById("btn");
const msg = document.getElementById("msg");

button.addEventListener("click", () => {
  msg.textContent = "You clicked the button!";
});

// // Mouse events on box
const box = document.getElementById("box");
box.addEventListener("mouseover", () => box.style.background = "blue");
box.addEventListener("mouseout", () => box.style.background = "gray");
box.addEventListener("click", () => alert("Box clicked!"));

// // Keyboard event
const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("keyup", (e) => {
  output.textContent = `You typed: ${e.target.value}`;
});

// // Form submit
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  const name = document.getElementById("name").value;
  result.textContent = `Hello, ${name}!`;
});
