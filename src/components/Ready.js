
function Ready({len,dispatch}) {
      return (
            <div>
                <h2>Welcone to The react Quiz</h2>
                <h3>{len} question to test your react mastery</h3>  
                <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Let's Start</button>
            </div>
      )
}

export default Ready
