export default function (state, action) {
    switch (action.type) {
        case "isLoadingAPI/true":
            return true;
        case "isLoadingAPI/false":
            return false;
        default:
            return state;
    }
}
