function Finish({highscore,points,maxPossiblePoints,dispatch}) {
      const percenttage=points/maxPossiblePoints*100
      return (
            <>
             <p className="result">
                 Your scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percenttage)}%)
            </p>
            <p className="highscore">Highscore :{highscore} points</p>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart quiz</button>
            
            </>
           
      )
}

export default Finish
