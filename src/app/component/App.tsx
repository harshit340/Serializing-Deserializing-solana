"use client"

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

export default function App() {
  return (
    <div style={{display:"flex" , justifyContent:"space-between" }}>
      <span style={{fontSize:"30px" , marginLeft:"20px" ,  marginTop:"20px"}}> Movie Reviews</span>
        <WalletMultiButton style={{marginRight:"20px" ,  marginTop:"20px", color:"black" , backgroundColor:"white"}}/>
      
    </div>
  )
}
