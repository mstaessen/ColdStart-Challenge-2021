import axios from 'axios';
import API from '../config';
import { parseItem } from './action-utils';
import { ORDER_PRODUCT } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    [ORDER_PRODUCT](state, order) {
      state.orders.push(order);
    },
  },
  actions: {
    async orderProductAction({ commit }, productId) {
      try {
        const response = await axios.post(`${API}/orders`, { productId });
        const order = parseItem(response, 201);
        commit(ORDER_PRODUCT, order);
        return order;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    orders: (state) => state.orders,
  },
};
