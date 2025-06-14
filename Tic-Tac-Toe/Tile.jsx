function Tile({className,value,onClick,playerTurn}){
    let hoverclass=null;
    if(value==null && playerTurn !=null){
        hoverclass=`${playerTurn.toLowerCase()}-hover`;
    }

    return(
        <div onClick={onClick} className={`tile ${className} ${hoverclass}`}>
            <p>{value}</p>
        </div>
    )
}
export default Tile