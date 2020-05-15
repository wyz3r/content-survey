const next = require('next')
const express = require('express')
const cacheableResponse = require('cacheable-response')
const routes = require('./routes')


const isDevEnvironment = process.env.NODE_ENV !== 'production'
const processPort = (process.env.NODE_ENV !== 'production' ? 3000 : process.env.PORT)
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
            if (isDevEnvironment || req.query.noCache) {
                res.setHeader('X-Cache-Status', 'DISABLED');
                defaultRequestHandler(req, res);
            } else {
              console.log('entra al generador de cache ')
              const pathRoute = (req.path.split('/').length === 3 ? req.path.split('/')[1] : '/' )
              const arregl = (req.path.split('/').length === 3 ? req.path.split('/')[2] : req.path.split('/')[1] )
              switch(pathRoute){
                  case '/':
                    cacheManager({req, res, pagePath: '/', queryParams: {id: arregl}})
                    break
                  case 'multi':
                    cacheManager({req, res, pagePath: '/multiple', queryParams: {id: arregl}})
                    break
                  case 'multimagen':
                    cacheManager({req, res, pagePath: '/multimagen', queryParams: {id: arregl}})
                    break
              }
                // cacheManager({req, res, pagePath: pathRoute, queryParams: {id: 'quizz-cosas-que-te-gusta-hacer-con-tus-amigos'}})
            }
        });

        server.listen(processPort, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${processPort}`)

        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    });