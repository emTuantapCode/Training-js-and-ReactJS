import { useEffect, useState } from 'react';
import './App.css'
import CardComponent from './components/CardComponent';
// import { Container, Draggable } from "react-smooth-dnd";

function App() {
  const [render, setRender] = useState(false)
  const [dataCard, setDataCard] = useState(null)
  const [inputBoard, setInputBoard] = useState('')
  // api get data Anhtd 14/8
  useEffect(() => {
    fetch('http://localhost:8080')
      .then(res => res.json())
      .then(data => setDataCard(data[0]))
  }, [render])

  const handleAddCard = async () => {
    if (inputBoard === '') return
    const data = {
      boardID: '62ee2a1f09a7e638aa10c937',
      title: inputBoard
    }
    const option = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    let res = await fetch('http://localhost:8080/card', option)
    if (res.status === 200) {
      setRender(!render)
      setInputBoard('')
    }
  }
  return (
    <div className="App">
      <div className="container-boards">
        <div className="board-body">
          {
            dataCard?.arraycards?.map((card, index) => {
              return (
                <CardComponent
                  index={index}
                  card={card}
                  render={render}
                  setRender={setRender}
                />
              )
            })
          }

        </div>
        <div className="board-footer">
          <input
            value={inputBoard}
            className="add-card-input"
            type="text"
            required
            onChange={(e) => setInputBoard(e.target.value)} />
          <div className="add-card-btn"
            onClick={() => handleAddCard()}
          >Add Card...</div>
        </div>
      </div >
    </div >
  )
}

export default App;
