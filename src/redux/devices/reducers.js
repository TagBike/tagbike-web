import actions from './actions';

const initState = {
  items: {},
  selectedId: null
};
export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.DEVICES_UPDATE: {
       action.payload.forEach(item => state.items[item['id']] = item);
    }
    case actions.DEVICES_SELECT: {
      return {
        ...state,
        selectId: action.payload.id
      }
      
    }
    case actions.DEVICES_REMOVE: {
      delete state.items[action.payload];
      break;
    }
    
    default:
      return state;
  }
}
