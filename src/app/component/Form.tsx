"use client"
import React,{FC} from 'react'
import { Movie } from '../Model/Model'
import { useConnection , useWallet} from '@solana/wallet-adapter-react'
import {PublicKey, SystemProgram, Transaction, TransactionInstruction} from "@solana/web3.js";
import * as web3 from '@solana/web3.js'

const MOVIE_REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export default function Form() {
 
    const [title,settitle] = React.useState('')
    const [rating,setRating] = React.useState(0)
    const [message,setMessage] = React.useState('')
    const {connection} = useConnection();
    const {publicKey, sendTransaction } = useWallet();

    const handleSubmit = async (event:any) =>{
        event.preventDefault()
        // we are creating new 
        const movie = new Movie(title , rating ,message)
        await handleTransactionSubmit(movie)
    }

    const handleTransactionSubmit = async(movie:Movie)=>{
        if(!publicKey){
            alert("Wallet is not connected")
            return
        }

        const buffer = movie.serialize();
        const transaction = new web3.Transaction()
       
        const [pda] = await PublicKey.findProgramAddress(
            [publicKey.toBuffer(), Buffer.from(movie.title)],
            new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        )

        const instruction = new TransactionInstruction({
            keys:[
                {
                    pubkey:publicKey,
                    isSigner:true,
                    isWritable:false
                },
                {
                    pubkey:pda,
                    isSigner:false,
                    isWritable:true
                },
                {
                    pubkey: web3.SystemProgram.programId,
                    isSigner: false,
                    isWritable: false
                  }
            ],
            data:buffer,
            programId:new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
        })
        transaction.add(instruction)

        try{
            let txid = await sendTransaction(transaction,connection)
            console.log(`Transaction submitted`)
        }catch(e){
            alert(JSON.stringify(e))
        }

    }



  return (
    <div style={{border:"2px solid white",maxWidth:"30rem" ,padding:"40px" , margin:"auto", marginTop:"80px"}}>
    <form onSubmit={handleSubmit}>
      <h5 style={{fontSize:"20px", paddingBottom:"10px"}}>Movie Title</h5>

      <input type='text' name='title' style={{width:"80%" , height:"30px"}} onChange={event => settitle(event.currentTarget.value)}></input>

      <h5 style={{fontSize:"20px", padding:"10px 0 10px 0"}} >Add Your Reviews</h5>
      <textarea name='title' style={{width:"80%" , height:"80px"}} onChange={event => setMessage(event.currentTarget.value)} />
      <h5 style={{fontSize:"20px", padding:"10px 0 10px 0"}}>Rating</h5>
      <input type='text' name='title' style={{width:"80%" , height:"30px"}} onChange={(valueString) => setRating(parseInt(valueString))}></input>
      <div><button type='submit' style={{padding:"5px" , width:"60px" , marginTop:"10px"}}> submit</button></div>
      
    </form>
    </div>
  )
}


