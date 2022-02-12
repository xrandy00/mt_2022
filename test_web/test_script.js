var startTime = performance.now()

console.log('Hello world 1');
console.log('Hello world 2');

var endTime = performance.now()
console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
