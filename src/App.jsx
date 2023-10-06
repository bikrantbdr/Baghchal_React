import styled from "styled-components"
import BoardComponent from "./components/BoardComponent"
import StatusComponent from "./components/StatusComponent"
import { useState } from "react"
import MenuComponent from "./components/MenuComponent"

// (goat move, tiger move)
const boardhistory = [
  ["a4", "e5d5"],
  ["b5",],
]
const peicesHistory = {
  baghCaptured: 0,
  bakhraCaptured: 1,
  bakhraPlaced: 2
}


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
  background: linear-gradient(43deg, rgba(12,8,19,1) 0%, #3d49eb68 37%,#2c34a18f 60% , rgba(46, 35, 61, 0.466) 100%);  
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
  return (
    <Body>
      <Container>
        {selection !=4 && <MenuComponent setSelection={setSelection} selection={selection} gameInfo={gameInfo} setGameInfo={setGameInfo} />}
        {selection == 4 && 
        <>
        <BoardComponent />
        {console.log(gameInfo)}
        <StatusComponent history={boardhistory} peices={peicesHistory} />
        </>
        }
      </Container>
    </Body>
  )
}

export default App
