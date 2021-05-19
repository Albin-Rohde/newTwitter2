import { Button } from '@material-ui/core';
import React, { useState } from 'react';

interface postData {
    title: string
    description: string
}

const Dashboard = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const onPost = async (e: any) => {
        e.preventDefault()
        const data: postData = {
            title,
            description: text,
        }
        const data2 = await fetch('http://localhost:421/posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        const Gandhi = await data2.json()

        console.log(Gandhi)
    }

    return (
        <div>
            <h2>
                Welcome, you are logged in to the app.
            </h2>
            <h3>Write a post</h3>
            <form action="/dashboard" onSubmit={(e: any) => onPost(e)}>
                <input placeholder="Title" type="text" value={title} id="title" name="title" onChange={(e) => setTitle(e.target.value)}/>
                <input placeholder="text" type="text" value={text} id="text" name="text" onChange={(e) => setText(e.target.value)}/>
                <Button 
                color="primary"
                variant="contained"
                type="submit"
                >
                    Sign up now
                </Button>
            </form>
        </div>
    )
}

export default Dashboard
