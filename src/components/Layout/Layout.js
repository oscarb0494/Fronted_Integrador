import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import Header from "../Header";
import Sidebar from "../Sidebar";

import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from "../../actions/navigation";
import s from "./Layout.module.scss";
//import BreadcrumbHistory from "../BreadcrumbHistory";

// pages
import Inicio from '../Inicio';
import DepartamentoView from '../DepartamentoView'
import SedeView from '../SedeView'
import EspacioView from '../EspacioView'
import MateriaList from '../MateriaList'
import RecursoForm from "../RecursoForm"
import RecursoView from "../RecursoView"
import MateriaView from "../MateriaView"
import SemestresView from "../SemestresView"
import GrupoView from "../GrupoView"
import EspacioEdit from "../EspacioEdit"
import DepartamentoEdit from "../DepartamentoEdit"
import MateriaEdit from "../MateriaEdit"
import Logout from "../logout"

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
  };

  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {

    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    } else if (window.innerWidth >= 768) {
      this.props.dispatch(openSidebar());
    }
  }

  handleCloseSidebar(e) {
    if (e.target.closest("#sidebar-drawer") == null && this.props.sidebarOpened && window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    }
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          !this.props.sidebarOpened ? s.sidebarClose : "",
          "flatlogic-one",
          "dashboard-light",
        ].join(" ")}
        onClick={e => this.handleCloseSidebar(e)}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header />

          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/app/main"
                      exact
                      render={() => <Redirect to="/app/main/dashboard" />}
                    />
                    <Route
                      path="/app/main/dashboard"
                      exact
                      component={SemestresView}
                    />

                    <Route path={"/app/typography"} component={SedeView} />
                    <Route path={"/app/logout"} component={Logout} />
                    <Route path={"/app/tables"} component={DepartamentoView} />
                    <Route path={"/app/ui/maps"} component={SedeView} />

                    <Route path={"/app/espacios/:sede_id"} component={EspacioView} />
                    <Route path={"/app/departamento/:dptoid"} component={SedeView} />
                    <Route path={"/app/recursos/:espacioid"} component={RecursoView} />
                    <Route path={"/app/materias/:dptoid"} component={MateriaView} />
                    <Route path={"/app/grupos/:materiaid"} component={GrupoView} />
                    <Route path={"/app/editarespacio/:espacio_id"} component={EspacioEdit} />
                    <Route path={"/app/editardepartamento/:dptoid"} component={DepartamentoEdit} />
                    <Route path={"/app/editarmateria/:materiaid"} component={MateriaEdit} />


                    <Route
                      path={"/app/ui/notifications"}
                      component={Inicio}
                    />
                    <Route path={"/app/ui/icons"} component={SemestresView} />
                    <Route path={"/app/ui/charts"} component={Inicio} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
