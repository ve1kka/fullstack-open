const Personform = ({handleSubmit, newName, handleNameChange, newNum, handlePhonenumberChange}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNum} onChange={handlePhonenumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

export default Personform