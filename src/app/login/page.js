'use client'
import { Web3Context } from '@/context/Web3Context'
import React, { useContext } from 'react'

const Login = () => {
    const {test} = useContext(Web3Context)
    console.log("test", test)
  return (
    <div>

    </div>
  )
}

export default Login