const actions = {
  DEVICES_UPDATE: 'DEVICES_UPDATE',
  DEVICES_SELECT: 'DEVICES_SELECT',
  DEVICES_REMOVE: 'DEVICES_REMOVE',
  update: items => ({
    type: actions.DEVICES_UPDATE,
    payload: items
  }),
  select: deviceId => ({
    type: actions.DEVICES_SELECT,
    payload: {selectedId: deviceId}
  }),
  remove: deviceId => ({
    type: actions.DEVICES_REMOVE,
    payload: { selectedId: deviceId}
  }),
};
export default actions;
