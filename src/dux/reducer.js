import axios from 'axios'


const initialState = {
    username: '',
    profile_pic: ''
}

UPDATE_USER = 'UPDATE_USER'
LOGOUT_USER = 'LOGOUT_USER'

export const updateUser = (username, profile_pic) => {
    // let respData = axios.get('/auth/user-data').then(res => res.data)
    return {
        type: UPDATE_USER,
        payload: {username, profile_pic}
    }
}

export const logout = () => {
    return {
        type: LOGOUT_USER,

    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return {
                username: state.username,
                profile_pic: state.profile_pic
            }
        case LOGOUT_USER:
            return initialState;
        default: return state
    }
}