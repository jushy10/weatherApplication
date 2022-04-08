
const express = require('express'),
app = express()
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

require('dotenv').config()

// app.set('view engine', 'ejs')
app.use('/api/', require('./routes/hello'))



// app.get('/', (req, res) => {
//     res.send("Hello")
// })


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})