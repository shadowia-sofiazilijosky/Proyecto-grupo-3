import { Outlet } from "react-router";
import Header from "./components/header/header/Header";
import Footer from "./components/header/footer/Footer";

export const RootLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  )
}

