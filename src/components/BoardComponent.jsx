import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { directions, directionsWithDiagonal } from '../utils/utility_data'
import triangle from '../assets/triangle.svg'
import square from '../assets/square.svg'
// import "../utils/tileStyling.css"

const canvasDimension = {
    width: 510,
    height: 510
}

const canvasSquareDimension = {
    width: canvasDimension.width / 4,
    height: canvasDimension.height / 4
}

const trianlgeDimension = {
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
const Background = styled.div`
    height: ${props => props.canvasDimension.height};
    width: ${props => props.canvasDimension.width};
    background-color: #fff;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    overflow: hidden;
    `

const TopLeft = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${triangle});
    width: ${props => props.trianlgeDimension.triangleTileWidth}px;
    height: ${props => props.trianlgeDimension.triangleTileHeight}px;
    
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
    width: ${props => props.trianlgeDimension.triangleTileWidth}px;
    height: ${props => props.trianlgeDimension.triangleTileHeight}px;

    left:${props => props.canvasSquareDimension.width * props.col - props.trianlgeDimension.triangleTileWidth / 2}px ;
    top:${props => props.canvasSquareDimension.height * props.row}px;
`
const TopRight = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${triangle});
    width: ${props => props.trianlgeDimension.triangleTileWidth}px;
    height: ${props => props.trianlgeDimension.triangleTileHeight}px;
    
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
    width: ${props =>  props.trianlgeDimension.squareTileWidth}px;
    height: ${props =>  props.trianlgeDimension.squareTileHeight}px;

    left:${props => props.canvasSquareDimension.width * props.col - props.trianlgeDimension.squareTileWidth/2 }px ;
    top:${props => props.canvasSquareDimension.height * props.row - props.trianlgeDimension.squareTileHeight/2 }px;
`
const BottomLeft = styled.div`
    cursor: pointer;
    position: absolute;
    background-image: url(${triangle});
    width: ${props => props.trianlgeDimension.triangleTileWidth}px;
    height: ${props => props.trianlgeDimension.triangleTileHeight}px;
    
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
    width: ${props => props.trianlgeDimension.triangleTileWidth}px;
    height: ${props => props.trianlgeDimension.triangleTileHeight}px;
    
    /* transform-origin: top center; */
    transform: rotate(135deg);
    z-index: 2;
    right:-6px;
    bottom: -2px;

`

const BoardComponent = () => {

    const canvasRef = useRef(null);



    const DrawBoard = (canvasDimension, canvasSquareDimension) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // a1 - b1
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width, 0);
        ctx.lineTo(0, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.lineTo(0, canvasSquareDimension.height);
        ctx.lineTo(0, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // b1 - c1
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width, 0);
        ctx.lineTo(canvasSquareDimension.width * 2, 0);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, 0);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, 0);
        ctx.stroke();

        // c1 - d1
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, 0);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, 0);
        ctx.lineTo(canvasSquareDimension.width * 3, 0);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // d1 - e1
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 3, 0);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 4, 0);
        ctx.lineTo(canvasSquareDimension.width * 3, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 4, 0);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 4, 0);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // a2 - b2
        ctx.beginPath();
        ctx.moveTo(0, canvasSquareDimension.height);
        ctx.lineTo(0, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.lineTo(0, canvasSquareDimension.height);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 2);
        ctx.lineTo(0, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.stroke();

        // b2 - c2
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height);
        ctx.fillStyle = '#B15653';
        ctx.fill();
        ctx.stroke();

        // c2 - d2
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.fillStyle = '#B15653';
        ctx.fill();
        ctx.stroke();

        // d2 - e2
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // a3 - b3
        ctx.beginPath();
        ctx.moveTo(0, canvasSquareDimension.height * 2);
        ctx.lineTo(0, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.lineTo(0, canvasSquareDimension.height * 2);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.lineTo(0, canvasSquareDimension.height * 2);
        ctx.stroke();

        // b3 - c3
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 2);
        ctx.fillStyle = '#B15653';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.stroke();

        // c3 - d3
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.fillStyle = '#B15653';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 2);
        ctx.stroke();

        // d3 - e3
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 2);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 2);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // a4 - b4
        ctx.beginPath();
        ctx.moveTo(0, canvasSquareDimension.height * 3);
        ctx.lineTo(0, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.lineTo(0, canvasSquareDimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 4);
        ctx.lineTo(0, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // b4 - c4
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width, canvasSquareDimension.height * 3);
        ctx.stroke();

        // c4 - d4
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 3);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width * 2, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        // d4 - e4
        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 3);
        ctx.lineTo(canvasSquareDimension.width * 4, canvasSquareDimension.height * 4);
        ctx.lineTo(canvasSquareDimension.width * 3, canvasSquareDimension.height * 3);
        ctx.fillStyle = '#757592';
        ctx.fill();
        ctx.stroke();

    }

    useEffect(() => {
        DrawBoard(canvasDimension, canvasSquareDimension)
    }, [])


    return (
        <Container>
            <Background canvasDimension={canvasDimension}>

                <canvas id="canvas-board" ref={canvasRef} width={canvasDimension.width} height={canvasDimension.height} />

                <TopLeft className="tile" trianlgeDimension={trianlgeDimension}/>
                <Triangle row="0" col="1" className="tile" trianlgeDimension={trianlgeDimension} canvasSquareDimension={canvasSquareDimension} />
                <Triangle row="0" col="2" className="tile" trianlgeDimension={trianlgeDimension} canvasSquareDimension={canvasSquareDimension} />
                <Triangle row="0" col="3" className="tile" trianlgeDimension={trianlgeDimension} canvasSquareDimension={canvasSquareDimension} />
                <TopRight className="tile" trianlgeDimension={trianlgeDimension}/>

                <Square row="1" col="0" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="1" col="1" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="1" col="2" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="1" col="3" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="1" col="4" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />

                <Square row="2" col="0" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="2" col="1" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="2" col="2" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="2" col="3" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="2" col="4" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />

                <Square row="3" col="0" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="3" col="1" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="3" col="2" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="3" col="3" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="3" col="4" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />

                <BottomLeft className="tile" trianlgeDimension={trianlgeDimension}/>
                <Square row="4" col="1" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="4" col="2" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <Square row="4" col="3" className="tile" canvasSquareDimension={canvasSquareDimension} trianlgeDimension={trianlgeDimension} />
                <BottomRight className="tile" trianlgeDimension={trianlgeDimension}/>



            </Background>
        </Container>
    )
}

export default BoardComponent