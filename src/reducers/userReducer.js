const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    role: "",
    status: "",
    cart: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("DATA DARI ACTION PAYLOAD", action.payload)
            return { ...state, ...action.payload }
        case "REGISTER_SUCCESS":
            console.log("DATA DARI PAYLOAD REGISTER", action.payload)
            return { ...state, ...action.payload }
        case "UPDATE_USER_CART":
            console.log("AMBIL CART", action.payload)
            return { ...state, cart: action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}