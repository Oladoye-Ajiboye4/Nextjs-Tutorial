import React from 'react'

const page = async () => {

    const response = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    console.log(data)
  return (
    <div>page</div>
  )
}

export default page