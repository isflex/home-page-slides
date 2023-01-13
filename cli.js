#!/usr/bin/env node
'use strict'

// https://gist.github.com/mritzco/4495cf5fa863779ed1ac0e4edf9a1ed0
// https://yarnpkg.com/advanced/lifecycle-scripts
// https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin
// https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin
// https://linuxize.com/post/how-to-exclude-files-and-directories-with-rsync/

const sh = require('shell-exec')
const parse = require('get-them-args')

// sh(`env-cmd -f ./env/public/.env.${process.env.FLEX_MODE}`)
// console.log(`$FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR : ${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR}`)

// sh(`set -a`)
// sh(`. ./env/public/.env.${process.env.FLEX_MODE}`)
// sh(`set +a`)
// console.log(`$FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR : ${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR}`)

console.log(`$FLEX_MODE : ${process.env.FLEX_MODE}`)
console.log(`$PROJECT_CWD : ${process.env.PROJECT_CWD}`)
console.log(parse(process.argv.slice(2)))
sh(`echo $(rsync --version)`).then((result) => {
  console.log(result)
})
.catch((error) => {
  console.log(error)
})

sh(`env-cmd -f ./env/public/.env.${process.env.FLEX_MODE}`).then((result) => {
  console.log(`$FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR : ${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR}`)
  console.log(result)
})
.catch((error) => {
  console.log(error)
})

const dst_directory = `${process.env.PROJECT_CWD}/packages/slides`

new Promise(() => {
  return sh(`env-cmd -f ./env/public/.env.${process.env.FLEX_MODE}`)
    .then(res => {
      const { stdout } = res
      if (!stdout) return res

      console.log(`$FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR : ${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR}`)
      
      sh(`mkdir -p ${dst_directory}`)
      sh(`echo $(rsync --version)`)
      sh(`rsync -a --exclude-from='./cli-setup-monorepo-exclude-file.txt' ./ ${dst_directory}/`)

      console.log(`Successfully completed 'setup:monorepo' in ${process.env.npm_package_name}.`)
    })
    .catch((error) => {
      console.log(`Could not complete 'setup:monorepo' in ${process.env.npm_package_name}. ${error.message}.`)
    })
})
