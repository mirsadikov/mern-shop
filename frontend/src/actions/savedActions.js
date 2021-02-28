import axios from "axios";
import { SAVED_ADD_ITEM, SAVED_REMOVE_ITEM } from "../constants/savedConstants";

export const save = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://electrouz.herokuapp.com/api/products/${id}`
  );

  dispatch({
    type: SAVED_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image ? data.image : data.images[0].url,
      price: data.price,
    },
  });

  localStorage.setItem(
    "savedItems",
    JSON.stringify(getState().saved.savedItems)
  );
};

export const removeFromSaved = (id) => (dispatch, getState) => {
  dispatch({
    type: SAVED_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "savedItems",
    JSON.stringify(getState().saved.savedItems)
  );
};
