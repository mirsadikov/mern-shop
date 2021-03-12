import axios from "axios";
import {
  SAVED_ADD_REQUEST,
  SAVED_GET_ITEM_REQUEST,
  SAVED_GET_ITEM_SUCCESS,
  SAVED_GET_ITEM_FAIL,
  SAVED_REMOVE_ITEM,
  SAVED_ADD_SUCCESS,
  SAVED_ADD_FAIL,
} from "../constants/savedConstants";

export const removeFromSaved = (id) => async (dispatch, getState) => {
  dispatch({
    type: SAVED_REMOVE_ITEM,
    payload: id,
  });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: {
      idForDelete: id,
    },
  };

  await axios.delete(`/api/saved`, config);
};

export const getSavedItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVED_GET_ITEM_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/saved`, config);

    const detailsData = await Promise.all(
      data.map(async (i) => {
        var { data } = await axios.get(`/api/products/${i}`);
        return data;
      })
    );

    dispatch({
      type: SAVED_GET_ITEM_SUCCESS,
      payload: detailsData,
    });
  } catch (error) {
    dispatch({
      type: SAVED_GET_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const saveToSaved = (idForAdd) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVED_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/saved`, config);

    const existItem = data.find((x) => x === idForAdd);
    if (!existItem) {
      data.push(idForAdd);
      await axios.post(`/api/saved`, { idForAdd: idForAdd }, config);
    }

    const detailsData = await Promise.all(
      data.map(async (i) => {
        var { data } = await axios.get(`/api/products/${i}`);
        return data;
      })
    );

    dispatch({
      type: SAVED_ADD_SUCCESS,
      payload: detailsData,
    });
  } catch (error) {
    dispatch({
      type: SAVED_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
