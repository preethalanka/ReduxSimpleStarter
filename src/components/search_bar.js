// component - user types input, make request to youtube api
//noinspection JSUnresolvedVariable
import React, { Component } from 'react';

// create a new component in a function that returns JSX - which produces some html
// this is a functional component
const SearchBarFunc = () => {
    return <input id="searchbar" type="text"/>
};

// class component
class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onBlurInput = this.onBlurInput.bind(this);
        this.onKeyDownInput = this.onKeyDownInput.bind(this);
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    id="searchbar"
                    value={this.state.term}
                    onChange={ this.onInputChange }
                    onBlur= {  this.onBlurInput }
                    onKeyDown= { this.onKeyDownInput }
                    type="text"
                />
            </div>
        );
    }

    onKeyDownInput(event) {
        // Option 1: using enter key press
        // have multiple approaches to solve video refresh with term
        // notice how we stop events from propogating to other event handlers 
        // like onInputChange
        if (event.key === 'Enter') {
            this.props.onSearchBarInput(event.target.value);
            event.preventDefault();
        }
    }

    onBlurInput(event) {
        // Option 2: using onBlur
        // have multiple approaches to solve video refresh with term
        this.props.onSearchBarInput(event.target.value);
    }

    onInputChange(event) {
        // Option 2: using onInputChange and debounce
        // have multiple approaches to solve video refresh with term
        this.setState({
            term: event.target.value
        });
        this.props.onSearchBarInput(event.target.value);
    }
}

export default SearchBar;