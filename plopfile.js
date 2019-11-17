const componentGenerator = require('./plop-templates/component/prompt')
const viewGenerator = require('./plop-templates/view/prompt')

module.exports = function(plop) {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('view', viewGenerator)
}
