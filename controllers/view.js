exports.view = function(req, res){
  res.render('view', { items: req.db });
};