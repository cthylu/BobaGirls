import axios from 'axios';

const FETCH_ALL_TEAS = 'FETCH_ALL_TEAS';

const _fetchAllTeas = teas => ({ type: FETCH_ALL_TEAS, teas })

export const fetchAllTeas = () => async dispatch => {
    const teas = (await axios.get('/api/tea')).data
    console.log(teas)
    return dispatch(_fetchAllTeas(teas))
}

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_TEAS:
            return action.teas
        default:
            return state
    }
}