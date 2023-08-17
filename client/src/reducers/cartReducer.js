import * as actionType from "../action-type/cartActionType";

const initialState = {
  cartItems: [],
  stateChangeNotifyCounter: 1,
  checkBoxValues: {}
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const item = action.payload.item;
      const existItem = state.cartItems.find(
        (product) => product._id === item._id
      );

      if (existItem) {
        return state;
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload.item],
        };
      }

    case actionType.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product._id !== action.payload.id
        ),
      };

    case actionType.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    case actionType.UPDATE_QTY:
      let index = 0;
      state.cartItems.map((product, i) => {
        if (product._id === action.payload.productId) {
          index = i;
        }
      });
      state.cartItems[index].qty = action.payload.qty;
      return {
        ...state,
        cartItems: state.cartItems,
        stateChangeNotifyCounter: state.stateChangeNotifyCounter + 1,
      };
    case actionType.SET_CART_ITEMS:

      const cartItems = action.payload.cartItems;

      return {
        ...state,
        cartItems: cartItems,
      };

    case actionType.UPDATE_CHECKBOX_VALUES:
      return {
        ...state,
        checkboxValues: {
          ...state.checkboxValues,
          [action.payload.itemid]: action.payload.isChecked
        }
      };

    default:
      return state;
  }
};

export default cartReducer;
