const Header = (props) => {
    return (<h1>{props.name}</h1>)
}

const Part = (props) => {
    return (<p>{props.name} {props.exercises}</p>)
}

const Content = (props) => {
    return (
        props.parts.map(c => <Part key={c.id} name={c.name} exercises={c.exercises}/>)
    )
}


const Total = (props) => {
    return (
        <p><b>total of {props.parts.map(c => c.exercises).reduce((total, curr) => { return total + curr })} exercises</b></p>
    )
}
  
const Course = (props) => {
    return(
        <div>
            {props.courses.map((course) =>
                <div>
                    <Header name={course.name}/>
                    <Content parts={course.parts}/>
                    <Total parts={course.parts}/>
                </div>
            )}
        </div>
    )
}

export default Course