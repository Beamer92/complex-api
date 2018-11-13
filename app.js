const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 3000
const app = express()

app.disable('x-powered-by')
app.use(bodyparser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))


const costRoutes = require('./src/routes/costumes.routes.js')
app.use('/costumes', costRoutes)
const tagRoutes = require('./src/routes/tags.routes.js')
app.use('/tags', tagRoutes)

app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    res.status(status).json({ error: err })
  })
  
  app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'You have magnificently managed to find absolutely nothing' }})
  })

if (process.env.NODE_ENV !== 'development') {
    const listener = () => console.log(`Dress up with style on port ${port}`)
    let server = app.listen(port, listener)
}
  
//   module.exports = app