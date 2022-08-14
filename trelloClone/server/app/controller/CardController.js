const Cards = require('../model/modelCard')
const Boards = require('../model/modelBoard')
const Tasks = require('../model/modelTask')

class CardController {
    async create(req, res) {
        const data = req.body
        const Card = new Cards(data)
        const newCardID = Card._id
        await Card.save()
        const thisBoard = await Boards.findById(data.boardID)
        thisBoard.arraycards.push(newCardID)
        await thisBoard.save()
        res.send('ok')
    }
    async delete(req, res) {
        const id = req.params.slug
        const boardID = (await Cards.findById(id)).boardID
        await Cards.findByIdAndDelete({ _id: id })
        await Tasks.deleteMany({ cardID: id })
        const thisBoard = await Boards.findById(boardID)
        const indexDelete = thisBoard.arraycards.indexOf(id)
        thisBoard.arraycards.splice(indexDelete, 1)
        await thisBoard.save()
        res.send('ok')
    }
    update(req, res) {

    }
}

module.exports = new CardController;
