/*

Scenario
You are building the input area of an AI chat app 
— a textarea for the message, 
a model selector dropdown, 
a send button, and a keyboard shortcut (Ctrl+Enter) to send.
 Every handler needs to be typed correctly.

 */
//  React.[eventName]event<HTMl[tagname]element>

// ChatInput.tsx
import React, { useState } from "react"
 
type AIModel = "gpt-4o" | "claude-3-5-sonnet" | "gemini-2.0-flash"
 
export function ChatInput() {
  const [message, setMessage] = useState("")
  const [model, setModel] = useState<AIModel>("gpt-4o")
 
  // 1. Handler for the textarea — updates message state
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }
 
  // 2. Handler for the model <select> dropdown
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value as AIModel)
  }
 
  // 3. Handler for the send button click
  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Sending:", message, "with model:", model)
  }
 
  // 4. Keyboard handler — sends on Ctrl+Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey && e.key === "Enter") {
      console.log("Sending:", message, "with model:", model) //checked solution
    }
  }
 
  // 5. Hover handler on the send button — logs "button hovered"
  const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("button hovered")
  }
 
  return (
    <div>
      <textarea onChange={handleMessageChange} onKeyDown={handleKeyDown} />
      <select onChange={handleModelChange}>

        <option value="gpt-4o">GPT-4o</option>
      </select>
      <button onClick={handleSend} onMouseEnter={handleHover}>Send</button>
    </div>
  )
}

