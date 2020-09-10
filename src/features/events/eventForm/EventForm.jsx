import React, { useState } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';


export default function EventForm({match, history}) {
    const dispatch = useDispatch();

    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        venue: '',
        date: '',

    }
    
    const [values, setValues] = useState(initialValues);

    function handleFormSubmit() {
        selectedEvent ? dispatch(updateEvent({...selectedEvent, ...values}))
        : dispatch(createEvent({
            ...values, 
            id: cuid(), 
            hostedby: 'Bob', 
            attendees: [], 
            hostPhotoURL: '/assets/user.png'}));
            history.push('/events');
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input 
                    name='title'
                    type='text' 
                    placeholder='Event Title' 
                    value={values.title} 
                    onChange={(e) => handleInputChange(e)}  />
                </Form.Field>
                <Form.Field>
                    <input 
                    name='category'
                    type='text' 
                    placeholder='Category'
                    value={values.category} 
                    onChange={(e) => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input 
                    name='description'
                    type='text' 
                    placeholder='Description'
                    value={values.description} 
                    onChange={(e) => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input 
                    name='city'
                    type='text' 
                    placeholder='City'
                    value={values.city} 
                    onChange={(e) => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input 
                    name='venue'
                    type='text' 
                    placeholder='Venue'
                    value={values.venue} 
                    onChange={(e) => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input 
                    name='date'
                    type='date' 
                    placeholder='Date'
                    value={values.date} 
                    onChange={(e) => handleInputChange(e)} />
                </Form.Field>
                <Button 
                    type='submit' 
                    floated='right' 
                    positive 
                    content='Submit' />
                <Button 
                    as={Link} to='/events'
                    type='submit' 
                    floated='right' 
                    content='Cancel' />
            </Form>
        </Segment>
    )
}