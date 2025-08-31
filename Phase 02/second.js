// JavaScript for Beginners: Operators, Conditionals, and Loops

// 1. Operators in JavaScript

// Arithmetic Operators
let a = 10, b = 5;
console.log("Addition:", a + b);           // 15
console.log("Subtraction:", a - b);        // 5
console.log("Multiplication:", a * b);     // 50
console.log("Division:", a / b);           // 2
console.log("Modulus:", a % b);            // 0
console.log("Exponentiation:", a ** 2);    // 100
a++; // Increment
b--; // Decrement
console.log("Increment a:", a);            // 11
console.log("Decrement b:", b);            // 4

// Assignment Operators
let x = 5;
x += 3; // x = x + 3
console.log("x after += 3:", x);           // 8
x -= 2; // x = x - 2
console.log("x after -= 2:", x);           // 6
x *= 4; // x = x * 4
console.log("x after *= 4:", x);           // 24
x /= 2; // x = x / 2
console.log("x after /= 2:", x);           // 12

// Comparison Operators
let c = 10, d = '10';
console.log("c == d:", c == d);            // true
console.log("c === d:", c === d);          // false
console.log("c != b:", c != b);            // true
console.log("c !== d:", c !== d);          // true
console.log("c > b:", c > b);              // true
console.log("c < b:", c < b);              // false
console.log("c >= 10:", c >= 10);          // true
console.log("c <= 10:", c <= 10);          // true

// Logical Operators
console.log("true && false:", true && false); // false
console.log("true || false:", true || false); // true
console.log("!true:", !true);                 // false

// 2. Conditionals in JavaScript

// if Statement
let age = 18;
if (age >= 18) {
  console.log("You are eligible to vote.");
}

// if-else Statement
let num = 7;
if (num % 2 === 0) {
  console.log("Even number");
} else {
  console.log("Odd number");
}

// if-else if-else Statement
let marks = 75;
if (marks >= 90) {
  console.log("Grade: A");
} else if (marks >= 75) {
  console.log("Grade: B");
} else if (marks >= 60) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}

// Ternary Operator
let result = (age >= 18) ? "Adult" : "Minor";
console.log(result); // Adult

// switch Statement
let day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Another day");
}

// 3. Loops in JavaScript

// for Loop
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// while Loop
let i = 1;
while (i <= 5) {
  console.log("While loop:", i);
  i++;
}

// do...while Loop
i = 1;
do {
  console.log("Do While loop:", i);
  i++;
} while (i <= 5);

// for...of Loop (arrays)
let fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
  console.log(fruit);
}

// for...in Loop (objects)
let person = {
  name: "Alice",
  age: 25,
  city: "New York"
};
for (let key in person) {
  console.log(key + ": " + person[key]);
}

// Practice Exercises

// 1. Check if a number is positive, negative, or zero.
let number = -7;
if (number > 0) {
  console.log("Positive");
} else if (number < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}

// 2. Print all even numbers from 1 to 20.
for (let n = 1; n <= 20; n++) {
  if (n % 2 === 0) {
    console.log("Even:", n);
  }
}

// 3. Calculate the factorial of a number using a for loop.
let factNum = 5;
let factorial = 1;
for (let j = 1; j <= factNum; j++) {
  factorial *= j;
}
console.log("Factorial of", factNum, "is", factorial);

// 4. Print the multiplication table of any number.
let tableNum = 7;
for (let k = 1; k <= 10; k++) {
  console.log(`${tableNum} x ${k} = ${tableNum * k}`);
}

// 5. Use switch to print the day of the week based on a number.
let weekDay = 5;
switch (weekDay) {
  case 1:
    console.log("Sunday");
    break;
  case 2:
    console.log("Monday");
    break;
  case 3:
    console.log("Tuesday");
    break;
  case 4:
    console.log("Wednesday");
    break;
  case 5:
    console.log("Thursday");
    break;
  case 6:
    console.log("Friday");
    break;
  case 7:
    console.log("Saturday");
    break;
  default:
    console.log("Invalid day");
}