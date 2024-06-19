function add(n1, n2) {
  return n1 + n2;
}

function sub(n1, n2) {
  return n1 - n2;
}

function mul(n1, n2) {
  return n1 * n2;
}
function div(n1, n2) {
  return n1 / n2;
}

const operation = process.argv[2];
const num1 = parseFloat(process.argv[3]);
const num2 = parseFloat(process.argv[4]);

if (isNaN(num1) || isNaN(num2)) {
  console.log("Error: Please provide valid numeric inputs");
  process.exit(1); // Exit with error
}
if (operation === 'div' && num2 === 0) {
    console.log("Error: Cannot divide a number by 0");
    process.exit(1); // Exit with error
  }

let result;
try {
  switch (operation) {
    case "add":
      result = add(num1, num2);
      break;
    case "sub":
      result = sub(num1, num2);
      break;
    case "mul":
      result = mul(num1, num2);
      break;
    case "div":
      result = div(num1, num2);
      break;
  }
  console.log(`Result of ${operation} ${num1} and ${num2}: ${result}`);
  console.log({operation});
} catch (error) {
  console.log(`Error: ${error.message}`);
  process.exit(1); // Exit with error
}
