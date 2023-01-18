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


  
  
  
const App = () => {
    const courses = [
    {
        name: 'Half Stack application development',
        id: 1,
        parts: [
        {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
        },
        {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
        },
        {
            name: 'State of a component',
            exercises: 14,
            id: 3
        }
        ]
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

    return (
        <div>
        <Course courses={courses} />
        </div>
    )
}
  
  export default App