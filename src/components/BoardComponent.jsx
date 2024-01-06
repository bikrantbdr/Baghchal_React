import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { directions, directionsWithDiagonal } from '../utils/utility_data'
import triangle from '../assets/triangle.svg'
import square from '../assets/square.svg'
import tiger from '../assets/tiger.png'
// import "../utils/tileStyling.css"

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
    width: 50,
    height: 50
}

const pieceTigerDimension = {
    width: 50,
    height: 50
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
    width: ${props =>  props.trianlgedimension.squareTileWidth}px;
    height: ${props =>  props.trianlgedimension.squareTileHeight}px;

    left:${props => props.canvassquaredimension.width * props.col - props.trianlgedimension.squareTileWidth/2 }px ;
    top:${props => props.canvassquaredimension.height * props.row - props.trianlgedimension.squareTileHeight/2 }px;
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

const BoardComponent = ({board,SetBoard,gameInfo,setGameInfo}) => {

    const canvasRef = useRef(null);



    const DrawBoard = ( canvassquaredimension) => {
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
    
    const PlaceInitialTigers = (canvassquaredimension,pieceTigerDimension) => {
        for (let i = 0; i <= 3; i++) {
            // add piece to board
            const container = document.querySelector('.container');
            const piece = document.createElement('img');
            piece.classList.add('piece');
            piece.classList.add(`piece-${board.tigers.position[i][0] * 5 + board.tigers.position[i][1]}`);
            console.log(`piece-${board.tigers.position[i][0] * 5 + board.tigers.position[i][1]}`);
            piece.setAttribute('src', tiger);
            piece.setAttribute('draggable', 'true');
            piece.setAttribute('width', pieceTigerDimension.width);
            piece.setAttribute('height', pieceTigerDimension.height);
            piece.style.top = `${canvassquaredimension.height * board.tigers.position[i][0] - pieceTigerDimension.height /2}px`
            console.log(canvassquaredimension.height, board.tigers.position[i][0],pieceTigerDimension.height)
            piece.style.left = `${canvassquaredimension.width * board.tigers.position[i][1] - pieceTigerDimension.width / 2}px`
            piece.style.position = 'absolute';
            piece.style.zIndex = '3';
        
        
            container.appendChild(piece);
        }
    }

    useEffect(() => {
        DrawBoard(canvassquaredimension)
        PlaceInitialTigers(canvassquaredimension,pieceTigerDimension)
    }, [])


    return (
        <Container >
            <InnerContainer className="container" canvasdimension={canvasdimension}>

            
            <Background canvasdimension={canvasdimension} >

                <canvas id="canvas-board" ref={canvasRef} width={canvasdimension.width} height={canvasdimension.height} />

                <TopLeft className="tile" trianlgedimension={trianlgedimension}/>
                <Triangle row="0" col="1" className="tile" trianlgedimension={trianlgedimension} canvassquaredimension={canvassquaredimension} />
                <Triangle row="0" col="2" className="tile" trianlgedimension={trianlgedimension} canvassquaredimension={canvassquaredimension} />
                <Triangle row="0" col="3" className="tile" trianlgedimension={trianlgedimension} canvassquaredimension={canvassquaredimension} />
                <TopRight className="tile" trianlgedimension={trianlgedimension}/>

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

                <BottomLeft className="tile" trianlgedimension={trianlgedimension}/>
                <Square row="4" col="1" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                <Square row="4" col="2" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                <Square row="4" col="3" className="tile" canvassquaredimension={canvassquaredimension} trianlgedimension={trianlgedimension} />
                <BottomRight className="tile" trianlgedimension={trianlgedimension}/>



            </Background>
            </InnerContainer>
        </Container>
    )
}

export default BoardComponent