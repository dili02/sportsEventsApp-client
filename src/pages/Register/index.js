import React from 'react'

import api from '../../services/api'

import { Col, Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';

export default function Register ({history}) {
   const [email, setEmail] = React.useState("")
   const [password, setPassword] = React.useState("")
   const [firstName, setFirstName] = React.useState("")
   const [lastName, setLastName] = React.useState("")
   const [error, setError] = React.useState(false)
   const [errorMessage, setErrorMessage] = React.useState('false')

   const handleSubmit = async evt => {
      evt.preventDefault()

      if (email !== "" && password !== "" && firstName !== "" && lastName !== "") {
         const apiResponse = await api.post('/user/register', {
            email,
            password,
            firstName,
            lastName
         })
         const userId = apiResponse.data._id || false

         if (userId) {
            localStorage.setItem("user", userId)
            history.push("/dashboard")
         } else {
            const {message} = apiResponse.data
            setError(true)
            setErrorMessage("You need to fill all the fields")
            setTimeout(() => {
               setError(false)
               setErrorMessage("")
            }, 2000)
         }
      }
   }

   return (
      <Container>
         <h2>REGISTER</h2>
         <Form onSubmit={ handleSubmit }>

            <FormGroup>
               <Input
                  type="text"
                  name="firstName"
                  id="examplefirstName"
                  placeholder="Enter the First Name Here!!!"
                  onChange={evt => setFirstName(evt.target.value)}
               />
            </FormGroup>

            <FormGroup >
               <Input
                  type="text"
                  name="lastName"
                  id="examplelastName"
                  placeholder="Enter the Last Name Here!!!"
                  onChange={evt => setLastName(evt.target.value)}
               />
            </FormGroup>

            <FormGroup>
               <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter the Email Here!!!"
                  onChange={evt => setEmail(evt.target.value)}
               />
            </FormGroup>

            <FormGroup>
               <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter the password Here!!!"
                  onChange={evt => setPassword(evt.target.value)}
               />
            </FormGroup>

            <FormGroup>
            <Button
                  className="submit-btn"
               >
                  REGISTER
               </Button>

            </FormGroup>

            {error
            ? <Alert className="event-validation" color="danger">Missing required information</Alert>
            : ""}
         </Form>
      </Container>
   )
}
