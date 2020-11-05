const program = require('commander')

const {
  createProjectAction,
  addCpnOption,
  addPageAndRouterAction,
  addStoreAction
}  = require('./actions')

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: vue addcpn HelloWorld [-d src/component]')
    .action((name) => {
      addCpnOption(name, program.dest || 'src/components')
    })
  
  program
    .command('addpage <page>')
    .description('add vue page and router config 例如: vue addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRouterAction(page, program.dest || 'src/pages')
    })

  program
    .command('addstore <store>')
    .description('add vue store  例如: vue addstore home [-d src/store]')
    .action((store) => {
      addStoreAction(store, program.dest || 'src/store/modules')
    })
} 

module.exports = createCommands