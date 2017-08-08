<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="">
      <div class="form-field">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="form.username">
      </div>

      <div class="form-field">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="form.password">
      </div>

      <div class="form-field">
        <button type="submit" class="button">
          Login
        </button>

        <span>
          &bull;
        </span>

        <router-link to="/sign-up">
          Sign Up?
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'guest',

  data () {
    return {
      form: {
        username: 'selmonal@gmail.com',
        password: '123123'
      }
    }
  },

  methods: {
    /**
     * Attempt to login in to the app.
     */
    handleSubmit () {
      this.$store.dispatch('login', this.form)
        .then(this.onSuccess)
        .catch(this.onFail)
    },

    /**
     * Handle the success login response.
     */
    onSuccess (user) {
      this.$router.push('/')
    },

    /**
     * Handle the login errors.
     */
    onFail (errors) {
      alert('Please check you username or password.')
    }
  }
}
</script>
