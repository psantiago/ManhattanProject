exports.index = function(req, res){
  res.render('index', { title: 'Express', param1: 'hello' });
};