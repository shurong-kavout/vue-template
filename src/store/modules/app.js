import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
    withoutAnimation: false
  },
  panel: {
    opened: Cookies.get('panelStatus') ? !!+Cookies.get('panelStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    Cookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0)
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_PANEL: state => {
    state.panel.opened = !state.panel.opened
    state.panel.withoutAnimation = false
    Cookies.set('panelStatus', state.panel.opened ? 1 : 0)
  },
  CLOSE_PANEL: (state, withoutAnimation) => {
    Cookies.set('panelStatus', 0)
    state.panel.opened = false
    state.panel.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  togglePanel({ commit }) {
    commit('TOGGLE_PANEL')
  },
  closePanel({ commit }, { withoutAnimation }) {
    commit('CLOSE_PANEL', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
