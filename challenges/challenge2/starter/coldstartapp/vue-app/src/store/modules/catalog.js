import axios from 'axios';
import API from '../config';
import { parseItem } from './action-utils';
import { GET_CATALOG } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    catalog: [],
  },
  mutations: {
    [GET_CATALOG](state, catalog) {
      state.catalog = catalog;
    },
  },
  actions: {
    async getCatalogAction({ commit }) {
      try {
        const response = await axios.get(`${API}/catalog`);
        const catalog = parseItem(response, 200);
        commit(GET_CATALOG, catalog);
        return catalog;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    icecreams: (state) => state.catalog.icecreams,
    featuredIcecreamId: (state) => state.catalog.featuredIcecreamId,
    personalizerEventId: (state) => state.catalog.personalizerEventId,
  },
};
