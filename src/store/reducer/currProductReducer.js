export default function (state, action) {
    switch (action.type) {
        case "currProduct/update":
            return action.payload;
        default:
            return state;
    }
}
