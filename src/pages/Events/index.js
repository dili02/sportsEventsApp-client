import React from 'react'

import api from '../../services/api'

import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import './styles.css'

export default function Events () {
   const [description, setDescription] = React.useState('')
   const [price, setPrice] = React.useState('')
   const [thumbnail, setThumbnail] = React.useState(null)
   const [date, setDate] = React.useState('')
   const [sport, setSport] = React.useState('')
   const [title, setTitle] = React.useState('')
   const [errorMessage, setErrorMessage] = React.useState(false)
   const preview = React.useMemo(() => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null
   }, [thumbnail])

   const submitHandler = async (e) => {
      const user_id = localStorage.getItem('user')

      const eventData = new FormData()
      eventData.append("thumbnail", thumbnail)
      eventData.append("sport", sport)
      eventData.append("title", title)
      eventData.append("price", price)
      eventData.append("description", description)
      eventData.append("date", date)

      try {
         if (title !== "" && description !== "" && sport !== "" && price !== "" && date !== "" && thumbnail !== "") {
            await api.post("/event", eventData, {headers: {user_id}})
         } else {
            setErrorMessage(true)
            setTimeout(() => {
               setErrorMessage(false)
            }, 2000)
            console.log("Missing required data")
         }
      } catch (error) {
         Promise.reject(error)
         console.log(error)
      }

      e.preventDefault()
   }

   return (
      <Container>
         <h2>CREATE YOUR EVENT</h2>
         <Form onSubmit={submitHandler}>

            <FormGroup>
               <Label>Upload Image:</Label>
               <Label
                  id='thumbnail'
                  style={{backgroundImage: `url(${preview})`}}
                  className={thumbnail ? "hasthumbail" :  ""}
               >
                  <Input
                     type="file"
                     onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                  <img
                     src={cameraIcon}
                     style={{maxWidth: '50px'}}
                     alt="upload icon image"
                     className={thumbnail ? "display-none" :  ""}
                  />
               </Label>
            </FormGroup>

            <FormGroup>
               <Label>Sport:</Label>
               <Input
                  id="sport"
                  type="text"
                  onChange={(e) => setSport(e.target.value)}
                  placeholder="Sport Name"
                  value={sport}
               />
            </FormGroup>

            <FormGroup>
               <Label>Title:</Label>
               <Input
                  id="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title Event"
                  value={title}
               />
            </FormGroup>

            <FormGroup>
               <Label>Description:</Label>
               <Input
                  id="description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Event Description"
                  value={description}
               />
            </FormGroup>

            <FormGroup>
               <Label>Price:</Label>
               <Input
                  id="price"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Event Price"
                  value={price}
               />
            </FormGroup>

            <FormGroup>
               <Label>Date Event:</Label>
               <Input
                  id="date"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Event Price"
                  value={date}
               />
            </FormGroup>

            <Button type="submit">CREATE EVENT</Button>

         </Form>

         {errorMessage
         ? <Alert className="event-validation" color="danger">Missing required information</Alert>
         : ""}
      </Container>
   )
}