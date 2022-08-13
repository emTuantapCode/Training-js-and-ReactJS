import { useState } from 'react';
import './App.css'
import CardComponent from './components/CardComponent';
// import { Container, Draggable } from "react-smooth-dnd";

function App() {
  const data = {
    "id": '123',
    "arraycards": [
      {
        "_id": 1,
        "boardID": '123',
        "title": 'Firstcard',
        "arraytasks": [
          {
            "title": 'first task',
            "cardID": '1'
          },
          {
            "title": 'Second task',
            "cardID": '1'
          }, {
            "title": 'third task',
            "cardID": '1'
          },
        ]
      },
      {
        "_id": 2,
        "boardID": '123',
        "title": 'Second',
        "arraytasks": [
          {
            "title": 'first task 2',
            "cardID": '2'
          },
          {
            "title": 'Second task 2',
            "cardID": '2'
          }, {
            "title": 'third task 2',
            "cardID": '2'
          },
        ]
      },
    ]
  }
  const [dataCard, setDataCard] = useState(data)
  // const onColumnDrop = (dropResult) => {

  // }
  return (
    <div className="App">
      <div className="container-boards">
        <div className="board-body">
          {
            dataCard?.arraycards?.map((card, index) => {
              return <CardComponent
                key={index}
                data={card}
              />
            })
          }

        </div>
        <div className="board-footer">
          <input className="add-card-input" type="text" required />
          <div className="add-card-btn">Add Card...</div>
        </div>
      </div >
    </div >
  )
}

export default App;
