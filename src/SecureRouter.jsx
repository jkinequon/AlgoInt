import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Navbar, Sidebar, } from './components';
import { Home, NotFound, Challenges, Profile } from './pages';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


class SecureRouter extends Component {
    render() {

        const { signedIn } = this.props;

        return (
            <Router>
                <Navbar/>
                <div className="root-inner-container">
                    {/* <Sidebar/> */}
                    <div className="inner-middle-container">
                        <Switch>
                            <Route exact path='/'>
                                <Home/>
                            </Route>
                            <Route path='/whiteboard'>
                                <NotFound/>
                            </Route>
                            <Route path='/codeproblem'>
                                <NotFound/>
                            </Route>
                            <Route path='/mockinterview'>
                                <NotFound/>
                            </Route>
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.delta.signedIn,
    };
};

export default connect(mapStateToProps, null)(SecureRouter);