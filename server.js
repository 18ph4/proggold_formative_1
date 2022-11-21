const express = require('express')
const app = express()

app.use(express.static('static'))
app.use('/node_modules/papaparse', express.static('node_modules/papaparse'))


app.listen(80)