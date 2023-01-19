#!/usr/bin/env node
'use strict'

// https://gist.github.com/mritzco/4495cf5fa863779ed1ac0e4edf9a1ed0
// https://yarnpkg.com/advanced/lifecycle-scripts
// https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin
// https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin
// https://linuxize.com/post/how-to-exclude-files-and-directories-with-rsync/

const path = require('path')
const sh = require('shell-exec')
const parse = require('get-them-args')
let options = {}
let method
let prj_name
const workDir = path.resolve(__dirname)

// console.log(`$FLEX_MODE : ${process.env.FLEX_MODE}`)
// console.log(`$PROJECT_CWD : ${process.env.PROJECT_CWD}`)
// console.log("Current working directory : ", workDir)
options = parse(process.argv.slice(2))
// console.log(options)
method = options?.method || 'install'

async function getProjectName() { 
  return sh(`jq '.name' ${`${workDir}/package.json`}`).then((result) => {
    const { stdout } = result
    if (!stdout) return result
    return stdout.trim()
  })
  .catch(() => {
    Promise.reject(new Error('No prj_name'))
  })
}

getProjectName()
  .then((result) => {
    prj_name = result.replace(/['"]+/g, '')

    if (method === 'install' && options?.dir) {
      const dst_directory = `${process.env.PROJECT_CWD}/${options.dir}`
      console.log(`Installing ${prj_name} as new workspace into ${process.env.npm_package_name}`)
      
      const scriptCmds = [
        `jq 'del(.bin) | del(.scripts.cli)' ${`${workDir}/package.json`} > "tmp" && mv "tmp" ${`${workDir}/package.json`}`,
        `rsync -a --progress --exclude-from='${`${workDir}/cli-setup-monorepo-exclude-file.txt`}' ${workDir}/ ${dst_directory}/`,
        `jq --arg dir "${options.dir}" --arg name "${prj_name}" 'del(.dependencies[($name)]) | .resolutions += {($name):("workspace:./"+$dir)} | .workspaces.packages |= (.+ ["./"+$dir] | unique)' ${`${process.env.PROJECT_CWD}/package.json`} > "tmp" && mv "tmp" ${`${process.env.PROJECT_CWD}/package.json`}`
      ]

      // Promise.all(scriptCmds.map(currentCmd => {
      //   return sh(currentCmd).then((result) => {
      //     console.log(result)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      // }))

      // https://stackoverflow.com/questions/48506029/synchronous-loop-in-promise-all
      scriptCmds.reduce(function(p, currentCmd) {
        return p.then(function() {
          return sh(currentCmd).then((result) => {
            console.log(result)
          })
        })
      }, Promise.resolve()).then(function() {
        console.log("⚡️All done here⚡️=> Don't forget to yarn install")
      }).catch(function(error) {
        console.log(error)
      });

    } else {
      const regex = /^@(.*)\//
      const short_prj_name = prj_name.replace(regex, '')
      console.log("From project root run the following cmd :")
      console.log(`yarn ${short_prj_name} cli --method install --dir path/to/install/workspace`)
    }
  })
  .catch((error) => {
    console.log(error)
  })
