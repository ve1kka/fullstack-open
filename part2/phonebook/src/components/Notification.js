const Notification = ({ style, text, name }) => {
    return(
        <div className={style}>
            {text} {name}
        </div>
    )
}

export default Notification