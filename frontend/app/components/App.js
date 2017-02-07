/**
 * Created by orel- on 07/Feb/17.
 */
import React from 'react';
import Navbar from './Navbar';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="container main">
                    <Navbar router={this.props.router} />
                    <div className="contents">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
