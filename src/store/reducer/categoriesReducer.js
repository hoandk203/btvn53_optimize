export default function (state, action) {
    switch (action.type) {
        case "categories/load":
            return [...action.payload];
        case "categories/create":
            return [...state, action.payload];
        case "categories/update":
            return [...action.payload.categories, action.payload.category];
        default:
            return state;
    }
}
