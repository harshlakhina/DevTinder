import NavBar from "./NavBar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

function RootLayout(){
  return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default RootLayout