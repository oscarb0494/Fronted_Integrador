import React, { useEffect, createContext, useReducer, useContext, Suspense, lazy,useState } from 'react'
import { BrowserRouter, Route, Switch, useHistory, Redirect } from 'react-router-dom'

import Loader from "react-loader-spinner"

import Login from './components/Login'
import Signup from './components/Signup'
import Inicio from './components/Inicio'
import Cronograma from './components/Cronograma'

import { reducer, initialState } from './reducers/userReducer'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'

import Layout from './components/Layout/Layout'

import "./App.css"

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
      history.push('/loginform')
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
        
        <Route path="/" exact render={() => <Redirect to="/app/main"/>}/>
        <Route path="/app" exact render={() => <Redirect to="/app/main"/>}/>
        <Route path="/app" component={Layout}/>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route path="/profile/:userid">
          <UserProfile />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/cronograma">
          <Cronograma />
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
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default App;
