import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { directions, directionsWithDiagonal } from '../utils/utility_data'
import triangle from '../assets/triangle.svg'
import square from '../assets/square.svg'
import tiger from '../assets/tiger.png'
import goat from '../assets/goat.png'


const canvasdimension = {
    width: 510,
    height: 510
}

const canvassquaredimension = {
    width: canvasdimension.width / 4,
    height: canvasdimension.height / 4
}

const trianlgedimension = {
    triangleTileWidth: 30,
    triangleTileHeight: 21,

    squareTileWidth: 32,
    squareTileHeight: 32,
}

const pieceGoatDimension = {
    width: 75,
    height: 75
}

const pieceTigerDimension = {
    width: 75,
    height: 75
}

const Container = styled.div`
    height: 80vh;
    width: 80vh;
    /* border: 2px solid #fff; */
    border-radius: 14px;
    background-color: #ffffff11;
    display: flex;
    justify-content: center;
    align-items: center;
    
    `
const InnerContainer = styled.div`
height: ${props => props.canvasdimension.height};
width: ${props => props.canvasdimension.width};
background-color: #fff;
border-radius: 14px;
display: flex;
justify-content: center;
align-items: center;

position: relative;
`
const Background = styled.div`
    height: ${props => props.canvasdimension.height};
    width: ${props => props.canvasdimension.width};
    background-color: #fff;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    overflow: hidden;
    position: relative;
    `

const TopLeft = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${triangle});
    width: ${props => props.trianlgedimension.triangleTileWidth}px;
    height: ${props => props.trianlgedimension.triangleTileHeight}px;
    
    /* transform-origin: top center; */
    transform: rotate(-45deg);
    z-index: 2;
    left:-6px;
    top:-2px;
`
const Triangle = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${triangle});
    width: ${props => props.trianlgedimension.triangleTileWidth}px;
    height: ${props => props.trianlgedimension.triangleTileHeight}px;

    left:${props => props.canvassquaredimension.width * props.col - props.trianlgedimension.triangleTileWidth / 2}px ;
    top:${props => props.canvassquaredimension.height * props.row}px;
`
const TopRight = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${triangle});
    width: ${props => props.trianlgedimension.triangleTileWidth}px;
    height: ${props => props.trianlgedimension.triangleTileHeight}px;
    
    /* transform-origin: top center; */
    transform: rotate(45deg);
    z-index: 2;
    right:-2px;
    top:-1px;
`
const Square = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${square});
    background-size: cover;
    width: ${props => props.trianlgedimension.squareTileWidth}px;
    height: ${props => props.trianlgedimension.squareTileHeight}px;

    left:${props => props.canvassquaredimension.width * props.col - props.trianlgedimension.squareTileWidth / 2}px ;
    top:${props => props.canvassquaredimension.height * props.row - props.trianlgedimension.squareTileHeight / 2}px;
`
const BottomLeft = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${triangle});
    width: ${props => props.trianlgedimension.triangleTileWidth}px;
    height: ${props => props.trianlgedimension.triangleTileHeight}px;
    
    /* transform-origin: top center; */
    transform: rotate(-135deg);
    z-index: 2;
    left:-6px;
    bottom: -2px;

`

const BottomRight = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${triangle});
    width: ${props => props.trianlgedimension.triangleTileWidth}px;
    height: ${props => props.trianlgedimension.triangleTileHeight}px;
    
    /* transform-origin: top center; */
    transform: rotate(135deg);
    z-index: 2;
    right:-6px;
    bottom: -2px;

`

const gameOver = (board) => {
    //1 means Goat win
    //0 Means Tiger win
    // console.log("trapped tigers", board.tigers.trapped.length);
    // console.log("goats on hand", board.goats.onHand);
    //condn. 3 => all tigers are trapped
    if (board.tigers.trapped.length == 4) {
        // console.log("all tigers are trapped")
        return 1;
    }

    // condn. 1 => killed 5 goats
    if (board.goats.killed >= 5) {
        return 0;
    }
    //condn. 2 => goats have no valid moves  (if game has atleast one goat with a valid place to move than game not over)
    else if (board.goats.onHand === 0) {
        let validMovenumber = 0;
        let directionChoice = []
        for (let row = 0; row < board.board.length && validMovenumber === 0; row++) {
            for (let col = 0; col < board.board[row].length && validMovenumber === 0; col++) {
                if (board.board[row][col] === null) {

                    if (checkEven(row, col)) {
                        //we need to check for diagonal too cause the pieces in even places have that choices
                        directionChoice = directionsWithDiagonal
                    }
                    else {
                        directionChoice = directions
                    }
                    for (const direction of directionChoice) {
                        const newRow = row + direction.row;
                        const newCol = col + direction.col;

                        if (newRow >= 0 &&
                            newRow < board.board.length &&
                            newCol >= 0 &&
                            newCol < board.board[row].length &&
                            board.board[newRow][newCol] === 1
                        ) {
                            validMovenumber++;
                            break;
                        }
                    }
                }
            }
        }
        if (validMovenumber === 0) {
            // console.log("validMovenumber", validMovenumber)
            return 0
        }
    }




    // the game is not over
    return -1;
}

// coordinate conversion for 1d to 2d array format
const convertTo2d = (index) => {
    const row = Math.floor(index / 5);
    const column = index % 5;
    return { row, column }
}

// coordinate conversion for 2d to 1d array format
const convertTo1d = (row, column) => {
    return row * 5 + column;
}

const checkEven = (position) => {
    // console.log("position for checking even odd", position)
    // even
    if ((position[0] + position[1]) % 2 === 0) {
        // console.log("even")
        return true;
    }
    else {
        // console.log("odd")
        return false
    };
}

// valid moves for the selected piece
const validMove = (board) => {
    // console.log("valid move check garni function",board.selectedPosition)
    //valid moves to be returened
    const nextValidMoves = [];
    let directionChoice = []

    // Check if it's the goat's turn and there are goats left to place on the board
    if (board.playerTurn === "goat" && board.goats.onHand > 0) {
        //Iterate over each cell of the board
        for (let row = 0; row < board.board.length; row++) {
            for (let column = 0; column < board.board[row].length; column++) {
                // Check if the cell is empty (null) and add it as a valid move
                if (board.board[row][column] === null) {
                    // nextValidMoves.push([row, column,checkGoatAction(board,row,column)])
                    nextValidMoves.push([row, column])
                }
            }
        }
    }
    //check valid moves when its turn for goat to move
    else if (board.playerTurn === "goat" &&
        board.goats.onHand === 0) {
        if (board.board[board.selectedPosition[0]][board.selectedPosition[1]] === 1) {
            const row = board.selectedPosition[0]
            const col = board.selectedPosition[1]

            // console.log("selected position goat", row, col)

            //if the selected position is even
            if (checkEven(board.selectedPosition)) {
                //we need to check for diagonal too cause the pieces in even places have that choices
                directionChoice = directionsWithDiagonal
            }
            else {
                directionChoice = directions
                // console.log("odd wala direction")
            }
            for (const direction of directionChoice) {
                const newRow = row + direction.row;
                const newCol = col + direction.col;

                // console.log(newRow,newCol)

                // Check if the new position is within the bounds of the board
                if (newRow >= 0 &&
                    newRow < board.board.length &&
                    newCol >= 0 &&
                    newCol < board.board[row].length) {
                    // Check if the new position is empty
                    if (board.board[newRow][newCol] === null) {
                        nextValidMoves.push([newRow, newCol])
                    }
                }
            }
        }
    }
    //check valid moves when its turn for Tiger to move
    else {
        const row = board.selectedPosition[0]
        const col = board.selectedPosition[1]

        // console.log("selected position Tiger", row, col)

        //if the selected position is even
        if (checkEven(board.selectedPosition)) {
            //we need to check for diagonal too cause the pieces in even places have that choices
            directionChoice = directionsWithDiagonal
            // console.log("even wala directionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        }
        else {
            directionChoice = directions
            // console.log("odd wala direction")
        }
        for (const direction of directionChoice) {
            const newRow = row + direction.row;
            const newCol = col + direction.col;

            //one more step in a straight line
            const newKillRow = newRow + direction.row;
            const newKillCol = newCol + direction.col;

            // console.log("new", newRow, newCol)
            // console.log("newkill", newKillRow, newKillCol)

            // Check if the new position is within the bounds of the board
            if (newRow >= 0 &&
                newRow < board.board.length &&
                newCol >= 0 &&
                newCol < board.board[row].length
            ) {
                // Check if the new position is empty
                if (board.board[newRow][newCol] === null) {
                    // nextValidMoves.push([newRow, newCol, "move"])
                    nextValidMoves.push([newRow, newCol])
                    // console.log("push new", newRow, newCol)
                }
                //if killing a goat is possible by going over the goat position in a straight line
                else if (board.board[newRow][newCol] === 1) {
                    //check if it is in bound of board
                    if (newKillRow >= 0 &&
                        newKillRow < board.board.length &&
                        newKillCol >= 0 &&
                        newKillCol < board.board[row].length
                    ) {
                        if (board.board[newKillRow][newKillCol] === null) {
                            // nextValidMoves.push([newKillRow, newKillCol, "kill"])
                            nextValidMoves.push([newKillRow, newKillCol])
                            // console.log("push newkill", newKillRow, newKillCol)
                        }
                    }
                }
            }
        }
    }
    // console.log("next valid moves from function", nextValidMoves)
    return (nextValidMoves);
}
//returns the tiger trapped in the board
const trappedTigers = (board) => {
    let newTrapped = []
    let directionChoice = []
    for (let i = 0; i < 4; i++) {
        let anyValidMove = []
        let position = board.tigers.position[i]
        let row = position[0]
        let col = position[1]
        //if the selected position is even
        if (checkEven(row, col)) {
            //we need to check for diagonal too cause the pieces in even places have that choices
            directionChoice = directionsWithDiagonal
        }
        else {
            directionChoice = directions
        }
        for (const direction of directionChoice) {
            const newRow = row + direction.row;
            const newCol = col + direction.col;

            //one more step in a straight line
            const newKillRow = newRow + direction.row;
            const newKillCol = newCol + direction.col;

            // console.log("new", newRow, newCol)
            // console.log("newkill", newKillRow, newKillCol)

            // Check if the new position is within the bounds of the board
            if (newRow >= 0 &&
                newRow < board.board.length &&
                newCol >= 0 &&
                newCol < board.board[row].length
            ) {
                // Check if the new position is empty
                if (board.board[newRow][newCol] === null) {
                    anyValidMove.push([newRow, newCol])
                    // console.log("push traped", newRow, newCol)
                }
                //if killing a goat is possible by going over the goat position in a straight line
                else if (board.board[newRow][newCol] === 1) {
                    //check if it is in bound of board
                    if (newKillRow >= 0 &&
                        newKillRow < board.board.length &&
                        newKillCol >= 0 &&
                        newKillCol < board.board[row].length
                    ) {
                        if (board.board[newKillRow][newKillCol] === null) {
                            anyValidMove.push([newKillRow, newKillCol])
                            // console.log("push newkill", newKillRow, newKillCol)
                        }
                    }
                }
            }
        }
        if (anyValidMove.length === 0) {
            newTrapped.push(board.tigers.position[i])
        }
    }
    return (newTrapped)
}

const CalculateMove = (oldCoordinates, newCoordinates, killed = false, goatPlaced = false) => {
    if (goatPlaced) {
        return `${String.fromCharCode(97 + newCoordinates.row)}${newCoordinates.column + 1}`
    }

    const oldRow = String.fromCharCode(97 + oldCoordinates.row)
    const oldCol = oldCoordinates.column + 1
    const newRow = String.fromCharCode(97 + newCoordinates.row)
    const newCol = newCoordinates.column + 1

    if (killed) {
        return `${oldRow}${oldCol}x${newRow}${newCol}`
    }
    else {
        return `${oldRow}${oldCol}${newRow}${newCol}`
    }

}

const ReverseMove = (move) => {
    if (move.length === 2) {
        const newRow = move.charCodeAt(0) - 97;
        const newColumn = parseInt(move[1]) - 1;

        return {
            goatPlaced: true,
            newCoordinates: { row: newRow, column: newColumn }
        };
    }

    const regex = /([a-h])(\d+)(x?)([a-h])(\d+)/;
    const matches = move.match(regex);

    if (!matches) {
        // Invalid move format
        return null;
    }

    const oldRow = matches[1].charCodeAt(0) - 97;
    const oldColumn = parseInt(matches[2]) - 1;
    const killed = matches[3] === 'x';
    const newRow = matches[4].charCodeAt(0) - 97;
    const newColumn = parseInt(matches[5]) - 1;

    return {
        oldCoordinates: { row: oldRow, column: oldColumn },
        newCoordinates: { row: newRow, column: newColumn },
        killed: killed
    };
};
const killGoat = (oldRow, oldColumn, newRow, newColumn) => {
    const killedgoatrow = (oldRow + newRow) / 2
    const killedgoatcolumn = (oldColumn + newColumn) / 2
    const killedgoat = document.querySelector(`.piece-${killedgoatrow * 5 + killedgoatcolumn}`);
    if (killedgoat) {
        killedgoat.remove()
    }
}

const arrayEqual = (arr1, arr2) => {
    // Check if arrays are not defined or have different lengths
    if (!arr1 || !arr2 || arr1.length !== arr2.length) {
        return false;
    }

    // Check each row
    for (let i = 0; i < arr1.length; i++) {
        // Check if rows have different lengths
        if (arr1[i].length !== arr2[i].length) {
            return false;
        }

        // Check each element in the row
        for (let j = 0; j < arr1[i].length; j++) {
            // If any element is different, arrays are not equal
            if (arr1[i][j] !== arr2[i][j]) {
                return false;
            }
        }
    }

    // Arrays are equal
    return true;
}

const BoardComponent = ({ board, setBoard, gameInfo, setGameInfo, socket }) => {

    const canvasRef = useRef(null);
    const [clicked, setClicked] = useState(-1)
    const [dropped, setDropped] = useState([-1, -1])


    useEffect(() => {
        //in online and AI mode disable click event on board if its not your turn
        const container = document.querySelector('.container');
        if ((gameInfo.mode === "Online" || gameInfo.mode === "AI") && board.playerTurn !== gameInfo.playAs) {
            container.style.pointerEvents = "none"
        }
        else {
            container.style.pointerEvents = "auto"
        }

    }, [board, gameInfo])

    //send the move to the server
    useEffect(() => {
        //get the last move
        if (gameInfo.history.length == 0) return;
        // console.log("gameInfo.history", gameInfo.history[gameInfo.history.length - 1][gameInfo.history[gameInfo.history.length - 1].length - 1])
        const move = gameInfo.history[gameInfo.history.length - 1][gameInfo.history[gameInfo.history.length - 1].length - 1]


        //send the move to the server
        if (gameInfo.mode === "Online" && board.playerTurn !== gameInfo.playAs) {
            // console.log("send the move to the server", move)
            socket.emit('sendMove', {
                roomName: gameInfo.roomNo,
                move: move,
                sentFrom: gameInfo.playAs,
                board: board.board,
                goatsonHand: board.goats.onHand,
                history: gameInfo.history
            })

        }
        //cleanup 
        return () => {
            socket.off('sendMove')
        }
    }, [board.playerTurn])

    //receive the move from the server
    useEffect(() => {
        // console.log("socket");
        socket.on('move', (data) => {
            if (data.sentFrom === gameInfo.playAs) return;
            const totalelementsinreceivedhistory = data.history.reduce((acc, curr) => acc + curr.length, 0);
            const totalhistoryelementsinlocal = gameInfo.history.reduce((acc, curr) => acc + curr.length, 0);
            console.log("total history", totalelementsinreceivedhistory, totalhistoryelementsinlocal)
            if (totalelementsinreceivedhistory !== totalhistoryelementsinlocal + 1) return;
            if (data.sentFrom !== gameInfo.playAs) {
                //if move is already received then return
                const move = ReverseMove(data.move)
                // console.log("reversed move", move)
                if (move.goatPlaced && board.board[move.newCoordinates.row][move.newCoordinates.column] === null) {
                    // console.log("goat placed")
                    const opponentBoard = JSON.parse(JSON.stringify(data.board))
                    setBoard(prev => {
                        const newBoard = { ...prev };
                        newBoard.goats.onHand--;
                        newBoard.playerTurn = "tiger";
                        newBoard.board = opponentBoard;
                        newBoard.goats.onHand = data.goatsonHand

                        return newBoard;
                    })
                    //change game info history
                    setGameInfo(prev => {
                        const newGameInfo = { ...prev };
                        newGameInfo.history = data.history
                        newGameInfo.playAs = gameInfo.playAs
                        return newGameInfo;
                    })
                    placeOpponentGoat(move.newCoordinates.row, move.newCoordinates.column)
                }
                else if (!move.killed && board.board[move.newCoordinates.row][move.newCoordinates.column] === null && gameInfo.playAs !== "tiger" && board.playerTurn === "tiger") {
                    // console.log("tiger move")
                    setBoard(prev => {
                        const newBoard = { ...prev };
                        newBoard.playerTurn = "goat";
                        newBoard.board = JSON.parse(JSON.stringify(data.board));
                        newBoard.goats.onHand = data.goatsonHand
                        return newBoard;
                    })
                    //change game info history
                    setGameInfo(prev => {
                        const newGameInfo = { ...prev };
                        newGameInfo.history = data.history
                        newGameInfo.playAs = gameInfo.playAs
                        // console.log("newGameInfo", newGameInfo)
                        return newGameInfo;
                    })
                    placeOpponentTiger(move.oldCoordinates.row, move.oldCoordinates.column, move.newCoordinates.row, move.newCoordinates.column)
                }
                else if (move.killed && board.board[move.newCoordinates.row][move.newCoordinates.column] === null && gameInfo.playAs !== "tiger") {
                    // console.log("tiger move")
                    setBoard(prev => {
                        const newBoard = { ...prev };
                        newBoard.playerTurn = "goat";
                        newBoard.goats.killed++;
                        newBoard.board = JSON.parse(JSON.stringify(data.board));
                        newBoard.goats.onHand = data.goatsonHand
                        return newBoard;
                    })
                    //change game info history
                    setGameInfo(prev => {
                        const newGameInfo = { ...prev };
                        newGameInfo.history = data.history
                        // console.log("newGameInfo", newGameInfo)
                        return newGameInfo;
                    })
                    placeOpponentTiger(move.oldCoordinates.row, move.oldCoordinates.column, move.newCoordinates.row, move.newCoordinates.column)
                    killGoat(move.oldCoordinates.row, move.oldCoordinates.column, move.newCoordinates.row, move.newCoordinates.column)
                }

            }
        }


        )
    }, [socket])

    const placeOpponentTiger = (oldRow, oldColumn, newRow, newColumn) => {
        //if the player is tiger dont run this
        const oldpiece = document.querySelector(`.piece-${oldRow * 5 + oldColumn}`);
        if (oldpiece) {

            oldpiece.classList.remove(`piece-${oldRow * 5 + oldColumn}`)
            oldpiece.classList.add(`piece-${newRow * 5 + newColumn}`)
            oldpiece.style.top = `${canvassquaredimension.height * newRow - pieceTigerDimension.height / 2}px`
            oldpiece.style.left = `${canvassquaredimension.width * newColumn - pieceTigerDimension.width / 2}px`
        }

    }

    const placeOpponentGoat = (row, column) => {
        if (gameInfo.playAs === "goat") return;
        //if the goat is already placed then return
        const oldpiece = document.querySelector(`.piece-${row * 5 + column}`);
        if (oldpiece) return;
        console.log("placeOpponentGoat")
        //add goat img to board
        const container = document.querySelector('.container');
        const piece = document.createElement('img');
        piece.classList.add('piece');
        piece.classList.add(`piece-${row * 5 + column}`);
        piece.setAttribute('src', goat);
        piece.setAttribute('draggable', 'true');
        piece.setAttribute('width', pieceGoatDimension.width);
        piece.setAttribute('height', pieceGoatDimension.height);
        piece.style.top = `${canvassquaredimension.height * row - pieceGoatDimension.height / 2}px`
        piece.style.left = `${canvassquaredimension.width * column - pieceGoatDimension.width / 2}px`
        piece.style.position = 'absolute';
        piece.style.zIndex = 3;
        piece.style.cursor = 'pointer';

        piece.addEventListener('dragstart', (e) => {
            // console.log("drag start for goat test", row, column)
            const oldCoordinates = convertTo2d(parseInt(e.target.classList[1].split('-')[1]))
            setBoard(prevBoard => {
                const newBoard = { ...prevBoard };
                newBoard.selectedPosition = [oldCoordinates.row, oldCoordinates.column]
                return newBoard;
            })


        })
        container.appendChild(piece);



    }





    const DrawBoard = (canvassquaredimension) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // a1 - b1
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width, 0);
        ctx.lineTo(0, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.lineTo(0, canvassquaredimension.height);
        ctx.lineTo(0, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // b1 - c1
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width, 0);
        ctx.lineTo(canvassquaredimension.width * 2, 0);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, 0);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, 0);
        ctx.stroke();

        // c1 - d1
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, 0);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, 0);
        ctx.lineTo(canvassquaredimension.width * 3, 0);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // d1 - e1
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 3, 0);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 4, 0);
        ctx.lineTo(canvassquaredimension.width * 3, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 4, 0);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 4, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // a2 - b2
        ctx.beginPath();
        ctx.moveTo(0, canvassquaredimension.height);
        ctx.lineTo(0, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.lineTo(0, canvassquaredimension.height);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 2);
        ctx.lineTo(0, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.stroke();

        // b2 - c2
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height);
        ctx.fillStyle = '#B15653';
        ctx.fill();
        ctx.stroke();

        // c2 - d2
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.fillStyle = '#B15653';
        ctx.fill();
        ctx.stroke();

        // d2 - e2
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // a3 - b3
        ctx.beginPath();
        ctx.moveTo(0, canvassquaredimension.height * 2);
        ctx.lineTo(0, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.lineTo(0, canvassquaredimension.height * 2);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.lineTo(0, canvassquaredimension.height * 2);
        ctx.stroke();

        // b3 - c3
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 2);
        ctx.fillStyle = '#B15653';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.stroke();

        // c3 - d3
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.fillStyle = '#B15653';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 2);
        ctx.stroke();

        // d3 - e3
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 3, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 4, canvassquaredimension.height * 2);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height * 2);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // a4 - b4
        ctx.beginPath();
        ctx.moveTo(0, canvassquaredimension.height * 3);
        ctx.lineTo(0, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.lineTo(0, canvassquaredimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 4);
        ctx.lineTo(0, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // b4 - c4
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width, canvassquaredimension.height * 3);
        ctx.stroke();

        // c4 - d4
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 2, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 3);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width * 2, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // d4 - e4
        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height * 3);
        ctx.lineTo(canvassquaredimension.width * 4, canvassquaredimension.height * 4);
        ctx.lineTo(canvassquaredimension.width * 3, canvassquaredimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

    }

    const PlaceInitialTigers = (canvassquaredimension, pieceTigerDimension) => {
        for (let i = 0; i <= 3; i++) {
            // add piece to board
            const container = document.querySelector('.container');
            const piece = document.createElement('img');
            piece.classList.add('piece');
            piece.classList.add(`piece-${board.tigers.position[i][0] * 5 + board.tigers.position[i][1]}`);
            piece.setAttribute('src', tiger);
            piece.setAttribute('draggable', 'true');
            piece.setAttribute('width', pieceTigerDimension.width);
            piece.setAttribute('height', pieceTigerDimension.height);
            piece.style.top = `${canvassquaredimension.height * board.tigers.position[i][0] - pieceTigerDimension.height / 2}px`
            piece.style.left = `${canvassquaredimension.width * board.tigers.position[i][1] - pieceTigerDimension.width / 2}px`
            piece.style.position = 'absolute';
            piece.style.cursor = 'pointer';
            piece.style.zIndex = 3;
            piece.addEventListener('dragstart', (e) => {
                // console.log("drag start for tiger test")
                const oldCoordinates = convertTo2d(parseInt(e.target.classList[1].split('-')[1]))
                // console.log("oldCoordinates", oldCoordinates)
                setBoard(prevBoard => {
                    const newBoard = { ...prevBoard };
                    newBoard.selectedPosition = [oldCoordinates.row, oldCoordinates.column]
                    return newBoard;
                })



            })

            piece.addEventListener('dragend', (e) => {
                console.log('drag end');

            })




            container.appendChild(piece);
        }
    }


    const AddEventToTiles = (board) => {
        //make tiles clickable for goats
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            tile.addEventListener('click', () => {
                setClicked(index)
                // console.log("click test", board)
            })
        }
        )
    }

    const MakeTilesDropable = () => {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            tile.addEventListener('dragover', (e) => {
                e.preventDefault();

            })

            tile.addEventListener('drop', () => {
                const { row, column } = convertTo2d(index);
                setDropped([row, column])
            })
        })
    }





    useEffect(() => {
        DrawBoard(canvassquaredimension)
        PlaceInitialTigers(canvassquaredimension, pieceTigerDimension)
        AddEventToTiles(board)
        MakeTilesDropable()
    }, [])

    useEffect(() => {
        if (clicked == -1) return;

        //add goat to clicked index

        const { row, column } = convertTo2d(clicked)

        if (board.goats.onHand > 0 && board.board[row][column] === null && board.playerTurn === "goat") {
            //change board state
            setBoard(prevBoard => {
                const newBoard = { ...prevBoard };
                newBoard.playerTurn = 'tiger';
                newBoard.board[row][column] = 1;
                newBoard.goats.onHand = newBoard.goats.onHand - 1;
                const trappedTigerPosition = trappedTigers(newBoard)
                newBoard.tigers.trapped = trappedTigerPosition
                // console.log("newBoard.tigers.trapped from placement", newBoard.tigers.trapped)
                // console.log("newBoard", newBoard)
                return newBoard;
            })


            //add goat img to board
            const container = document.querySelector('.container');
            const piece = document.createElement('img');
            piece.classList.add('piece');
            piece.classList.add(`piece-${row * 5 + column}`);
            piece.setAttribute('src', goat);
            piece.setAttribute('draggable', 'true');
            piece.setAttribute('width', pieceGoatDimension.width);
            piece.setAttribute('height', pieceGoatDimension.height);
            piece.style.top = `${canvassquaredimension.height * row - pieceGoatDimension.height / 2}px`
            piece.style.left = `${canvassquaredimension.width * column - pieceGoatDimension.width / 2}px`
            piece.style.position = 'absolute';
            piece.style.zIndex = 3;
            piece.style.cursor = 'pointer';

            piece.addEventListener('dragstart', (e) => {
                // console.log("drag start for goat test", row, column)
                const oldCoordinates = convertTo2d(parseInt(e.target.classList[1].split('-')[1]))
                setBoard(prevBoard => {
                    const newBoard = { ...prevBoard };
                    newBoard.selectedPosition = [oldCoordinates.row, oldCoordinates.column]
                    return newBoard;
                })


            })
            container.appendChild(piece);
            const historyPiece = CalculateMove(null, { row, column }, false, true)
            setGameInfo(prevGameInfo => {
                const newGameInfo = { ...prevGameInfo };
                const historySingleStepArray = [historyPiece]
                newGameInfo.history.push(historySingleStepArray)
                return newGameInfo;
            })


        }
        setClicked(-1)
    }, [clicked])

    useEffect(() => {
        const row = dropped[0]
        const column = dropped[1]

        const oldCoordinates = {
            row: board.selectedPosition[0] ? board.selectedPosition[0] : 0,
            column: board.selectedPosition[1] ? board.selectedPosition[1] : 0
        }
        // console.log("oldCoordinates ", oldCoordinates)
        // console.log("piece selected",board.board[oldCoordinates.row][oldCoordinates.column])
        // console.log("turn", board.playerTurn)

        if (board.board[oldCoordinates.row][oldCoordinates.column] == 1 && board.playerTurn != "goat") {
            console.log("tiger turn ma goat drag garna khojeko")
            return;
        }
        if (board.board[oldCoordinates.row][oldCoordinates.column] == 0 && board.playerTurn != "tiger") {
            console.log("goat turn ma tiger drag garna khojeko")
            return;
        }

        // console.log('drop')
        // console.log(row, column, ": drop huni thau")
        // console.log("selected position", board.selectedPosition)
        // console.log("next valid moves", board.nextValidMoves)
        // console.log(board.nextValidMoves.includes([row, column]), "testing testing")
        const includedInValidMoves = board.nextValidMoves.some(item => JSON.stringify(item) === JSON.stringify([row, column]))
        if (includedInValidMoves) {
            const piece = document.querySelector(`.piece-${board.selectedPosition[0] * 5 + board.selectedPosition[1]}`);
            if (piece) {
                piece.classList.remove(`piece-${board.selectedPosition[0] * 5 + board.selectedPosition[1]}`);
                piece.classList.add(`piece-${row * 5 + column}`)
                piece.style.top = `${canvassquaredimension.height * row - pieceGoatDimension.height / 2}px`;
                piece.style.left = `${canvassquaredimension.width * column - pieceGoatDimension.width / 2}px`;
            }


            // change board
            if (board.playerTurn == 'goat') {
                // board.board[oldCoordinates.row][oldCoordinates.column] = null
                // board.board[row][column] = 1

                //add history to gameInfo
                const historyPiece = CalculateMove(oldCoordinates, { row, column })
                setGameInfo(prevGameInfo => {
                    const newGameInfo = { ...prevGameInfo };
                    const historySingleStepArray = [historyPiece]
                    newGameInfo.history.push(historySingleStepArray)
                    return newGameInfo;
                })
                setBoard(prevBoard => {
                    const newBoard = { ...prevBoard };
                    newBoard.board[oldCoordinates.row][oldCoordinates.column] = null
                    newBoard.board[row][column] = 1
                    newBoard.playerTurn = 'tiger'
                    return newBoard;
                })

                let newTrappedTigerPosition = trappedTigers(board)
                // board.tigers.trapped = newTrappedTigerPosition
                setBoard(prevBoard => {
                    const newBoard = { ...prevBoard };
                    newBoard.tigers.trapped = newTrappedTigerPosition
                    // console.log("newBoard.tigers.trapped", newBoard.tigers.trapped)
                    // if (gameOver(newBoard) === 1) {
                    //     alert("Goat wins")
                    // }
                    return newBoard;
                });

                // board.playerTurn = 'tiger'
            } else if (board.playerTurn == 'tiger') {
                // board.board[oldCoordinates.row][oldCoordinates.column] = null
                // board.board[row][column] = 0
                // board.tigers.position = newArr

                let newArr = board.tigers.position.filter(coordinate => {
                    return coordinate == [oldCoordinates.row, oldCoordinates.column] ? [row, column] : coordinate
                })
                setBoard(prevBoard => {
                    const newBoard = { ...prevBoard };
                    newBoard.board[oldCoordinates.row][oldCoordinates.column] = null
                    newBoard.board[row][column] = 0
                    newBoard.playerTurn = 'goat'
                    newBoard.tigers.position = newArr
                    return newBoard;
                })
                // if (gameOver(board) === 0) {
                //     alert("Tiger wins")
                // }

                //kill ko logic
                if (Math.abs(oldCoordinates.row - row) > 1 || Math.abs(oldCoordinates.column - column) > 1) {
                    let killedGoatRow = (oldCoordinates.row + row) / 2;
                    let killedGoatColumn = (oldCoordinates.column + column) / 2;
                    // board.board[killedGoatRow][killedGoatColumn] = null;
                    // board.goats.killed += 1;
                    setBoard(prevBoard => {
                        const newBoard = { ...prevBoard };
                        newBoard.board[killedGoatRow][killedGoatColumn] = null
                        newBoard.goats.killed += 1
                        return newBoard;
                    })

                    // if (gameOver(board) === 0) {
                    //     alert("Tiger wins")
                    // }

                    const killedGoatIndex = convertTo1d(killedGoatRow, killedGoatColumn);
                    const killedGoatPiece = document.querySelector(`.piece-${killedGoatIndex}`);
                    if (killedGoatPiece)
                        killedGoatPiece.remove();
                    // console.log(board.goats.killed)
                    // console.log("killed goat", killedGoatRow, killedGoatColumn)

                    //add history to gameInfo
                    const historyPiece = CalculateMove(oldCoordinates, { row, column }, true)
                    setGameInfo(prevGameInfo => {
                        const newGameInfo = { ...prevGameInfo };

                        newGameInfo.history[gameInfo.history.length - 1].push(historyPiece)
                        return newGameInfo;
                    }
                    )
                }
                else {
                    //add history to gameInfo
                    const historyPiece = CalculateMove(oldCoordinates, { row, column })
                    setGameInfo(prevGameInfo => {
                        const newGameInfo = { ...prevGameInfo };
                        newGameInfo.history[gameInfo.history.length - 1].push(historyPiece)
                        return newGameInfo;
                    }
                    )
                }


                // board.playerTurn = 'goat'
                setBoard(prevBoard => {
                    const newBoard = { ...prevBoard };
                    newBoard.playerTurn = 'goat'
                    return newBoard;
                })
            }
            // console.log(board.board)
        }
    }, [dropped, board.board])

    useEffect(() => {
        // console.log("board.selectedPosition", board.selectedPosition)
        //find valid moves
        const newValidMoves = validMove(board)
        setBoard(prevBoard => {
            const newBoard = { ...prevBoard };
            newBoard.nextValidMoves = newValidMoves
            return newBoard;
        });
    }, [board.selectedPosition])

    useEffect(() => {
        const newTrappedTigers = trappedTigers(board)


        setBoard(prevBoard => {
            const newBoard = { ...prevBoard };
            newBoard.tigers.trapped = newTrappedTigers
            return newBoard;
        });
    }, [board.board])

    useEffect(() => {
        // console.log("Turn changed")
        const gameStatus = gameOver(board)
        // console.log("gameStatus", gameStatus)
        if (gameStatus === 0) {
            alert("Tiger wins")
        }
        else if (gameStatus === 1) {
            alert("Goat wins")
        }
    }, [board.playerTurn])


    return (
        <Container >
            <InnerContainer className="container" canvasdimension={canvasdimension}>


                <Background canvasdimension={canvasdimension} >

                    <canvas id="canvas-board" ref={canvasRef} width={canvasdimension.width} height={canvasdimension.height} />

                    <TopLeft className="tile" trianlgedimension={trianlgedimension} />
                    <Triangle row="0" col="1" className="tile" trianlgedimension={trianlgedimension} canvassquaredimension={canvassquaredimension} />
                    <Triangle row="0" col="2" className="tile" trianlgedimension={trianlgedimension} canvassquaredimension={canvassquaredimension} />
                    <Triangle row="0" col="3" className="tile" trianlgedimension={trianlgedimension} canvassquaredimension={canvassquaredimension} />
                    <TopRight className="tile" trianlgedimension={trianlgedimension} />

                    <Square row="1" col="0" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="1" col="1" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="1" col="2" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="1" col="3" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="1" col="4" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />

                    <Square row="2" col="0" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="2" col="1" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="2" col="2" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="2" col="3" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="2" col="4" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />

                    <Square row="3" col="0" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="3" col="1" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="3" col="2" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="3" col="3" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="3" col="4" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />

                    <BottomLeft className="tile" trianlgedimension={trianlgedimension} />
                    <Square row="4" col="1" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="4" col="2" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <Square row="4" col="3" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                    <BottomRight className="tile" trianlgedimension={trianlgedimension} />



                </Background>
            </InnerContainer>
        </Container>
    )
}

export default BoardComponent