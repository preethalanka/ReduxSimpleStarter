import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = 'AIzaSyC-joj4Y36ILv6YpD-knaZrJ8aSz7cT548';

// React recommends downward data flow design - which is:
// As this is the top-level component, this component should get the data that all the child components will use
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos:[],
            selectedVideo: null
        };

        this.onSearchBarInput("surfboards");
    }

    render() {

        // multiple approaches to solve video refresh with term
        // using debounce function + onChange,
        // or direct function + onBlur + onKeyDown
        const videoSearch = _.debounce((term) => {
            this.onSearchBarInput(term)
        }, 500);

        return (
            <div>
                <SearchBar onSearchBarInput={videoSearch} />
                <div className="col-md-8">
                    <VideoDetail video={this.state.selectedVideo}/>
                </div>
                <div className="col-md-4">
                    <VideoList
                        onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
                        videos={this.state.videos} />
                </div>
            </div>
        );
    }
    
    onSearchBarInput(searchTerm) {
        YTSearch({ key: API_KEY, term: searchTerm}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })

            // this.setState({videos});
            // Above es6 works only when key and value have the same property name.
            // Above resolves to
            // this.setState({videos:videos})
        });   
    }

}

// In React as step 1, we create a new component that produces some html - as done above.
// In step 2: take component generated html and put it on the web page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));