 import { useEffect, useReducer } from "react"

 import Header from "./Header.js"
 import Loader from "./Loader"
 import Error from "./Error.js"
 import Main from "./Main.js"
 import Ready from "./Ready.js"
 import Question from "./Question.js"
 import NextButton from "./NextButton.js"
 import Progres from "./Progres.js"
import Finish from "./Finish.js"



 function reduce(state,action){

 switch(action.type){
 case 'dataReceived':
  return {...state,questions:action.payload,
    status:"ready"
         
  }
  case 'dataFailed':
    return{
    ...state, status:"error"
    }

  case "start"  :
    return{
      ...state,status:'active'
    }
    case"newAnswer" :
    const ques=state.questions.at(state.index)
    return{
      ...state, 
      answer:action.payload,
      points: action.payload ===ques.correctOption? state.points+ques.points :state.points
    }
    case"nextQuestion":
    return{
      ...state, index:state.index+1,answer:null
    }
    case"finish":
    return{
      ...state, status:"finished" ,highscore:state.points>state.highscore? state.points: state.highscore
    }
    case"restart":
    return{
      ...state ,status:"ready",points:0 ,index:0,answer:null
    }
     
    
 default:
   throw new Error('Action unknown')
  }
  
 }


 const initialstate={
   questions:[],
   // 'loading','error',"active",'finished','newAnswer',"nextQuestion"
   status:'loading' ,
   index:0,
   answer:null,
   points:0,
   highscore:0

 }
 export default function App(){

  const[{questions,status,index,answer,points,highscore},dispatch]=useReducer(reduce,initialstate)
  const numQuestion=questions.length

  const maxPossiblePoints=questions.reduce((prev,current)=>prev+current.points,0)
   useEffect(function(){ 

    // async function question(){

    // const res= await fetch('http://localhost:9000/questions')
    // const data=await res.json()

    // dispatch({type:'dataReceived',payload:data})
    
    // }
    // question()

     fetch("http://localhost:9000/questions")
     .then(res=>res.json())
     .then(data=>dispatch({type:"dataReceived",payload : data}))
     .catch(err=>dispatch({type:"dataFailed"}))



   },[])

  return<div className="app">
  <Header/> 
  <Main>
    {status==="loading"&&<Loader/>}
    {status==="error"&&<Error/>}
    {status==="ready"&&<Ready 
    len={numQuestion} 
    dispatch={dispatch}/>
    }
    {status ==='active'&& 
    <>
    <Progres index={index} questions={questions}points={points} answer={answer} maxPossiblePoints={maxPossiblePoints} numQuestion={numQuestion}/>
    <Question 
    question={questions[index]} 
    index ={index} 
    answer={answer} 

    dispatch={dispatch}/>
    <NextButton  index={index} numQuestions={numQuestion} dispatch={dispatch}answer={answer}/>
    </>}
     {status==="finished" && <Finish dispatch={dispatch} highscore={highscore} points={points} maxPossiblePoints={maxPossiblePoints}/>}
  </Main>


  </div>

}