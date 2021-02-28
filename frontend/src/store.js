import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";

import { savedReducer } from "./reducers/savedReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  saved: savedReducer,
});

const savedItemsFromStorage = localStorage.getItem("savedItems")
  ? JSON.parse(localStorage.getItem("savedItems"))
  : [];

const initialState = {
  saved: { savedItems: savedItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
