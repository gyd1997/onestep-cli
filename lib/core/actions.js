const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-config')

const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

const createProjectAction = async (project, others) => {
  console.log('onestep helps you create your project~')

  // 1.clone项目
  await download(vueRepo, project, { clone: true })

  // 2.执行 npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['i'], { cwd: `./${project}` })

  // 3.运行 npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })

  // 4.打开浏览器
  open('http://localhost:8080/')
}

const addCpnOption = async (name, dest) => {
  // 1.编译 ejs 模板 result
  const result = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase()
  })

  // 2.将 result 写入文件操作
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

const addPageAndRouterAction = async (name, dest) => {
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compile('vue-component.ejs', data)
  const routerResult = await compile('vue-router.ejs', data)

  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRouterPath = path.resolve(targetDest, 'router.js')

    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRouterPath, routerResult)
  }
}

const addStoreAction = async (name, dest) => {
  const storeResult = await compile('vuex-store.ejs', {})
  const typesResult = await compile('vuex-store-types.ejs', {})

  const targetDest = path.resolve(dest, name.toLowerCase())
  if(createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, `${name}.js`)
    const targetTypesPath = path.resolve(targetDest, 'router.js')
    writeToFile(targetStorePath, storeResult)
    writeToFile(targetTypesPath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addCpnOption,
  addPageAndRouterAction,
  addStoreAction
}
