var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/blog",
                  {native_parser:true});

db.bind('article').bind({
  getByAuthor: function(author, callback) {
    this.findOne({author: author}, callback);
  }
});
db.article.getByAuthor("echo", function(err, article) {
  console.log(article);
});