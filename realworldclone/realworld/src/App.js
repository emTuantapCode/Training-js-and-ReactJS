import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NavGuest from "./Components/navGuest";
import NavAuthor from "./Components/navAuthor"
import Footer from "./Components/footer"
import { publicRoutes, privateRoutes } from './Router/index'

function App() {

  if (localStorage.getItem("data")) {
    return (
      <>
        <NavAuthor />
        <div className="App">
          <Routes>
            {privateRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Routes>
        </div>
        <Footer />
      </>
    )
  } else {
    return (
      <>
        < NavGuest />
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Routes>
        </div>
        <Footer />
      </>
    )
  }
}

export default App;
