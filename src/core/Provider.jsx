import React from 'react'
import { initialState, reducer } from '../store/reducer/reducer.js'
import { useReducer } from "react";
import ProviderContext from "../store";

export default function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ProviderContext.Provider value={{ state, dispatch }}>
            {children}
        </ProviderContext.Provider>
    );
}
