#!/usr/bin/env node
'use strict'

// https://gist.github.com/mritzco/4495cf5fa863779ed1ac0e4edf9a1ed0
// https://yarnpkg.com/advanced/lifecycle-scripts
// https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin
// https://docs.npmjs.com/cli/v9/configuring-npm/package-json#directoriesbin

const sh = require('shell-exec')
sh(`env-cmd -f ./env/public/.env.${process.env.FLEX_MODE}`)

const dst_directory = `${PROJECT_CWD}/${process.env.FLEX_MF_HOMEPAGE_ABOUT_SLIDES_PROJECT_DIR}`

new Promise(() => {
  // https://linuxize.com/post/how-to-exclude-files-and-directories-with-rsync/
  return sh(`rsync -a --exclude-from='./cli-postinstall-exclude-file.txt' ./ ${dst_directory}/`)
    .then(() => {
      console.log(`Successfully completed postinstall for ${$npm_package_name}.`)
    })
    .catch((error) => {
      console.log(`Could complete postinstall for ${$npm_package_name}. ${error.message}.`)
    })
})
