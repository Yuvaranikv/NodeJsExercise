console.log('Hello, Node!')
global.myVariable = 123
console.log(myVariable)  // Outputs: 123
console.log(process.version)  // Outputs the version of Node.js running
const buffer = Buffer.from('Hello, World!')
console.log(buffer) 
console.log(buffer.toString())// Outputs: 'Hello, World!'
console.log(__dirname)  // Outputs the path of the current directory
console.log(__filename)  // Outputs the path of the current file
console.log('Debugging information')
exports.myFunction = function() { console.log('Hello, Module!') }
