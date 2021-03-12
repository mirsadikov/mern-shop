import {
  SAVED_ADD_REQUEST,
  SAVED_ADD_SUCCESS,
  SAVED_REMOVE_ITEM,
  SAVED_GET_ITEM_FAIL,
  SAVED_GET_ITEM_REQUEST,
  SAVED_GET_ITEM_SUCCESS,
  SAVED_ADD_FAIL,
} from "../constants/savedConstants";
import { USER_LOGOUT } from "../constants/userConstants";

export const savedItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVED_GET_ITEM_REQUEST:
      return { loading: true, ...state };
    case SAVED_GET_ITEM_SUCCESS:
      return { loading: false, items: action.payload };
    case SAVED_GET_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SAVED_REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((x) => x._id !== action.payload),
      };
    case SAVED_ADD_REQUEST:
      return { ...state, loading: true };
    case SAVED_ADD_SUCCESS:
      return { loading: false, items: action.payload };
    case SAVED_ADD_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { items: [] };
    default:
      return state;
  }
};
