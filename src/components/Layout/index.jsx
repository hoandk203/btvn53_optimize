import React, { useReducer } from 'react'
import { SideBar } from '../index.js'
import DialogContext from '../../store'
import { reducer } from '../../store'
import { v4 } from 'uuid'

const initialState={
    products: [],
    categories: [],
    product: {
        "id": v4(),
        "name": "",
        "categoryId": "",
        "orderNum": "",
        "img":[]
    },
    category: {
        "id": v4(),
        "name": "",
        "orderNum": "",
    },
    currProduct: {
        "id": "",
        "name": "",
        "categoryId": "",
        "orderNum": "",
        "img":[]
    },
    currCategory: {
        "id": "",
        "name": "",
        "categoryId": "",
        "orderNum": "",
        "img":[]
    },
    isLoading: false,
    isLoadingAPI: false,
    showDialog: false,
    msgSuccess: null,
    error: null,
  }

export default function ({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    
  return (
    <DialogContext.Provider value={{state, dispatch}}>
        <div className='flex'>
            <SideBar/>
            {children}
        </div>
    </DialogContext.Provider>
  )
}
