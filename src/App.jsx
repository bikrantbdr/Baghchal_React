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
  const [selection, setSelection] = useState(4)
  const [gameInfo, setGameInfo] = useState({
    mode: "Human",
    playAs: "Goat",
    difficulty: "",
    roomNo: "",
    history:[["a4"],],
    // history: [],
    gameOver:false,
  })
  const [board, setBoard] = useState(defaultBoard)


  //reseting board
  const resetBoard = () => {
    setBoard(defaultBoard)
  }

  //initially setting board
  useEffect(() => {
    resetBoard()
  }, [])

  useEffect(() => {
    // console.log("board changed")
    // console.log(board)
  }, [board])


  return (
    <Body>
      <Container>
        {selection != 4 && <MenuComponent setSelection={setSelection} selection={selection} gameInfo={gameInfo} setGameInfo={setGameInfo} />}
        {selection == 4 &&
          <>
            <BoardComponent board={board} setBoard={setBoard}  gameInfo={gameInfo} setGameInfo={setGameInfo} />
            {/* <StatusComponent history={gameInfo.history} baghCaptured={board.tigers.trapped.length} bakhraCaptured={board.goats.killed} bakhraPlaced={20 - board.goats.onHand} /> */}
            <StatusComponent gameInfo={gameInfo} board={board}  />

          </>
        }
      </Container>
    </Body>
  )
}

export default App
