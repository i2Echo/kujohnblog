var tool = require('./tool.js')

module.exports = function (req, res) {
    var pageName = 'index',
        title = 'Home';    
    tool.temp(req, res, pageName, title)
}
