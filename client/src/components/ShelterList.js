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
            <div class='shelterList'>
                <p class='title'>Dog Shelters:</p>
                
                {
                    this.state.allShelters.map((shelter, i) => {
                        return (

                            <div class='textunit' key={i}>
                                <p><Link to={'/shelter/' + shelter._id}>{shelter.name}</Link></p>
                                <p>{shelter.address}</p>
                                <p>{shelter.phoneNum}</p>
                            </div>
                        )
                    })
                }

                <button class='button' onClick={this.toggleShelterForm}>Add new shelter</button>
                {
                    this.state.isShelterFormDisplayed
                        ? <form onSubmit={this.createShelter}>
                            <div><p class='subtitle'>New Shelter Form:</p></div>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.newShelter.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="address">Address:</label>
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
                            <button class='button'>Create</button>
                        </form>
                        : null
                }

            </div>
        );
    }
}

export default ShelterList;
