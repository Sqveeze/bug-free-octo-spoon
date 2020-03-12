import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import activities from './activities';
import list from './list';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['list'],
  })],
  modules: {
    activities,
    list,
  },
});
