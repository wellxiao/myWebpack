'use strict'
const ENV = process.env.NODE_ENV

let envR = 'development'
switch (ENV) {
    case 'pre':
        envR = 'production'
        break
    case 'prod':
        envR = 'production'
        break
    default:
        envR = 'development'
        break
}

module.exports = {
    NODE_ENV: envR,
}
