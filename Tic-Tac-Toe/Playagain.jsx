
function Playagain({onClick,reset}){
    switch(reset){
        case 1:
            return(
                <div onClick={onClick} className="reset-button">
                    Play Again
                </div>
            
            )
        default:
            return(<div></div>)
    
    }
}
export default Playagain