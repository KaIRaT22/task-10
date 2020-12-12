import React from 'react';
import Get from './Get';
import Post from './Post';

import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

class App extends React.Component {

    render() {

        return (

            <Router>
                <div className='wrapper'>
                    <h1>React tutorial</h1>
                    <ul>
                        <li>
                            <Link to="/get">GET</Link>
                        </li>
                        <li>
                            <Link to="/post">POST</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route path={'/get'} component={ Get }></Route>
                    <Route path={'/post'} component={ Post }></Route>
                </Switch>
            </Router>
          )
    }
}

export default App;
