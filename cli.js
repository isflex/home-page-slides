#!/usr/bin/env node
'use strict'

// https://gist.github.com/mritzco/4495cf5fa863779ed1ac0e4edf9a1ed0
// https://yarnpkg.com/advanced/lifecycle-scripts
// https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin
// https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin
// https://linuxize.com/post/how-to-exclude-files-and-directories-with-rsync/

const sh = require('shell-exec')
sh(`env-cmd -f ./env/public/.env.${process.env.FLEX_MODE}`)

const args = require('get-them-args')(process.argv.slice(2))
console.log(`args for ${process.env.npm_package_name} : ${args}.`)

const dst_directory = `${process.env.PROJECT_CWD}/${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR}`

new Promise(() => {
  return sh(`rsync -a --exclude-from='./cli-setup-monorepo-exclude-file.txt' ./ ${dst_directory}/`)
    .then(() => {
      console.log(`Successfully completed 'setup:monorepo' for ${process.env.npm_package_name}.`)
    })
    .catch((error) => {
      console.log(`Could complete 'setup:monorepo' for ${process.env.npm_package_name}. ${error.message}.`)
    })
})
