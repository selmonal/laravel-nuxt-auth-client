<template>
  <div class="height-md border-bt-grey vcentered margin-bt-md">
    <div class="container flex-space-between">
      <Logo />

      <div class="navbar-right" v-if="!loggedIn">
        <router-link to="/login">
          Login
        </router-link>

        <span>
          &bull;
        </span>

        <router-link to="/sign-up">
          Sign Up?
        </router-link>
      </div>

      <div class="navbar-right" v-if="loggedIn">
        <span>
          {{ user.name }}
        </span>

        <span>
          &bull;
        </span>

        <a @click="logout">
          Logout
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    Logo
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    ...mapGetters(['loggedIn'])
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(response => {

        })
    }
  }
}
</script>
