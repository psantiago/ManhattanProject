exports.add = function (req, res) {
    res.db.push(req.body.item);
};