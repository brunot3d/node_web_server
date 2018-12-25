const express = require('express')
const ejs = require('ejs')
const app = express()
const path = require('path')
const fs = require('fs')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('partials', path.join( __dirname + '/views/partials'))

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})


// app.use((req, res, next) => {
//   res.render('maintenance.ejs', {
//     pageTitle: 'We\'ll be right back',
//     MaintenanceMsg: 'This site is currently being updated'
//   })
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  // res.send('<h1>Hello Expess</h1>')
  res.render('home.ejs', {
    pageTitle : 'Some Nice Website',
    welcomeMsg: 'Be welcome my friend!'
  })
})


app.get('/about', (req, res) => {
  res.render('about.ejs', {
    pageTitle: 'About Page'
  })
})


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fullfill this request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})