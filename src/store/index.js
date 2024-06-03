import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pageState: false,
        latitude: 40.10038,
        longitude: 116.36867,
    },
    mutations: {
        updatePageState(state, flag) {
            state.pageState = flag;
        }
    },
    actions: {
        delayUpdatePageState(context, flag=true) {
            if (flag) {
                setTimeout(() => {
                    context.commit('updatePageState', flag);
                }, 300);
            } else {
                context.commit('updatePageState', false);
            }
        }
    },
    modules: {
        login
    }
})