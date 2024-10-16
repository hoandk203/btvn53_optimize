export default function (state, action) {
    switch (action.type) {
        case "dialog/true":
            return true;
        case "dialog/false":
            return false;
        default:
            return state;
    }
}
