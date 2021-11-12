const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/router')
const SwaggerUI = require('swagger-ui-express')
const SwaggerDocument = require('./swagger.json')

const PORT = 5000;
const DB_URL = 'mongodb+srv://user:user@cluster0.h8e3c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDocument));

app.use('/api', router)

app.get('/', (req, res) => {
  res.status(200).json('Server is working123')
})

async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    app.listen(PORT, () => console.log('SERVER STARTED'))
  } catch (e) {
    console.log(e)
  }
}
startApp()
