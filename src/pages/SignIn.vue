<template>
  <div class="login-box">
    <div class="login-logo">
      <a
        href="https://inshopcrm.com"
        target="_blank"
      >
        <img
          class="mb-4"
          src="../assets/logo.png"
          alt="inshopcrm.com"
          style="width: 200px;"
        >
      </a>
    </div>
    <div class="login-box-body">
      <p class="login-box-msg">
        {{ $t('start_session') }}
      </p>

      <form
        method="post"
        @submit.prevent="signIn"
      >
        <div class="form-group">
          <label>{{ $t('username') }}:</label>
          <input
            type="text"
            class="form-control"
            :placeholder="$t('username')"
            v-model="credentials.username"
            required
            autofocus
          >
        </div>
        <div :class="[{ 'has-error': error }, 'form-group']">
          <label>{{ $t('password') }}:</label>
          <input
            type="password"
            class="form-control"
            :placeholder="$t('password')"
            v-model="credentials.password"
          >
          <span class="help-block">{{ error }}</span>
        </div>

        <div class="row">
          <div class="col-xs-8" />
          <div class="col-xs-4">
            <button
              type="submit"
              class="btn btn-primary btn-block btn-flat"
            >
              {{ $t('signin') }}
            </button>
          </div>
        </div>
      </form>

      {{ $t('powered_by') }} <a
        href="https://inshopgroup.com"
        target="_blank"
      >Inshop Group</a>
    </div>
  </div>
</template>

<script>
import * as types from '../store/modules/auth/mutation_types'
import { messages } from '../locales'

export default {
  name: 'SignIn',
  data() {
    return {
      credentials: {
        username: 'demo',
        password: 'demo'
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters['auth/error']
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch('auth/login', this.credentials)
        .then((response) => {
          this.$store.commit('auth/' + types.AUTH_UPDATE_TOKEN, response.data)
          this.$router.push({name: 'Dashboard'})

          let lang = response.data.language;

          if (lang && messages[lang]) {
            this.$store.commit('auth/' + types.AUTH_UPDATE_LANGUAGE, lang)
            this.$i18n.locale = lang
          }
        })
    }
  }
}
</script>

<style>
  .login-page {
    background: #444;
  }
</style>
