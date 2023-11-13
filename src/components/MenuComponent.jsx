import styled from 'styled-components'
import { useState } from 'react'
import Ai from '../assets/Ai_icon.png'
import Human from '../assets/human_icon.png'
import Online from '../assets/online_icon.png'
import Goat from '../assets/goat_icon.png'
import Tiger from '../assets/tiger_icon.png'
import Close from '../assets/close_icon.png'


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
                value: "Goat",
                img: Goat,
            },
            {
                value: "Tiger",
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



const MenuComponent = ({ selection, setSelection, gameInfo, setGameInfo }) => {
    const [backSelection, setBackSelection] = useState([])
    const [roomInput, setRoomInput] = useState("")
    const [error, setError] = useState("")

    // useEffect(() => {
    //     console.log(selection)
    // }, [selection])

    return (
        <Container>
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
                                                setGameInfo({ ...gameInfo, playAs: item.value })
                                                setBackSelection(oldarray => [...oldarray, selection])
                                                setSelection(gameInfo.mode === "AI" ? 2 : 4)

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
                                        <Option onClick={() => {
                                            setGameInfo({ ...gameInfo, roomNo: "123456" })
                                            setBackSelection(oldarray => [...oldarray, selection])
                                            setSelection(4)
                                        }
                                        }>
                                            Create Room
                                        </Option>


                                        <Option onClick={() => {
                                            setBackSelection(oldarray => [...oldarray, selection])
                                            setSelection(6)
                                        }}>
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
                                                {gameInfo.roomNo}
                                                {
                                                    setTimeout(() => {
                                                        setBackSelection(oldarray => [...oldarray, selection])
                                                        setSelection(4)
                                                    }, 4000)
                                                }
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
                                                <Option onClick={() => {
                                                    if (roomInput.length > 0) {
                                                        setError("Joining Room...")
                                                        //connect to server room
                                                        if (roomInput === "123456") {
                                                            setBackSelection(oldarray => [...oldarray, selection])
                                                            setGameInfo({ ...gameInfo, roomNo: roomInput, playAs: "Goat" })
                                                            setSelection(4)
                                                        }
                                                        else {
                                                            setError("Room not found")
                                                        }

                                                    }
                                                    else {
                                                        setError("Please enter Room Code to join")
                                                    }

                                                }}>
                                                    <div>Join</div>
                                                </Option>
                                                <div style={{ color: "#a92525", padding: "40px 0 0 0" }}>{error}</div>
                                            </MenuOptions>
                                        </>
                                        : <></>
            }
        </Container>
    )
}

export default MenuComponent