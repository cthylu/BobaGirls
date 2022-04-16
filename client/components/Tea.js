import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tea extends Component {
    constructor() {
        super();
        this.state = {
            teaList: []
        }
        this.getTeas = this.getTeas.bind(this)
    }
    async getTeas() {
        const response = await axios.get('/api/teas')
        this.setState({ teaList: [response.data] })
    }
    componentDidMount() {
        this.getTeas()
    }
    render() {
        const { teaList } = this.state
        console.log(teaList)

        return (
            <div>
                {teaList.length}
                {
                    teaList.map(tea => {
                        <li key={tea.id}>
                            {tea.teaname}
                        </li>
                    })
                }
            </div>
        )
    }
}

export default connect(null)(Tea)