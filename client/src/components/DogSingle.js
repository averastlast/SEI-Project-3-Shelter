import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class DogSingle extends Component {
    state = {
        dogInfo: {
            name: '',
            breed: ''
        },
        redirectToHome: false,
        // isEditFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get(`/api/proj/dogs/${this.props.match.params.dogId}`).then(res => {
            this.setState({ dogInfo: res.data })
        })
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/" />)
        }

        return (
            <div>
                {this.props.match.params.shelterName}
                <p>I am a dog</p>
                <button> EDIT</button>
                {this.state.dogInfo.name}
                {this.state.dogInfo.breed}
            </div>
        )

    };
}

export default DogSingle;