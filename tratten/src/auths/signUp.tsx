import { Button } from '@material-ui/core';
import React, { useState } from 'react';

interface SignUpData {
    name: string,
    email: string,
    password: string,
}

interface Props {
    setYes: any
}

const SignUp: React.FC<Props> = ({setYes}: Props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  const onSignUp = async(e: Event) => {
      e.preventDefault()
      const data: SignUpData = {
          name,
          email,
          password,
      }
      console.log(data)
      console.log('signing up')
      const albin = await fetch('http://localhost:421/sign-up', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
      })
    const jesus = await albin.json()
    console.log(jesus)
    if(jesus === "Ya Boi") {
        setYes(true)
    }
  }

  return (
    <div className="sign-up">
     <h1>SIGNA UPP</h1>
      <form action="" onSubmit={(e: any) => onSignUp(e)}>
        <input placeholder="name" type="text"  value={name} id="name" name="name" onChange={(e) => setName(e.target.value) } />
        <br></br>
        <input placeholder="email" type="email" value={email} id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
        <br></br>
        <input placeholder="password" type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        <br></br>
    <Button 
      color="primary"
      variant="contained"
      type="submit"
    >
     Sign up now
    </Button>
    </form>
    </div>
  );
}

export default SignUp;
