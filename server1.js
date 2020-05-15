const next = require('next')
const cacheableResponse = require('cacheable-response')
const express = require('express')
const routes = require('./routes')

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
const port = process.env.PORT || 3000

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60 * 5, // 24hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams),
  }),
  send: ({ data, res }) => res.send(data),
})


app.prepare()
  .then(() => {
    const server = express()
    // rutas amigables por parte de next-routes
    // server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))
    server.get('/:id', (req, res) => {
      const queryParams = { id: req.params.id }
      const pagePath = '/'
      return ssrCache({ req, res, pagePath, queryParams })
    })



    server.get('/multi/:id', (req, res) => {
      console.log('entra por aqui multi')
      const queryParams = { id: req.params.id }
      const pagePath = '/multiple'
      return ssrCache({ req, res, pagePath, queryParams })
    })

    server.get('*', (req, res) => {
      
       handler(req, res)
    
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
    

}).catch((ex)=> {
    console.error(ex.stack)
    process.exit(1)
})

// 
// console.log(port)
// // Without express
// const {createServer} = require('http')
// app.prepare().then(() => {
//   createServer(handler).listen(port)
// })


