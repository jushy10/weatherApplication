const express = require('express'),
app = express()


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