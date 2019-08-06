<template>
  <v-app id="inspire">
    <v-content>
      <v-container
          fluid
          fill-height
      >

        <v-layout
            align-center
            justify-center
        >
          <v-flex
              xs12
              sm8
              md4
              lg3
          >

          <v-layout
              column
          >
            <v-flex text-center pb-3>
              <a href="https://inshopcrm.com" target="_blank">
                <img
                    src="../assets/logo.png"
                    alt="inshopcrm.com"
                    style="width: 40%;"
                />
              </a>
            </v-flex>

            <v-flex>
              <v-card class="elevation-12">
                <v-form @submit.prevent="signIn">
                  <v-toolbar
                      color="dark"
                      dark
                      flat
                  >
                    <v-toolbar-title>Sign in to start the session</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field
                        :label="$t('username')"
                        name="login"
                        prepend-icon="person"
                        type="text"
                        v-model="credentials.username"
                        :error="hasError"
                        :error-messages="error"
                    ></v-text-field>

                    <v-text-field
                        id="password"
                        :label="$t('password')"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        v-model="credentials.password"
                        :error="hasError"
                        :error-messages="error"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit">{{ $t('signin') }}</v-btn>

                  </v-card-actions>
                </v-form>
              </v-card>
            </v-flex>
          </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <is-footer></is-footer>
  </v-app>
</template>

<script>
  import * as types from '../store/modules/auth/mutation_types'
  import {messages} from '../locales'

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
      },
      hasError() {
        return this.error !== null
      }
    },
    methods: {
      signIn() {
        this.$store.dispatch('auth/login', this.credentials).then(response => {
          this.$store.commit('auth/' + types.AUTH_UPDATE_TOKEN, response.data)
          this.$router.push({name: 'Dashboard'})

          let lang = response.data.language

          if (lang && messages[lang]) {
            this.$store.commit('auth/' + types.AUTH_UPDATE_LANGUAGE, lang)
            this.$i18n.locale = lang
          }
        }).catch(() => {})
      }
    }
  }
</script>
