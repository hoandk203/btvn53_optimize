export default function (state, action) {
    switch (action.type) {
        case "product/update":
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}
