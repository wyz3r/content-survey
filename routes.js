const routes = require('next-routes')


module.exports = routes()                           // ----   ----      -----
  .add('index', '/:id', 'index') 
  .add('multiple', '/multi/:id', 'multiple')
  .add('multimagen', '/multimagen/:id', 'multimagen')

  // name, route , page  
