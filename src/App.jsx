import styled from "styled-components"
import { useState, useEffect } from "react"

import { defaultBoard } from "./utils/utility_data"
import BoardComponent from "./components/BoardComponent"
import StatusComponent from "./components/StatusComponent"
import MenuComponent from "./components/MenuComponent"
import io from 'socket.io-client'


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
  const socket = io('https://baghchal-socket.onrender.com/', { transports: ['websocket', 'polling', 'flashsocket'] })
  const BackendURL = "http://127.0.0.1:8000/api/v1/get_best_move"
  const [selection, setSelection] = useState(0)
  const [gameInfo, setGameInfo] = useState({
    mode: "",
    playAs: "",
    difficulty: "",
    roomNo: "",
    creator: 0,
    history: [],
    // history: [],
    gameOver: -1,
  })
  const [board, setBoard] = useState(defaultBoard)


  //reseting board
  const resetBoard = () => {
    setBoard({
      board: [
        [0, null, null, null, 0],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [0, null, null, null, 0],
      ],

      tigers: {
        trapped: [], //no of trapped tigers
        position: [
          [0, 0],
          [0, 4],
          [4, 0],
          [4, 4],
        ],
      },

      goats: {
        onHand: 20, //initially 20 Goats are in hand to place
        killed: 0, //initially 0 goats are killed
        spaceCaptured: [],
      },

      playerTurn: "goat", //initially its goat turn

      //Position of peice selected (find next valid move for this piece)
      //-1 means no selection needed (placing the goats on baord still left)
      selectedPosition: [],
      nextValidMoves: [], //valid move for selected peice
    })
    setGameInfo({
      mode: "",
      playAs: "",
      difficulty: "",
      roomNo: "",
      creator: 0,
      history: [],
      // history: [],
      gameOver: -1,
    })
  }

  const SwapPlayer = () => {
    //only if 10 moves have been already made
    if (gameInfo.history.length < 10) return

    if (gameInfo.playAs == "goat") {
      setGameInfo({ ...gameInfo, playAs: "tiger" })
    }
    else {
      setGameInfo({ ...gameInfo, playAs: "goat" })
    }
    setBoard({ ...board, playerTurn: board.playerTurn == "goat" ? "goat" : "tiger" })
  }

  const SurrenderFunction = () => {
    if (gameInfo.playAs == "goat") {
      setGameInfo({ ...gameInfo, gameOver: 0 })
    }
    else {
      setGameInfo({ ...gameInfo, gameOver: 1 })
    }
    //now send this to socket
    socket.emit("surrender", {
      roomName: gameInfo.roomNo,
      gameOver: gameInfo.playAs == "goat" ? 0 : 1

    })
  }

  //initially setting board
  useEffect(() => {
    resetBoard()
  }, [])

  // useEffect(() => {
  //   console.log("GameInfo changed", gameInfo)
  //   console.log("Board changed", board)
  // }, [gameInfo, board.board])

  //console log selection
  // useEffect(() => {
  //   console.log(selection)
  // }, [selection])




  return (
    <Body>
      <Container>
        {selection != 4 && <MenuComponent setSelection={setSelection} selection={selection} gameInfo={gameInfo} setGameInfo={setGameInfo} socket={socket} resetBoard={resetBoard} />}
        {selection == 4 &&
          <>
            <BoardComponent board={board} setBoard={setBoard} gameInfo={gameInfo} setGameInfo={setGameInfo} socket={socket} setSelection={setSelection} BackendURL={BackendURL} />
            {/* <StatusComponent history={gameInfo.history} baghCaptured={board.tigers.trapped.length} bakhraCaptured={board.goats.killed} bakhraPlaced={20 - board.goats.onHand} /> */}
            <StatusComponent gameInfo={gameInfo} board={board} resetBoard={resetBoard} setSelection={setSelection} SwapPlayer={SwapPlayer} SurrenderFunction={SurrenderFunction} />

          </>
        }
      </Container>
    </Body>
  )
}

export default App
