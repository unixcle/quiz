function Finished({points,maxPoints}:any){
    const percentage = points / maxPoints * 100
    return(
        <>
            <p className="result">
                you scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
            </p>
        </>
    )
}





export default Finished;