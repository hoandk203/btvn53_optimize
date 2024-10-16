export default function (state, action) {
    switch (action.type) {
        case "currCategory/update":
            return action.payload;
        default:
            return state;
    }
}
