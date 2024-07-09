const { environment } = require('@rails/webpacker')

const dotenv = require('dotenv')
const webpack = require('webpack')

dotenv.config()

environment.plugins.append('Environment', new webpack.EnvironmentPlugin(process.env))

module.exports = environment
