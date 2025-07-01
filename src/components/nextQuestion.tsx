

function NextQuestion({answer,dispatch,index,numQuestions}:any){
    if(answer===null)return;
    if(index < numQuestions - 1)return(
        <>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
        </>
    )
    else return <button className="btn btn-ui" onClick={()=>dispatch({type:"finish"})}>Finish</button>
}



export default NextQuestion;