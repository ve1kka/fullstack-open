const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <div>
            filter: <input value={newFilter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter