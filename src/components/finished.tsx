function Finished({points,maxPoint}:any){
    const percentage = points / maxPoint * 100
    return(
        <>
            <p className="result">
                you scored <strong>{points}</strong> out of {maxPoint}({Math.ceil(percentage)}%)
            </p>
        </>
    )
}





export default Finished;