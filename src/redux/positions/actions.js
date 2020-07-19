const actions = {
  POSITIONS_UPDATE: 'POSITIONS_UPDATE',
  update: items => ({
    type: actions.POSITIONS_UPDATE,
    payload: items
  }),
};
export default actions;
