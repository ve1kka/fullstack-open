const Persons = ({newFilter, persons}) => {
    return (
        <>
        {newFilter
            ? persons.filter((p) => p.name.includes(newFilter))
                     .map((p) => (
                      <p key={p.id}>{p.name} {p.phonenumber}</p>
                     ))
            : persons.map((p) => (
                <p key={p.id}>{p.name} {p.phonenumber}</p> 
              ))}
        </>
    )
}

export default Persons