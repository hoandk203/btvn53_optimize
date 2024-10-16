export default function (state, action) {
    switch (action.type) {
        case "msgSuccess/update":
            return action.payload;
        default:
            return state;
    }
}
