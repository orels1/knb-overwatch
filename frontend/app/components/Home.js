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

    render() {
        return (
            <div className="home padding d-flex justify-content-center flex-column">

            </div>
        );
    }
}

export default Home;
