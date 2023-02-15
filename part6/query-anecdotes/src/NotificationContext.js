import { createContext, useReducer } from "react"

const notificationReducer = (_state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'NULL':
      return null
    default:
      return 
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return(
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext