import React from 'react'
import { Helmet } from "react-helmet";


export default function About() {

  return <>

    <Helmet>
      <title>About</title>
    </Helmet>

    <div className='my-4 col-md-6 about'>
      <div>
        <h3 className='text-success my-3 fw-bold'>About Cart :</h3 >
        <div className='h5'> I used fake API store so I can't edit or add into database
          but i imitated it with the local storage and requests respnose is in (console)
        </div>
      </div>
      <hr />
      <div>
        <h3 className='text-success my-3 fw-bold'>About Login :</h3 >
        <div className='h5'>you cannot signup new user into the server it simulates the request and the response is
          in the (console), And there's a given username belongs to a user stored in
          the database it respondes with a Token that you cannot access the wepsite without it .
        </div>
      </div>
      <hr />
    </div>

  </>
}
