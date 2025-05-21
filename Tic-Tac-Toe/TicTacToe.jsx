import React,{useState,useEffect} from "react"
import Gameresult from "./Gameresult";
import Board from "./Board"
import Playagain from "./Playagain";
function TicTacToe(){
    const PLAYER_X="X";
    const PLAYER_Y="O";
    const [tiles,settiles]=useState(Array(9).fill(null))
    const [playerTurn,setplayerTurn]=useState(PLAYER_X);
    const [strikeClass,setstrikeclass]=useState();
    const[gameState,setgameState]=useState();
    const [reset,setReset]=useState(0)
    useEffect(()=>{
        checkWinner(tiles,setstrikeclass);
    },[tiles])
    const winningCombinations = [
        // Rows
        { combo: [0, 1, 2], strikeClass: "strike-row-1" },
        { combo: [3, 4, 5], strikeClass: "strike-row-2" },
        { combo: [6, 7, 8], strikeClass: "strike-row-3" },
      
        // Columns
        { combo: [0, 3, 6], strikeClass: "strike-column-1" },
        { combo: [1, 4, 7], strikeClass: "strike-column-2" },
        { combo: [2, 5, 8], strikeClass: "strike-column-3" },
      
        // Diagonals
        { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
        { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
      ];
      
    function checkWinner(tiles,setstrikeclass) {
        for( const {combo,strikeClass}of winningCombinations){
            const tileValue1=tiles[combo[0]];
            const tileValue2=tiles[combo[1]];
            const tileValue3=tiles[combo[2]];
            if(tileValue1!== null &&
                tileValue1===tileValue2 &&
                tileValue2===tileValue3
            ){
                setstrikeclass(strikeClass);
                if(tileValue1==="X"){
                    setgameState("X");
                    setReset(1);
                }
                else{
                    setgameState("O");
                    setReset(1)
                }
                return;
            }
        }
        const drawSate=tiles.every((tile)=>tile != null);
        if(drawSate){
            setgameState("draw");
            setReset(1);
        }
      }
      
    const handleclick=(index)=>{
        if(tiles[index]!=null){
            return;
        }
        settiles(t => {
            const updated = [...t];   // make a shallow copy
            updated[index] = playerTurn; // update the desired index
            return updated;
          });
        if(playerTurn==PLAYER_X){
            setplayerTurn(PLAYER_Y);
        }
        else{
            setplayerTurn(PLAYER_X);
        }
    }
    function handleReset(){
        settiles(t => {
            const updated = [...t];   // make a shallow copy
            updated.fill(null)
            settiles(updated)
          });
        setstrikeclass();
        setgameState();
        setReset(0);
    }
    return(
        <div>
            <h1>Tic Tac Toe</h1>
            <Board strikeClass={strikeClass} playerTurn={playerTurn} ontileclick={handleclick} tiles={tiles}/>
            <Gameresult gameState={gameState}/>
            <Playagain onClick={handleReset} reset={reset}/>
        </div>
    )
}
export default TicTacToe