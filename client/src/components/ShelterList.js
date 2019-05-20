import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class ShelterList extends Component {
    state = {
        allShelters: [],
        newShelter: {
            name: '',
            address: '',
            phoneNum: 0
        },
        isShelterFormDisplayed: false
    }

    getAllShelters = () => {
        axios.get('/api/proj/shelters/').then(res => {
            this.setState({ allShelters: res.data })
        })
    }
    componentDidMount = () => {
        this.getAllShelters()
    }

    toggleShelterForm = () => {
        this.setState((state, props) => {
            return ({ isShelterFormDisplayed: !state.isShelterFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewShelter = { ...this.state.newShelter }
        cloneNewShelter[e.target.name] = e.target.value
        this.setState({ newShelter: cloneNewShelter })
    }

    createShelter = (e) => {
        e.preventDefault()
        axios
            .post('/api/proj/shelters/', {
                name: this.state.newShelter.name,
                address: this.state.newShelter.address,
                phoneNum: this.state.newShelter.phoneNum
            })
            .then(res => {
                const sheltersList = [...this.state.allShelters]
                sheltersList.unshift(res.data)
                this.setState({
                    newShelter: {
                        name: '',
                        address: '',
                        phoneNum: 0
                    },
                    isShelterFormDisplayed: false,
                    allShelters: sheltersList
                })
            })
    }

    render() {

        return (
            <div>
                <title>Shelters:</title>
                {
                    this.state.allShelters.map((shelter, i) => {
                        return (

                            <div key={i}>
                                <h1><Link to={'/shelter/' + shelter._id}>{shelter.name}</Link></h1>
                                {shelter.address}
                                {shelter.phoneNum}

                            </div>


                        )
                    })
                }

                <button onClick={this.toggleShelterForm}>+ New Shelter</button>
                {
                    this.state.isShelterFormDisplayed
                        ? <form onSubmit={this.createShelter}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.newShelter.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    onChange={this.handleChange}
                                    value={this.state.newShelter.address}
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNum">Phone Number:</label>
                                <input
                                    id="phoneNum"
                                    type="number"
                                    name="phoneNum"
                                    onChange={this.handleChange}
                                    value={this.state.newShelter.phoneNum}
                                />
                            </div>
                            <button>Create</button>
                        </form>
                        : null
                }

            </div>
        );
    }
}

export default ShelterList;
