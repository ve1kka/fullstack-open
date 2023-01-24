const Persons = ({newFilter, persons, deletePerson}) => {
    return (
        <>
        {newFilter
            ? persons.filter((p) => p.name.toLowerCase().includes(newFilter.toLowerCase()))
                     .map((p) => (
                    <div>
                      <p key={p.id}>{p.name} {p.number} <button onClick={() => deletePerson(p.id)}>delete</button></p>
                    </div>
                     ))
            : persons.map((p) => (
                <div>
                    <p key={p.id}>{p.name} {p.number} <button onClick={() => deletePerson(p.id)}>delete</button></p>
                </div>
              ))}
        </>
    )
}

export default Persons