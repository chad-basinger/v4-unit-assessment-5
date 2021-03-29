
const initialState = {
    username: '',
    profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function updateUser(currentUser) {
    // let respData = axios.get('/auth/user-data').then(res => res.data)
    console.log(currentUser, 'updateUser')
    return {
        type: UPDATE_USER,
        payload: {
            username: currentUser.username,
            profile_pic: currentUser.profile_pic
        }
        
    }
}

export function logout() {
    return {
        type: LOGOUT_USER,


    }
}

export default function reducer(state = initialState, action){
    console.log(action, 'action')
    switch(action.type){
        
        case UPDATE_USER:
            return {
                username: action.payload.username,
                profile_pic: action.payload.profile_pic
            }
        case LOGOUT_USER:
            return initialState;
        default: return state
    }
}