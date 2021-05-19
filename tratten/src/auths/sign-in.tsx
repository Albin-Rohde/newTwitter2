import { Button } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';

interface Props {
  setYes: any;
}

const SignIn: React.FC<Props> = ({setYes}: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const onLogin = async(e: FormEvent) => {
      console.log('on login')
    e.preventDefault()
      const loginData = {
          email,
          password,
      }
      const data = await fetch('http://localhost:421/sign-in', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData)
      })

      const Abramham = await data.json()

      console.log(Abramham)
      if(Abramham === "OK") {
        setYes(true)
      }
  }


  return (
    <div className="sign-in">
     <h1>LOGGA IN</h1>
      <form action="/dashboard" onSubmit={(e: FormEvent) => onLogin(e)}>
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

export default SignIn;
