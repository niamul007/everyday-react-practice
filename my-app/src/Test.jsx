import React from "react"

export default function Test() {
  const [message,setmessage] = React.useState(["c"])
  
  return (
    <h1>{message.length > 0 ? `You have ${message.length} unread ${message.length ===1 ?"meesage":"meesages"}` :"You're all caught up!"}</h1>
  )
}