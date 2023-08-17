const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.get('/', (req, res) => {
    setTimeout( function () {
        let sum = 0;   
        for (let i = 0; i < 10000000; i++) {
          sum += Math.sqrt(i);   
        }
        res.send(sum.toString());
    },2000 )

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
