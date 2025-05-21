import Tile from "./Tile"
import Strike from "./Strike"
function Board({tiles,ontileclick,playerTurn,strikeClass}){
    return(
        <div className="board">
            <Tile 
            playerTurn={playerTurn}
            onClick={()=>{ontileclick(0)}}
            value={tiles[0]} 
            className='right-border bottom-border'
            />
            <Tile  playerTurn={playerTurn} onClick={()=>{ontileclick(1)}}  value={tiles[1]} className='right-border bottom-border'/>
            <Tile  playerTurn={playerTurn} onClick={()=>{ontileclick(2)}} value={tiles[2]} className='bottom-border'/>
            <Tile  playerTurn={playerTurn} onClick={()=>{ontileclick(3)}}  value={tiles[3]} className='right-border bottom-border'/>
            <Tile   playerTurn={playerTurn} onClick={()=>{ontileclick(4)}} value={tiles[4]} className='right-border bottom-border'/>
            <Tile  playerTurn={playerTurn} onClick={()=>{ontileclick(5)}} value={tiles[5]} className='bottom-border'/>
            <Tile  playerTurn={playerTurn} onClick={()=>{ontileclick(6)}}  value={tiles[6]} className='right-border'/>
            <Tile  playerTurn={playerTurn} onClick={()=>{ontileclick(7)}}  value={tiles[7]} className='right-border'/>
            <Tile  playerTurn={playerTurn} onClick={()=>{ontileclick(8)}} value={tiles[8]}/>
            <Strike strikeClass={strikeClass}/>
        </div>
    )
}
export default Board