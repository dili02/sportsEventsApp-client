import React from 'react'

import api from '../../services/api'

import { Col, Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';

export default function Login ({history}) {
   const [email, setEmail] = React.useState("")
   const [password, setPassword] = React.useState("")
   const [error, setError] = React.useState(false)
   const [errorMessage, setErrorMessage] = React.useState('false')

   const handleSubmit = async evt => {
      evt.preventDefault()
      const apiResponse = await api.post('/login', {email, password})
      const userId = apiResponse.data._id || false

      try {
         if (userId) {
            localStorage.setItem("user", userId)
            history.push("/dashboard")
         } else {
            const {message} = apiResponse.data
            setError(true)
            setErrorMessage(message)
            setTimeout(() => {
               setError(false)
               setErrorMessage("")
            }, 2000)
         }
      } catch (error) {
         
      }

   }

   return (
      <Container>
         <h2>LOGIN</h2>
         <Form onSubmit={ handleSubmit }>

            <FormGroup className="mb-2">
               <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter the Email Here!!!"
                  onChange={evt => setEmail(evt.target.value)}
               />
            </FormGroup>

            <FormGroup className="mb-2">
               <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter the password Here!!!"
                  onChange={evt => setPassword(evt.target.value)}
               />
            </FormGroup>

            <FormGroup>
               <Button className="submit-btn">
                  LOGIN
               </Button>
            </FormGroup>

            <FormGroup>
               <Button
                  className="secondary-btn"
                  onClick={() => history.push('/register')}
               >
                  NEW ACCOUNT
               </Button>
            </FormGroup>

         </Form>

         {error
         ? <Alert className="event-validation" color="danger">Missing required information</Alert>
         : ""}
      </Container>
   )
}
