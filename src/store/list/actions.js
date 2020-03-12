const clearListItem = async ({ commit }, payload) => {
  commit('CLEAR_LIST_ITEM', payload);
};

const clearList = async ({ commit }) => {
  commit('CLEAR_LIST');
};

const saveActivity = async ({ commit }, payload) => {
  const activity = null;
  commit('SAVE_ACTIVITY', payload);
  return activity;
};

export default {
  clearList,
  clearListItem,
  saveActivity,
};
