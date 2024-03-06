import { useEffect } from "react"



function Timer({dispatch,remainingTime}) {

      const minutes=Math.floor(remainingTime/60)
      const seconds= remainingTime%60
      useEffect(function(){
           const id= setInterval(() => {
              dispatch({type:"tick_tock"})
            
            },1000);

            return ()=>clearInterval(id)
      
      },[dispatch])
      
     
      return (
          <p className="timer">{minutes}:{seconds} {remainingTime}</p>
      )
}

export default Timer
