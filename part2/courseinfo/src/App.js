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
  
  const Course = (props) => {
    return(
      <div>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts}/>
      </div>
    )
  }
  
  
  
  const App = () => {
    const course = {
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
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }
  
  export default App