import router from '../../router';

const state = {
    token: window.localStorage.getItem('token'),
    uuid: window.localStorage.getItem('uuid')
};

const getters = {
    isLoggedIn: state => !!state.token,
    getUuid: state => state.uuid,
    getToken: state => state.token
};

const actions = {
    // Both signin and signup use this method
    login: ({ commit }, { token, uuid }) => {
        commit('setToken', token);
        commit('setUuid', uuid);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('uuid', uuid);
        router.push('/me');
    },
    logout: ({ commit }) => {
        commit('setToken', null);
        commit('setUuid', null);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('uuid');
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUuid: (state, uuid) => {
        state.uuid = uuid;
    }
};

export default  {
    state,
    getters,
    actions,
    mutations
};