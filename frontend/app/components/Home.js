/**
 * Created by orel- on 07/Feb/17.
 */
import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        // this.state = HomeStore.getState();
        // And listen to any changes to get the two-way binding
        this.state = {
            'username': '',
            'password': '',
            'token': null,
            'logs': [],
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        // HomeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        // HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.username.length > 3 && this.state.password.length > 3) {
            fetch('/api/v1/auth/login', {
                'method': 'POST',
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password,
                }),
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    throw new Error('Fetch failed');
                })
                .then((json) => {
                    if (json.results.token) {
                        this.setState({'token': json.results.token});
                        this.getLogs(this.state.token);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    handleUsernameUpdate(event) {
        this.setState({'username': event.target.value || ''});
    }

    handlePasswordUpdate(event) {
        this.setState({'password': event.target.value || ''});
    }

    getLogs(token) {
        fetch('/api/v1/logs/', {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `JWT ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error('Fetch failed');
            })
            .then((json) => {
                if (json.results.list) {
                    this.setState({'logs': json.results.list});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="home d-flex align-self-center justify-content-center flex-column" style={{'minHeight': '50vh'}}>
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col">
                        {this.state.token &&
                            <div className="card">
                                <div className="card-block">
                                    <div className="card-title">
                                        Your token
                                    </div>
                                    <p className="card-text" style={{'wordWrap': 'break-word'}}>
                                        {this.state.token}
                                    </p>
                                </div>
                            </div>
                        }
                        {!this.state.token &&
                            <div className="card">
                                <div className="card-block">
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="login"
                                                name="login"
                                                value={this.state.username}
                                                onChange={this.handleUsernameUpdate.bind(this)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handlePasswordUpdate.bind(this)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-outline-primary">
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
