import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {


  return <>
    <div className="fixed-bottom clearfix">

      <footer className="bg-dark text-center text-white">
        <div className="container p-2 pb-0">
          {/* <div className='col-6'>Follow Us :</div> */}
          <section className="pb-2 ">
            <Link className="btn btn-outline-light btn-floating m-1" to="https://www.facebook.com/profile.php?id=100007766405910&ref=xav_ig_profile_web" target='_blank' role="button">
              <i className="fab fa-facebook-f"></i></Link>

            <Link className="btn btn-outline-light btn-floating m-1" to="https://www.instagram.com/mostafa3ta_106?igsh=bXVoMm9yazcwdmlo" target='_blank' role="button">
              <i className="fab fa-instagram"></i></Link>

            <Link className="btn btn-outline-light btn-floating m-1" to="https://www.linkedin.com/in/mostafa-mahmoud-33a1542b0" target='_blank' role="button">
              <i className="fab fa-linkedin-in"></i></Link>

            <Link className="btn btn-outline-light btn-floating  m-1" to="https://github.com/Mostafa3ta" target='_blank' role="button">
              <i className="fab fa-github"></i></Link>
          </section>
        </div>

      </footer>

    </div>
  </>
}

