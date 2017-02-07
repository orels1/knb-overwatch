/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        // this.state = NavbarStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // NavbarStore.listen(this.onChange);
    }

    componentWillUnmount() {
        // NavbarStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        return (
            <nav className='navbar navbar-toggleable-lg navbar-light bg-faded'>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-bars" style={{'fontSize': '24px'}}></i>
                </button>
                <Link to="/" className="navbar-brand" activeClassName="active">
                    <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i className="fa fa-wheelchair-alt fa-stack-1x fa-inverse"></i>
                    </span>
                </Link>
                <div className='collapse navbar-collapse justify-content-between' id='navbar'>
                    <div className="mr-auto">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <Link to='/' activeClassName="active" className="nav-link">
                                    Overwatch
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;