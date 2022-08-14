const Boards = require('../model/modelBoard')

class BoardController {
    getAll(req, res) {
        Boards.find({}, (err, board) => {
            if (!err) res.json(board);
        })
            .populate('arraycards')
            .populate({
                path: 'arraycards',
                populate: { path: 'arraytasks' }
            })
            .catch(err => console.log(err))
    }
    update(req, res) {
        console.log('=========i m here ============');
        res.stats(200)
    }
}

module.exports = new BoardController;
