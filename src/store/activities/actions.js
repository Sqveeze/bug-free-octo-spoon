import axios from 'axios';

const getActivity = async ({ commit }, payload = null) => {
  let activity = null;
  try {
    if (payload) {
      activity = await axios.get('https://www.boredapi.com/api/activity', {
        ...payload,
      });
    } else {
      activity = await axios.get('https://www.boredapi.com/api/activity');
    }
  } catch (e) {
    throw new Error(e);
  }
  if (activity.data.error) throw new Error(activity.data.error);
  commit('SET_ACTIVITY', activity.data);
  return activity;
};

export default {
  getActivity,
};
