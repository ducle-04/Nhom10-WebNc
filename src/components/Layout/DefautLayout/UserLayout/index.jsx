import React from 'react'
import Header from './Header'
import Footer from './Footer'

function UserLayout({children}) {
  // const [isPopUp,setIsPopUp]=useState(false);
  return (
    <div className='font-Montserrat'>
    <Header/>
    <div className='mx-2 xl:mx-20'>
        {children}
    </div>
    <Footer/>     
    </div>
  )
}

export default UserLayout;
