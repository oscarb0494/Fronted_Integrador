import React, { useEffect, createContext, useReducer, useContext, Suspense, lazy,useState } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Loader from "react-loader-spinner"

import NavBar from './components/NavBar'
import Login from './components/Login'
import Signup from './components/Signup'
import CreatePost from './components/CreatePost'
import SuscribesUsers from './components/SuscribesUsers'
import Entry from './components/Entry'
import Inicio from './components/Inicio'
import Stats from './components/Stats'
import Cronograma from './components/Cronograma'

import { reducer, initialState } from './reducers/userReducer'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import DepartamentoForm from './components/DepartamentoForm'
import DepartamentoList from './components/DepartamentoList'
import SedeList from './components/SedeList'
import Departamento from './components/Departamento'
import Espacio from './components/Espacio'
import SedeForm from './components/SedeForm'
import EspacioForm from './components/EspacioForm'


import "./App.css"

const Home = lazy(() => import("./components/Home"))
const Profile = lazy(() => import("./components/Profile"))
const UserProfile = lazy(() => import("./components/UserProfile"))

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  const [view, setView] = useState("basic");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);

    if (user) {
      dispatch({ type: "USER", payload: user })
    } else {
      history.push('/login')
    }
  }, [])

  return (
    <Suspense fallback={<Loader
      className="centrar"
      type="Bars"
      color="#00BFFF"
      height={100}
      width={100}
    />
    }>
      <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>

        <Route exact path="/discovery">
          <SuscribesUsers />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route path="/profile/:userid">
          <UserProfile />
        </Route>

        <Route path="/entry/:entryid">
          <Entry />
        </Route>

        <Route path="/post">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/createpost">
          <CreatePost />
        </Route>

        <Route path="/cronograma">
          <Cronograma />
        </Route>

        <Route path="/departamento">
          <DepartamentoList />
        </Route>

        <Route path="/sede">
          <SedeForm />
        </Route>

        <Route path="/departamentos/:dptoid">
          <Departamento />
        </Route>

        <Route path="/espacio/:espacioid">
          <EspacioForm />
        </Route>

         <Route path="/espacios/:sede_id">
          <Espacio />
        </Route>

        <Route path="/sedes">
          <SedeList />
        </Route>

        <Route path="/loginform">
          <div className="App">
            <nav>
              <h3
                onClick={() => setView("basic")}
                style={{ color: view === "basic" ? "#FF0000" : "" }}
              >
                Login
              </h3>
              <h3
                onClick={() => setView("advanced")}
                style={{ color: view === "advanced" ? "#FF0000" : "" }}
              >
                Registro
              </h3>
            </nav>
            {view === "basic" ? <SignupForm /> : <LoginForm />}
          </div>
        </Route>

      </Switch>
    </Suspense>



  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
