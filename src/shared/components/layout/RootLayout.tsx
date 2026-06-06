import { NavLink, Outlet } from "react-router";
import { ROUTES } from "@/shared/components/layout/utils/routes"

export const RootLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to={ROUTES.HOME}>Home </NavLink>
          <NavLink to={ROUTES.CREATECARDS}>Creá cards </NavLink>
          <NavLink to={ROUTES.LISTCARDS}>Cards </NavLink>
        </nav>
      </header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  )
}

