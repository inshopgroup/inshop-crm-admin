<template>
  <nav class="navbar navbar-static-top" role="navigation">
    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <li class="dropdown user user-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <span class="hidden-xs">{{ username }}</span>
          </a>
          <ul class="dropdown-menu">
            <li class="user-footer">
              <div class="pull-right">
                <a href="#" class="btn btn-default btn-flat" @click.prevent="SignOut">{{$t('signout')}}</a>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'HeaderSlot',
    computed: {
      username() {
        return this.$store.getters['auth/jwtDecoded']['name']
      },
      language() {
        return this.$store.getters['auth/language']
      }
    },
    methods: {
      SignOut() {
        this.$store.dispatch('auth/logout').then(() => {
          this.$i18n.locale = this.language
        })
      }
    }
  }
</script>
