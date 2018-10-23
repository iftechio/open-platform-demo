const pkg = require('./package.json')

module.exports = {
  assetsDir: 'static',
  baseUrl: process.env.NODE_ENV === 'production' ? `https://cdn.ruguoapp.com/${pkg.name}` : '/',
  productionSourceMap: true,
}
