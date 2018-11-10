<template>
<div class="login-box">
  <div class="login-logo">
    <a href="https://inshopcrm.com" target="_blank">
      <img class="mb-4" src="../assets/logo.png" alt="inshopcrm.com" style="width: 200px;">
    </a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">{{$t('auth.start_session')}}</p>

    <form method="post" @submit.prevent="signIn">
      <div class="form-group">
        <label>{{$t('auth.username')}}:</label>
        <input type="text" class="form-control" :placeholder="$t('auth.username')" v-model="credentials.username" required autofocus>
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div :class="[{ 'has-error': error }, 'form-group']">
        <label>{{$t('auth.password')}}:</label>
        <input type="password" class="form-control" :placeholder="$t('auth.password')" v-model="credentials.password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        <span class="help-block">{{ error }}</span>
      </div>

      <div class="row">
        <div class="col-xs-8">
          <!--<div class="checkbox icheck">-->
            <!--<label>-->
              <!--<input type="checkbox"> Remember Me-->
            <!--</label>-->
          <!--</div>-->
        </div>
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">{{$t('auth.signin')}}</button>
        </div>
      </div>
    </form>

    <!--<div class="social-auth-links text-center">-->
      <!--<p>- OR -</p>-->
      <!--<a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using-->
        <!--Facebook</a>-->
      <!--<a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using-->
        <!--Google+</a>-->
    <!--</div>-->
    <!--&lt;!&ndash; /.social-auth-links &ndash;&gt;-->

    <!--<a href="#">I forgot my password</a><br>-->
    <!--<a href="register.html" class="text-center">Register a new membership</a>-->
    {{$t('powered_by')}} <a href="https://inshopgroup.com" target="_blank">Inshop Group</a>

  </div>
  <!-- /.login-box-body -->
</div>
  <!--<div class="wrapper">-->
    <!--<form class="form-signin" @submit.prevent="signIn">-->
      <!--<img class="mb-4" src="../assets/logo.png" alt="" style="margin-left: 85px;">-->
      <!--<input type="text" v-model="credentials.username" class="form-control" :placeholder="$t('auth.username')" required autofocus style="margin-top: 20px;">-->
      <!--<input type="password" v-model="credentials.password" class="form-control" :placeholder="$t('auth.password')" required>-->
      <!--<div class="error">{{ error }}</div>-->
      <!--<button class="btn btn-lg btn-primary btn-block" type="submit">{{$t('auth.signin')}}</button>-->
      <!--<p class="mt-5 mb-3 text-muted">{{$t('powered_by')}} <a href="https://inshopgroup.com" target="_blank" a>Inshop Group</a></p>-->
    <!--</form>-->
  <!--</div>-->
</template>

<script>
import * as types from '../store/modules/auth/mutation_types'
import {messages} from '../locales'

export default {
  name: 'SignIn',
  data () {
    return {
      credentials: {
        username: 'demo',
        password: 'demo'
      }
    }
  },
  computed: {
    error () {
      return this.$store.getters['auth/error']
    }
  },
  methods: {
    signIn () {
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
