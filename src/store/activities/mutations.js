import Vue from 'vue';

const SET_ACTIVITY = (state, payload) => {
  Vue.set(state, 'activity', payload);
};

export default {
  SET_ACTIVITY,
};
