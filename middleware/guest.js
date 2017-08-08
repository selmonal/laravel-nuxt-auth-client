export default ({ store, redirect }) => {
  if (store.getters.loggedIn) {
    redirect('/')
  }
}
