import * as React from 'react';
import {useRef, useState, useEffect} from 'react'

export default function Chat({socket}) {

    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])

    useEffect(()=>{
        socket.on('reveive_message', data => {
            setMessageList((current) => [...current, data])
        })

        return () => socket.off('reveive_message')
    }, [socket])

    const handleSubmit = () => {
        const message = messageRef.current.value
        if(!message.trim()) return
            socket.emit('message', message)
            clearInput()
    }
    const handleTicket = () => {
        socket.emit('ticket')
    }

    const clearInput = () =>{
        messageRef.current.value = ''
    }

    return (
        <div>
            <h1>Chat</h1>
            {
                messageList.map((message, index) => (
                    <p key={index}>{message.author}: {message.text}</p>
                ))
            }
            <input type="text" ref={messageRef} placeholder="Mensagem" />
            <button onClick={()=>handleSubmit()}>Enviar</button>
            <button onClick={()=>handleTicket()}>Criar ticket</button>
        </div>
    )
}