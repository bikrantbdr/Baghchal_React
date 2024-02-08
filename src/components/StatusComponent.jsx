import React, { useEffect } from 'react'
import styled from 'styled-components'
import restart from '../assets/Restart.png'
import back from '../assets/Back.png'
import next from '../assets/Next.png'
import swap from '../assets/Swap.png'
import surrender from '../assets/Surrender.png'
const Container = styled.div`
    height: 80vh;
    width: 25vw;
    border-radius: 16px;
    background: linear-gradient(133deg, #ffffff37 0%, #ffffff20 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    `

const Status = styled.div`
    height:100%;
    width: 100%;
    border-radius: 16px;
    background-color: #151B51;
    `

const Option1 = styled.div`
    height:64px;
    width: 100%;
    background-color: #0f1532;
    border-radius: 16px 16px 0px 0px;

    padding:10px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    `
const Restartdiv = styled.div`
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    `
const BackNextdiv = styled.div`
    height: 40px;
    width:100px;
    display: flex;
    justify-content:space-evenly;
    align-items: center;

    & img{
        cursor: pointer;
    }
    `

const Moves = styled.div`
    height:40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    `
const Move = styled.div`
    height:2.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #fffff110;
    padding:10px;
`
const Index = styled.div`
    height: 100%;
    width: 10%;
    display: flex;
    align-items: center;
    padding:0 5px;
`
const GoatMove = styled.div`
    height: 100%;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 5px;
    `
const TigerMove = styled.div`
    height: 100%;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 10px;
    `



const Option2 = styled.div`
    height:64px;
    width: 100%;
    background-color: #0f1532;

    padding:20px;
    display: flex;
    justify-content:flex-start;
    align-items: center;
    gap: 30px;

    & img{
        cursor: pointer;
    }

    `
const Peices = styled.div`
    height:30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    `
const CapValue = styled.div`
    height: 2.5rem;
    width: 100%;
    display: flex;
`

const Caption = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 10px;
`
const Value = styled.div`
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding:0 10px;
    background-color: #B15653;
    color: #fff;
    `



const StatusComponent = ({ gameInfo, board }) => {

    useEffect(() => {
        // console.log("status changed")
        // console.log(board)
    }, [board])
    return (
        <Container>
            <Status>
                <Option1>
                    <Restartdiv>
                        <img src={restart} alt="restart" />
                    </Restartdiv>
                    <BackNextdiv>
                        <img src={back} alt="back" height="18px" width="18px" />
                        <img src={next} alt="next" height="18px" width="18px" />

                    </BackNextdiv>
                </Option1>
                <Moves>
                    {gameInfo.history.map((move, index) => {
                        return (
                            <Move key={index}>
                                {/* {console.log(move)} */}
                                <Index>{index + 1}. </Index>
                                <GoatMove>{move[0] ? move[0] : ""}</GoatMove>
                                <TigerMove>{move[1] ? move[1] : ""}</TigerMove>
                            </Move>
                        )
                    })}
                </Moves>
                <Option2>
                    <img src={swap} alt="swap" height="30px" width="30px" />
                    <img src={surrender} alt="surrender" height="25px" width="17px" />
                </Option2>
                <Peices>
                    <CapValue>
                        <Caption>Bagh Captured</Caption>
                        <Value>{board.tigers.trapped.length} / 4 </Value>
                    </CapValue>
                    <CapValue>
                        <Caption>Bakhra Captured</Caption>
                        <Value>{board.goats.killed} / 5 </Value>
                    </CapValue>
                    <CapValue>
                        <Caption>Bakhra Placed</Caption>
                        <Value>{20 - board.goats.onHand} / 20 </Value>
                    </CapValue>
                </Peices>
            </Status>
        </Container>
    )
}

export default StatusComponent