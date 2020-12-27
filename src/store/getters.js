const getters = {
  sidebar: state => state.app.sidebar,
  panel: state => state.app.panel,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
