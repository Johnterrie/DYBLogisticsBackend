import 'dotenv/config'

import rootPath from 'app-root-path'

import development from './development.js'
import test from './test.js'
import production from './production.js'

const {
  DYBLOGISTICS_SECRET: SECRET,
  DYBLOGISTICS_NODE_ENV: NODE_ENV,
  DYBLOGISTICS_HASH: MY_HASH
} = process.env

const currentEnv = {
  development,
  test,
  production
}[NODE_ENV || 'development']

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  SECRET,
  NODE_ENV,
  MY_HASH
}
