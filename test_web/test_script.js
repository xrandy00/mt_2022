var startTime = performance.now()

console.log('Hello world');

var endTime = performance.now()
console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
