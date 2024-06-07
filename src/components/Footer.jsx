import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {


  return <>
    <div className="bg-secondary container-fluid">

      <footer className=" py-1 w-100 text-white">
        <section className='col-sm-10 content-margain ms-auto text-center'>
          <Link className="mx-1" href="https://www.facebook.com/profile.php?id=100007766405910&ref=xav_ig_profile_web" target='_blank' role="button">
            <i className="fab fs-3 m-2 fa-facebook"></i></Link>

          <Link className=" mx-1" href="https://github.com/Mostafa3ta" target='_blank' role="button">
            <i className="fab fs-3 m-2 fa-github"></i></Link>

          <Link className="mx-1" href="https://www.linkedin.com/in/mostafa-mahmoud-33a1542b0" target='_blank' role="button">
            <i className="fab fs-3 m-2 fa-linkedin"></i></Link>
        </section>
      </footer>

    </div>
  </>
}

