import React from 'react'

import api from '../../services/api'

import { Col, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default function Login ({history}) {
   const [email, setEmail] = React.useState("")
   const [password, setPassword] = React.useState("")

   const handleSubmit = async evt => {
      evt.preventDefault()
      const apiResponse = await api.post('/login', {email, password})
      const userId = apiResponse.data._id || false

      if (userId) {
         localStorage.setItem("user", userId)
         history.push("/dashboard")
      } else {
         const {message} = apiResponse.data
      }
   }

   return (
      <Container>
         <h2>LOGIN</h2>
         <Form onSubmit={ handleSubmit }>
            <FormGroup row>
               <Label for="exampleEmail" sm={2}>Email</Label>
               <Col sm={10}>
                  <Input
                     type="email"
                     name="email"
                     id="exampleEmail"
                     placeholder="Enter the Email Here!!!"
                     onChange={evt => setEmail(evt.target.value)}
                  />
               </Col>
            </FormGroup>
            <FormGroup row>
               <Label for="examplePassword" sm={2}>Password</Label>
               <Col sm={10}>
                  <Input
                     type="password"
                     name="password"
                     id="examplePassword"
                     placeholder="Enter the password Here!!!"
                     onChange={evt => setPassword(evt.target.value)}
                  />
               </Col>
            </FormGroup>
            <FormGroup check row>
               <Col sm={{ size: 10, offset: 2 }}>
                  <Button>LOGIN</Button>
               </Col>
            </FormGroup>
         </Form>
      </Container>
   )
}
