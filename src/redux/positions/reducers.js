import actions from './actions';

const initState = {
  items: {},
};
export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.POSITIONS_UPDATE: {
       action.payload.forEach(item => {
          if(state.items[item['deviceId']] === undefined) { 
            state.items[item['deviceId']] = {};
          }
          state.items[item['deviceId']] = item;
        });
    }
    
    default:
      return state;
  }
}
