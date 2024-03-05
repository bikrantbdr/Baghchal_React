import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react'
import Ai from '../assets/Ai_icon.png'
import Human from '../assets/human_icon.png'
import Online from '../assets/online_icon.png'
import Goat from '../assets/goat_icon.png'
import Tiger from '../assets/tiger_icon.png'
import Close from '../assets/close_icon.png'


import io from 'socket.io-client'




const Container = styled.div`
    height: 90vh;
    width: 70vw;
    border-radius: 14px;
    background-color: #ffffff11;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 64px;
    position: relative;
  `
const BackButton = styled.div`
    width:80px;
    height:80px;
    color: #fff;
    position: absolute;
    top: 20px;
    left: 25px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover{
        scale: 1.1;
        opacity: 0.5;
    }
`
const MenuTitle = styled.div`
    font-size: 36px;
    width:100%;
    height:120px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Finger Paint', cursive;
  `
const MenuOptions = styled.div`
    width:100%;
    min-height:150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
   
    `
const Option = styled.div`
    width:200px;
    height:56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    background-color: #B15653;
    border-radius: 14px;
    color: #fff;
    transition: all 0.2s ease-in-out;

    &:hover{
        cursor: pointer;
        background-color: #c66e6b;
        scale: 1.05;
    }
    `

const RoomCode = styled.div`
    width:250px;
    height:56px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 14px;
    box-shadow: 0px 2px 5px 2px rgba(188,188,188,0.65);
    color: #000;
    font-size: 24px;
    `
const RoomCodeInput = styled.input`
    width:200px;
    height:2.5rem;
    background-color: #ffffff;
    border-radius: 10px;
    border: 0.5px dashed #ffffff;
    color: #000000;
    padding-left: 8px;
    margin-bottom: -16px;
    margin-top: 16px;
    text-align: center;
    font-size: 16px;

    &::placeholder{
        color: #000000;
        font-size: 16px;
        font-weight: 500;
    }

    &:focus{
        outline: none;
    }
    `



const menuItem = [
    {
        title: "Play Against",
        options: [
            {
                value: "AI",
                img: Ai,
                selection: 1
            },
            {
                value: "Human",
                img: Human,
                selection: 4
            },
            {
                value: "Online",
                img: Online,
                selection: 3
            }
        ]
    },
    {
        title: "Play As",
        options: [
            {
                value: "goat",
                img: Goat,
            },
            {
                value: "tiger",
                img: Tiger,
            },
        ]
    },
    {
        title: "Difficulty",
        options: [
            {
                value: "Easy",
            },
            {
                value: "Medium",
            },
            {
                value: "Hard",
            }
        ]
    },
    {
        title: "Room",
        options: [
            {
                value: "Enter Room",

            },
            {
                value: "Create Room",
            },
        ]
    }
]



const MenuComponent = ({ selection, setSelection, gameInfo, setGameInfo, socket }) => {
    const [backSelection, setBackSelection] = useState([])
    const [roomInput, setRoomInput] = useState("")
    const [error, setError] = useState("")
    const [joiningRoom, setJoiningRoom] = useState(false);

    const gameInfoRef = useRef(gameInfo)


    const createRoomHandler = (value) => {
        //create room randomly of 4digit
        setJoiningRoom(true);

        const room = Math.floor(1000 + Math.random() * 9000)
        const newGameInfo = { ...gameInfo, roomNo: room, creator: 1, playAs: value }

        setGameInfo(newGameInfo)
        gameInfoRef.current = newGameInfo

        socket.emit('createRoom', newGameInfo)

    }
    const joinRoomHandler = () => {
        // setBackSelection(oldarray => [...oldarray, selection])
        socket.emit('joinRoom', roomInput)

    }



    useEffect(() => {
        //confirming room creation
        socket.on('created', (data) => {
            console.log("room created", data)
            if (data.status === 0) {
                setJoiningRoom(false);
                console.log("room created ko bela ko gameinfo", gameInfo)
                console.log("room created ko bela ko gameinfoRef", gameInfoRef.current)
                setSelection(5);
            }
        })

        //confirming room joining
        socket.on('joined', (data) => {
            if (data.status === 0) {
                console.log("room joined", data)
                setJoiningRoom(false);
                setGameInfo({ ...gameInfo, roomNo: data.roomName, creator: 0 })
                gameInfoRef.current = { ...gameInfo, roomNo: data.roomName, creator: 0 }
                // setSelection(4);
                socket.emit('anotherPlayerJoined',
                    {
                        roomName: data.roomName,
                        status: 1,
                    })
            }
            else {
                setError(data.message)
            }

        }
        )


        //confirming another player joined now send initial board data
        socket.on('anotherPlayerJoinedConfirmation', (data) => {
            console.log("another player joined", data)
            if (data.status === 1 && gameInfoRef.current.creator === 1) {
                //call send initial board data
                console.log("sending initial board data", gameInfoRef.current)

                socket.emit('sendInitialBoardData', {
                    roomName: data.roomName,
                    playAs: gameInfoRef.current.playAs === "goat" ? "tiger" : "goat",
                })
                setJoiningRoom(false);
                setSelection(4);
            }
        }
        )

        //initialBoard 
        socket.on('initialBoard', (data) => {
            console.log("initial board data", data)
            setGameInfo({ ...gameInfo, playAs: data.playAs })
            gameInfoRef.current = { ...gameInfo, playAs: data.playAs }
            setSelection(4);
        })






    }, [socket, gameInfoRef]
    )


    return (
        <Container>
            {selection !== 10 && selection !== 11 &&
                <BackButton onClick={() => {
                    if (backSelection.length == 0) {
                        setSelection(0)
                        return
                    }
                    setSelection(backSelection[backSelection.length - 1])
                    setBackSelection(backSelection.slice(0, backSelection.length - 1))
                }}>
                    <img src={Close} alt="close" />
                </BackButton>
            }
            {
                //Play Against
                selection == 0 ?
                    <>
                        <MenuTitle>{menuItem[selection].title}</MenuTitle>
                        <MenuOptions>
                            {
                                menuItem[selection].options.map((item, index) => {
                                    return (
                                        <Option key={index} onClick={() => {
                                            setGameInfo({ ...gameInfo, mode: item.value })
                                            setBackSelection(oldarray => [...oldarray, selection])
                                            setSelection(item.selection)
                                        }}>
                                            <div>{item.value}</div>
                                            <img src={item.img} alt="" />
                                        </Option>
                                    )
                                })
                            }
                        </MenuOptions>
                    </>
                    //play AS
                    : selection == 1 ?
                        <>
                            <MenuTitle>{menuItem[selection].title}</MenuTitle>
                            <MenuOptions>
                                {
                                    menuItem[selection].options.map((item, index) => {
                                        return (
                                            <Option key={index} onClick={() => {
                                                // setGameInfo({ ...gameInfo, playAs: item.value })
                                                if (gameInfo.mode === "Online") {
                                                    createRoomHandler(item.value)
                                                }
                                                setBackSelection(oldarray => [...oldarray, selection])
                                                setSelection(gameInfo.mode === "AI" ? 2 : 1)
                                            }}>
                                                <div>{item.value}</div>
                                                <img src={item.img} alt="" />
                                            </Option>
                                        )
                                    })
                                }
                            </MenuOptions>
                        </>
                        //Difficulty level selection
                        : selection == 2 ?
                            <>
                                <MenuTitle>{menuItem[selection].title}</MenuTitle>
                                <MenuOptions>
                                    {
                                        menuItem[selection].options.map((item, index) => {
                                            return (
                                                <Option key={index} onClick={() => {
                                                    setGameInfo({ ...gameInfo, difficulty: item.value })
                                                    setBackSelection(oldarray => [...oldarray, selection])
                                                    setSelection(4)
                                                }}>
                                                    <div>{item.value}</div>
                                                </Option>
                                            )
                                        })
                                    }
                                </MenuOptions>
                            </>
                            //Online room mode selection
                            : selection == 3 ?
                                <>
                                    <MenuTitle>{menuItem[selection].title}</MenuTitle>
                                    <MenuOptions>
                                        <Option
                                            onClick={() => {
                                                setGameInfo({ ...gameInfo, creator: 1 })

                                                setSelection(1)
                                            }
                                            }

                                        >
                                            Create Room
                                            {/* //loader on creating room dynamic 3 dots*/}
                                            {joiningRoom && <div>...</div>}
                                        </Option>


                                        <Option
                                            onClick={() => {
                                                setGameInfo({ ...gameInfo, creator: 0 })
                                                setBackSelection(oldarray => [...oldarray, selection])
                                                setSelection(6)
                                            }}

                                        >
                                            Enter Room
                                        </Option>
                                    </MenuOptions>
                                </>
                                : selection == 5 ?
                                    <>
                                        <MenuTitle>
                                            Waiting for other player to join
                                        </MenuTitle>

                                        <MenuOptions>
                                            <RoomCode>
                                                {gameInfo.roomNo ? gameInfo.roomNo : ""}
                                            </RoomCode>
                                            <Option onClick={() => {
                                                setBackSelection(oldarray => [...oldarray, selection])
                                                setSelection(0)
                                            }}>
                                                <div>Cancel</div>
                                            </Option>
                                        </MenuOptions>
                                    </>
                                    : selection == 6 ?
                                        <>
                                            <MenuTitle>
                                                Enter Room number
                                            </MenuTitle>
                                            <RoomCodeInput type="text" placeholder=" Room Code" onChange={
                                                (e) => {
                                                    setRoomInput(e.target.value)
                                                }} />
                                            <MenuOptions>
                                                <Option onClick={joinRoomHandler} >
                                                    <div>Join</div>
                                                </Option>
                                                <div style={{ color: "#a92525", padding: "40px 0 0 0" }}>{error}</div>
                                            </MenuOptions>
                                        </>
                                        : selection == 10 ?
                                            <>
                                                <MenuTitle>
                                                    Tiger Won the game
                                                </MenuTitle>
                                                <MenuOptions>
                                                    <Option onClick={() => {
                                                        setSelection(0)
                                                    }}>
                                                        <div>Back to Menu</div>
                                                    </Option>
                                                </MenuOptions>

                                            </>
                                            : selection == 11 ?
                                                <>
                                                    <MenuTitle>
                                                        Goat Won the game
                                                    </MenuTitle>
                                                    <MenuOptions>
                                                        <Option onClick={() => {
                                                            setSelection(0)
                                                        }}>
                                                            <div>Back to Menu</div>
                                                        </Option>
                                                    </MenuOptions>
                                                </> :
                                                <></>
            }
        </Container>
    )
}

export default MenuComponent