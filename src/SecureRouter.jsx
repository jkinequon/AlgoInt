import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setQuestionObject } from '../src/redux/actions/actions'

import { Navbar, Sidebar, } from './components';
import { Home, NotFound, Selection, ProblemManager, LogIn, Problem } from './pages';
import firebase from './firebase_config'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


class SecureRouter extends Component {
    componentDidMount() {
        const {setQuestionObject} = this.props
        var questionObject = []
        var questions = firebase.database().ref('/questions/')
        questions.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                setQuestionObject(childData);
                // console.log(childData)
                // questionObject.push(JSON.parse(JSON.stringify(childData)));
            });
        });     
        
        
  
    }
      
    
    render() {

        const { signedIn, questionsObject } = this.props;
        // console.log(questionsObject)

        return (
            <Router>
                <Navbar/>
                <div className="root-inner-container" style={{ height: 'calc(100vh - Xpx)'}}>
                        <Switch>
                            {!signedIn ? 
                            <Route path="*">
                                <LogIn />
                            </Route>
                            :
                            <>
                                <Route exact path='/'>
                                    <Home/>
                                </Route>
                                <Route path='/Selection'>
                                    <Selection/>
                                </Route>
                                <Route path='/Problem'>
                                    <ProblemManager/>
                                </Route>
                                {/* <Route path="*">
                                    <NotFound />
                                </Route> */}
                            </>
                        }
                        </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.delta.signedIn,
        questionsObject: state.delta.questionsObject,

    };
};

function mapDispatchToProps(dispatch) {
    return {
        setQuestionObject: bindActionCreators(setQuestionObject, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecureRouter);