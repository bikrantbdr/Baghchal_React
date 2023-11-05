import styled from "styled-components"
import { useState, useEffect } from "react"

import { defaultBoard } from "./utils/utility_data"
import BoardComponent from "./components/BoardComponent"
import StatusComponent from "./components/StatusComponent"
import MenuComponent from "./components/MenuComponent"


const Body = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000;
  color: #fff;
`
const Container = styled.div`
  height: 100%;
  width: 100%;
  background: rgb(12,8,19);
  background: linear-gradient(43deg, hsl(261.8181818181818, 40.74074074074074%, 5.294117647058823%) 0%, #3d49eb68 37%,#2c34a18f 60% , rgba(46, 35, 61, 0.466) 100%);  
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  `

function App() {
  const [selection, setSelection] = useState(0)
  const [gameInfo, setGameInfo] = useState({
    mode: "",
    playAs: "",
    difficulty: "",
    roomNo: "",
  })
  const [boardhistory, setBoardHistory] = useState([])    //   ["a4", "e5d5"],
  const [board, setBoard] = useState({})


  //reseting board
  const resetBoard = () => {
    setBoard(defaultBoard)
    setBoardHistory([["a4", "e5d5"], ["a4", "e5d5"], ["a3",] ])
  }

  //initially setting board
  useEffect(() => {
    resetBoard()
  }, [])


  return (
    <Body>
      <Container>
        {selection != 4 && <MenuComponent setSelection={setSelection} selection={selection} gameInfo={gameInfo} setGameInfo={setGameInfo} />}
        {selection == 4 &&
          <>
            <BoardComponent board={board} setBoard={setBoard} boardhistory={boardhistory} setBoardHistory={setBoardHistory} gameInfo={gameInfo} />
            <StatusComponent history={boardhistory} baghCaptured={board.tigers.trapped.length} bakhraCaptured={board.goats.killed} bakhraPlaced={20 - board.goats.onHand} />
          </>
        }
      </Container>
    </Body>
  )
}

export default App
