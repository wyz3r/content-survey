const next = require('next')
const express = require('express')
const cacheableResponse = require('cacheable-response')
const routes = require('./routes')


const isDevEnvironment = process.env.NODE_ENV !== 'production'
console.log(isDevEnvironment)
const nextApp = next({dev: isDevEnvironment})

const defaultRequestHandler = routes.getRequestHandler(nextApp);

const cacheManager = cacheableResponse({
  ttl: 1000 * 60 * 60 * 2, // 1hour
  get: async ({req, res, pagePath, queryParams}) => {
      try {
          return {data: await nextApp.renderToHTML(req, res, pagePath, queryParams)}
      } catch (e) {
          return {data: "error: " + e}
      }
  },
  send: ({data, res}) => {
      res.send(data);
  }
})

nextApp.prepare()
    .then(() => {
        const server = express();

        // Serving next data directly without the cache
        server.get('/_next/*', (req, res) => {
            defaultRequestHandler(req, res);
        });

        server.get('*', (req, res) => {
          console.log('entra pero al requyesr')
            if (!isDevEnvironment || req.query.noCache) {
                console.log('entra a la salida')
                res.setHeader('X-Cache-Status', 'DISABLED');
                defaultRequestHandler(req, res);
            } else {
              console.log('entra al generador de cache ')
                cacheManager({req, res, pagePath: '/', queryParams: {id: 'quizz-cosas-que-te-gusta-hacer-con-tus-amigos'}});
            }
        });

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    });