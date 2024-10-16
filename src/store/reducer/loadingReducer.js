export default function (state, action) {
    switch (action.type) {
        case "isLoading/true":
            return true;
        case "isLoading/false":
            return false;
        default:
            return state;
    }
}
