const Tasks = require('../model/modelTask')
const Cards = require('../model/modelCard')

class TaskController {
    async create(req, res) {
        const data = req.body
        const Task = new Tasks(data)
        const newTaskID = Task._id
        await Task.save()
        const thisCard = await Cards.findById(data.cardID)
        thisCard.arraytasks.push(newTaskID)
        await thisCard.save()
        res.send('ok')
    }
    async delete(req, res) {
        const id = req.params.iddelete
        const cardID = (await Tasks.findById(id)).cardID
        await Tasks.findByIdAndDelete({ _id: id })
        const thisCard = await Cards.findById(cardID)
        const indexDelete = thisCard.arraytasks.indexOf(id)
        thisCard.arraytasks.splice(indexDelete, 1)
        await thisCard.save()
        res.send('ok')
    }
}

module.exports = new TaskController;
