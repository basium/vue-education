// worker.js
self.onmessage = function() {
    let result = intensiveProcess();
    self.postMessage(result);
}

function intensiveProcess() {
    console.time("intensiveBackgroundProcess");
    let sum = 0,
    iterationTimes = [];

    for (let i = 0; i < 10000000; i++) {
      let startIteration = performance.now();
      sum += Math.sqrt(i);   
      let endIteration = performance.now();
      iterationTimes.push(endIteration - startIteration);
    }
    console.timeEnd("intensiveBackgroundProcess");
    //console.log(iterationTimes.join(','));
  return sum;
}
