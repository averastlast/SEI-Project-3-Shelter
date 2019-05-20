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
        isEditFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get(`/api/proj/dogs/${this.props.match.params.dogId}`).then(res => {
            this.setState({ dogInfo: res.data })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    deleteDog = () => {
        axios.delete(`/api/proj/dogs/${this.props.match.params.dogId}`).then(res => {
            this.setState({redirectToHome: true})
        })
    }

    handleChange = (e) => {
        const cloneDog = { ...this.state.dogInfo }
        cloneDog[e.target.name] = e.target.value
        this.setState({ dogInfo: cloneDog })
    }

    // man it smells like updog in here
    updateDog = (e) => {
        e.preventDefault()
        axios
          .put(`/api/proj/dogs/${this.props.match.params.dogId}`, {
              name: this.state.dogInfo.name,
              breed: this.state.dogInfo.breed
          })
          .then(res => {
              this.setState({dogInfo: res.data, isEditFormDisplayed: false})
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


                <button onClick={this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateDog}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.dogInfo.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="breed">Breed</label>
                                <textarea
                                    id="breed"
                                    type="text"
                                    name="breed"
                                    onChange={this.handleChange}
                                    value={this.state.dogInfo.breed}
                                />
                            </div>
                            <button>Update</button>
                        </form>
                        : <div>
                            <div>
                                Name: {this.state.dogInfo.name}
                            </div>
                            <div>
                                Breed: {this.state.dogInfo.breed}
                            </div>
                            <button onClick={this.deleteDog}>Delete</button>
                        </div>
                }

            </div>
        )

    };
}

export default DogSingle;