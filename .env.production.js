// require('@babel/runtime-corejs3/core-js/promise').default = require('bluebird')
// globalThis.Promise = require('bluebird')

const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
// const rootLocation = require.main.paths[0].split('node_modules')[0].slice(0, -1)

function envProject () {
  return new Promise((resolve, reject) => {
    const envProject = dotenv.config({ path: path.resolve(`${__dirname}/env/public/.env.production`),  override: false })
    if (envProject.error) {
      reject(new Error(envProject.error))
    }
    resolve(dotenvExpand.expand(envProject))
  })
}

module.exports = {
  ...envProject().parsed
}