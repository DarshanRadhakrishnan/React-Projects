function Gameresult({ gameState }) {
    switch (gameState) {
      case "O":
        return <div className="game-over">O Wins</div>;
      case "X":
        return <div className="game-over">X Wins</div>;
      case "draw":
        return <div className="game-over">Draw</div>;
      default:
        return <></>;
    }
  }
  
export default Gameresult