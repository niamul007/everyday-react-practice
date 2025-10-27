import React from 'react'
import { dog } from './data'
import  DogCard  from './DogCard'
export function App(){
  const newData = dog.map((item)=>{
    return(
      <DogCard
      key = {item.id}
      {...item}
      />
    )
  })
  return (
    <>
    {newData}
    </>
  )
}

export default App;