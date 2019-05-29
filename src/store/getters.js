const getters = {
  language: state => state.app.language,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles
}
export default getters
