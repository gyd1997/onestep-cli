const program = require('commander')
const helpOptions = () => {
  // 增加自己的 options
  program.option('-o --one', 'onestep cli')
  program.option('-d --dest <dest>', 'a destination folder, 例如：src/components')

  // 修改 help
  program.on('--help', function() {
    console.log('')
    console.log('Other: ') 
    console.log('other options~')
  })
}

module.exports = helpOptions