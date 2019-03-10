import router from '../../router';

const state = {
    token: window.localStorage.getItem('token'),
    uuid: window.localStorage.getItem('uuid'),
    name: window.localStorage.getItem('name')
};

const getters = {
    isLoggedIn: state => !!state.token,
    getUuid: state => state.uuid,
    getToken: state => state.token,
    getName: state => state.name
};

const actions = {
    // Both signin and signup use this method
    login: ({ commit }, { token, uuid, name }) => {
        commit('setToken', token);
        commit('setUuid', uuid);
        commit('setName', name);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('uuid', uuid);
        window.localStorage.setItem('name', name);
        router.push('/me');
    },
    logout: ({ commit }) => {
        commit('setToken', null);
        commit('setUuid', null);
        commit('setName', null);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('uuid');
        window.localStorage.removeItem('name');
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setUuid: (state, uuid) => {
        state.uuid = uuid;
    },
    setName: (state, name) => {
        state.name = name;
    }
};

export default  {
    state,
    getters,
    actions,
    mutations
};