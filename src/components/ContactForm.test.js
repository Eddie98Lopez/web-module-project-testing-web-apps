import React from 'react';
import {getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{

    render(<ContactForm />)
    
});

test('renders the contact form header', ()=> {


    render(<ContactForm />)
    const header = screen.queryByText('Contact Form');
    expect(header).toBeInTheDocument();
    
    
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

    render(<ContactForm />)
    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'edd')

    const err = await screen.queryByText('Error: firstName must have at least 5 characters.')

    expect(err).toBeInTheDocument()
    
    

});

test('renders THREE error messages if user enters no values into any fields.', async () => {

    render(<ContactForm/>)

    const button = screen.getByRole('button')
    userEvent.click(button)
    const errs= await screen.getAllByTestId('error')
    errs.forEach(item => expect(item).toBeVisible())

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

    render(<ContactForm/>)

    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'eddie')
    const lastName = screen.getByLabelText('Last Name*')
    userEvent.type(lastName, 'Booobplj')
    
    const button = screen.getByRole('button')
    userEvent.click(button)

    const err = await screen.getByTestId('error')
    expect(err).toBeVisible();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm/>)
    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'Booobplj')

    const err = await screen.getByTestId('error')
    expect(err).toBeTruthy();
    expect(err).toBeVisible();
    

    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

    render(<ContactForm/>)

    const button = screen.getByRole('button')
    userEvent.click(button)
    const errs= await screen.getAllByTestId('error')
    expect(errs[1]).toBeVisible();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
    render(<ContactForm/>)
    
    //fname
    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'eddie')
    //lname
    const lastName = screen.getByLabelText('Last Name*')
    userEvent.type(lastName, 'Blooop')
    //email
    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'Booobplj@ymail.com')
    //button
    const button = screen.getByRole('button')
    userEvent.click(button)

    const display = await document.getElementById('displayContainer')
    expect(display).toBeVisible();

    expect(display.children.length).toBeLessThan(5)
    
});

test('renders all fields text when all fields are submitted.', async () => {

    render(<ContactForm/>)
    
    //fname
    const firstName = screen.getByLabelText('First Name*')
    userEvent.type(firstName, 'eddie')
    //lname
    const lastName = screen.getByLabelText('Last Name*')
    userEvent.type(lastName, 'Blooop')
    //email
    const email = screen.getByLabelText('Email*')
    userEvent.type(email, 'Booobplj@ymail.com')
    //message
    const message = screen.getByLabelText('Message')
    userEvent.type(message, 'Booop boop boop boop boop beep boop')
    //button
    const button = screen.getByRole('button')
    userEvent.click(button)

    const display = await document.getElementById('displayContainer')
    expect(display).toBeVisible();

    expect(display.childElementCount).toEqual(5)
    
});