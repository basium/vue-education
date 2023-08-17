<template>

  <div class="ScreenContainer" style="display:flex; flex: 1 1 auto; flex-direction:column">
    <div class="ScreenContainer_ImageContainer" style="position:relative; display:flex; flex:1 1 auto; flex-direction:row; justify-content:center; margin:10px;">
      <img class="trippyImage" :src="imageSrc" style="width:300px; position:absolute; top:380px;" :style="{left:leftOffset+'px'}" />
    </div>
    <div style="display:flex; flex:0 0 auto; justify-content:center; margin-bottom:20px;">
      <div style="display:flex; flex: 0 0 auto; flex-direction:column">
          <h3>Click a button to start an intensive process in:</h3>
          <button @click="startInMainProcess"> The main thread </button>
          <button @click="startIntensiveProcess">Start Background Process</button>

          <h3> Click a button to start a server request: </h3>
          <button @click="setDelayedResult">Synchronously</button>
          <button @click="startDefferedResult">Using a promise</button>

          <h3> Promises themselves are not async! </h3>
          <button @click="startIntensivePromiseProcess">Run intensive work within a promise</button>
          
          <button @click="stopAnimationClick">Stop Animation</button>
      </div>

    </div>
    <div style="display:flex; flex: 1 1 auto; flex-direction:row; justify-content:center;" v-if="loading">
      <div style="display:flex; flex:0 0 auto; flex-direction:column; justify-content:center; margin:10px;">
        Processing...
        <div style="margin-top:10px;" class="spinner"></div>
      </div>

    </div>
    <div v-else><b>Result: {{ result }}</b></div>
  </div>
</template>

<script>
// In your Vue component
import Worker from 'worker-loader!../Worker/hardWorker.js'; // Directly use worker-loader to import the worker
import axois from 'axios';
export default {
  data() {
    return {
      result: null,
      loading: false,
      imageSrc: require('../assets/img/trip.png'),
      leftOffset: 0,
      stopAnimation:false,
      interval: null
    };
  },
  mounted : function () 
  {
    this.interval = setInterval(function () {
      if( this.stopAnimation )
      {
        clearInterval(this.interval);
      }
      if( this.leftOffset+10 > 500 )
      {
        this.leftOffset = 0;
      }
      else{
        this.leftOffset  = this.leftOffset+10;
      }

    }.bind( this ),55  )
  },
  methods: {
    stopAnimationClick(){
      this.stopAnimation = true;
    },
    startInMainProcess()
    {
      let sum = 0,
       iterationTimes = [];
      console.time("intensiveMainProcess");

      for (let i = 0; i < 10000000; i++) {
        let startIteration = performance.now();
        sum += Math.sqrt(i);   
        let endIteration = performance.now();
        iterationTimes.push(endIteration - startIteration);
      }
      console.timeEnd("intensiveMainProcess");
      //console.log(iterationTimes.join(','));
      this.result = sum;
    },
    async startIntensivePromiseProcess () {
      this.loading = true;
      this.result = "-----";
      let result = await this.promiseProcess();
      this.result = result;
      this.loading = false;
    },
    getData(){
      const request = new XMLHttpRequest();
      request.open('GET', 'http://localhost:3000', false); // The third parameter 'false' makes the request synchronous
      request.send();

      if (request.status === 200) {
        return request.responseText;

      } else {
        console.error('Request failed:', request.status, request.statusText);
      }
    },
    setDelayedResult () 
    {
      this.loading = true;
      this.result = "-----";
      this.result = this.getData();
      this.loading = false;
    },
    
    async startDefferedResult () {
      this.loading = true;
      this.result = "-----";
      let result = await this.deferredResultProcess();
      this.result = result; 
      this.loading = false;

    },

    deferredResultProcess() {
    return new Promise( async function ( resolve ) {
      try {
        const response = await axois.get('http://localhost:3000');  
        if (response.status !== 200 ) {
          throw new Error('Network response was not ok');
        }
        resolve( response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
      }
      }.bind( this ))
    },
    promiseProcess ()
    {
      return new Promise( function ( resolve, reject ) 
      {
        try {
          let sum = 0,
          iterationTimes = [];
          console.time("intensivePromisedProcess");

          for (let i = 0; i < 10000000; i++) {
            let startIteration = performance.now();
            sum += Math.sqrt(i);   
            let endIteration = performance.now();
            iterationTimes.push(endIteration - startIteration);
          }
          console.timeEnd("intensivePromisedProcess");
          //console.log(iterationTimes.join(','));
          resolve( sum );
        }
        catch( Error )
        {
          reject( Error )
        }
      }.bind( this ) )
    },
    startIntensiveProcess() {
      this.loading = true;
      this.result = "-----";
      // Create a new Web Worker
      const worker = new Worker();

      // Send data to the worker
      worker.postMessage(null);

      // Listen for messages from the worker
      worker.onmessage = (event) => {
        this.result = event.data;
        this.loading = false;
      };
    }
  }
}
</script>

<style scoped>
@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.trippyImage{
   animation: rotate 4s linear infinite;
}
.spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid transparent;
    border-top-color: #3498db;
    animation: rotate 1s linear infinite;
}
button {
  padding:4px;
  font-size: 12px;
  margin-bottom:4px;
}
</style>
