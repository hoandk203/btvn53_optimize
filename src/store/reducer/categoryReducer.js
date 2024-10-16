export default function (state, action) {
    switch (action.type) {
        case "category/update":
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}
