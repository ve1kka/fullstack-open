const Persons = ({newFilter, persons}) => {
    return (
        <>
        {newFilter
            ? persons.filter((p) => p.name.includes(newFilter))
                     .map((p) => (
                      <p key={p.id}>{p.name} {p.number}</p>
                     ))
            : persons.map((p) => (
                <p key={p.id}>{p.name} {p.number}</p> 
              ))}
        </>
    )
}

export default Persons