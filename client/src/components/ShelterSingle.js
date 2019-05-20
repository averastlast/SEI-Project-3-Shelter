import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class ShelterSingle extends Component {
    state = {
        shelterInfo: {
            shelter: {
                _id: '',
                name: '',
                address: '',
                phoneNum: 0
            },
            dogs: []
        },
        redirectToHome: false,
        isEditFormDisplayed: false
    }

    getShelter=()=>{
        axios.get(`/api/proj/shelters/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            this.setState({ shelterInfo: res.data })
        })
    }

    componentDidMount = () => {
        this.getShelter()
    }

    deleteShelter = () => {
        axios.delete(`/api/proj/shelters/${this.props.match.params.id}`).then(res => {
            this.setState({redirectToHome: true})
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleChange = (e) => {
        const cloneShelter = { ...this.state.shelterInfo }

        let inside = cloneShelter.shelter
            
        inside[e.target.name] = e.target.value

        cloneShelter.shelter = inside

        console.log(cloneShelter.shelter)
        this.setState({ shelterInfo: cloneShelter })
    }

    updateShelter = (e) => {
        e.preventDefault()
        axios
            .put(`/api/proj/shelters/${this.props.match.params.id}`, {
                name: this.state.shelterInfo.shelter.name,
                address: this.state.shelterInfo.shelter.address,
                phoneNum: this.state.shelterInfo.shelter.phoneNum
            })
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
                this.getShelter()
            })
            
            
            
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to="/" />)
        }

        return (
            <div>

                <p>I am a shelter</p>

                <p>{this.state.shelterInfo.shelter.name}</p>
                {this.state.shelterInfo.dogs.map((dog, i) => {
                    return (
                        <div key={i}>
                            <h1><Link to={"/" + this.state.shelterInfo.shelter.name + '/dog/' + dog._id} shelterId={this.state.shelterInfo.shelter._id}>{dog.name}</Link></h1>
                            {dog.breed}

                        </div>
                    )
                })
                }

                <button onClick={this.toggleEditForm}>Edit</button>
                {
                    this.state.isEditFormDisplayed
                        ? <form onSubmit={this.updateShelter}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.shelterInfo.shelter.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <textarea
                                    id="address"
                                    type="text"
                                    name="address"
                                    onChange={this.handleChange}
                                    value={this.state.shelterInfo.shelter.address}
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNum">Phone Number</label>
                                <textarea
                                    id="phoneNum"
                                    type="number"
                                    name="phoneNum"
                                    onChange={this.handleChange}
                                    value={this.state.shelterInfo.shelter.phoneNum}
                                />
                            </div>
                            <button>Update</button>
                        </form>
                        : <div>
                            <div>
                                Name: {this.state.shelterInfo.shelter.name}
                            </div>
                            <div>
                                Address: {this.state.shelterInfo.shelter.address}
                            </div>
                            <div>
                                Phone Number: {this.state.shelterInfo.shelter.phoneNum}
                            </div>
                            <button onClick={this.deleteShelter}>Delete</button>
                        </div>
                }
            </div>
        )

    };
}

export default ShelterSingle;
