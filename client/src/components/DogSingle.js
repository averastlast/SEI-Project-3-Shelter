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
            <div class='singleDog'>
                
                <p class='dogname'>{this.state.dogInfo.name}</p>
                <p>Breed: {this.state.dogInfo.breed}</p>
                <p>Shelter: {this.props.match.params.shelterName}</p>

                <button class='button' onClick={this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateDog}>
                        <div><p class='subtitle'>Edit Dog Form:</p></div>
                            <div>
                                <label htmlFor="name">Name: </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.dogInfo.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="breed">Breed: </label>
                                <textarea
                                    id="breed"
                                    type="text"
                                    name="breed"
                                    onChange={this.handleChange}
                                    value={this.state.dogInfo.breed}
                                />
                            </div>
                            <button class='button'>Update</button>
                        </form>
                        : <div class='editbox'>
                            <p class='dogname'>Edit this dog:</p>
                            <p>
                                Name: {this.state.dogInfo.name}
                            </p>
                            <p>
                                Breed: {this.state.dogInfo.breed}
                            </p>
                            <button class='deleteButton' onClick={this.deleteDog}>Delete</button>
                        </div>
                }
                <div><Link to="/">Home</Link></div>
            </div>
        )

    };
}

export default DogSingle;