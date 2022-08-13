const Boards = require('../model/modelBoard')

class BoardController {
    getAll(req, res) {
        Boards.find({})
            .populate('arraycards')
            .populate({
                path: 'arraycards',
                populate: { path: 'arraytasks' }
            })
            .then(data => {
                res.send(data)
            })
    }
}

module.exports = new BoardController;
