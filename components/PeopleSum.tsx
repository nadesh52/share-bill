'use client'
import { usePeople } from '@/context/PeopleContext'
import React from 'react'


const PeopleSum = () => {
    const {people} = usePeople();
  return (
    <div>PeopleSum
        <div>
            {JSON.stringify(people)}
        </div>
    </div>
  )
}

export default PeopleSum