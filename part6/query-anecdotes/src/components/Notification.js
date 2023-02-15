import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    notification ? <div style={style}>{notification}</div> : null
  )
}

export default Notification