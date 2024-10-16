export default function (state, action) {
    switch (action.type) {
        case "products/load":
            return [...action.payload];
        case "products/create":
            return [...state, action.payload];
        case "products/update":
            return [...action.payload.products, action.payload.product];
        default:
            return state;
    }
}
