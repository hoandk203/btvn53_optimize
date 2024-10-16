export default function (state, action) {
    switch (action.type) {
        case "error/update":
            return action.payload;
        default:
            return state;
    }
}
