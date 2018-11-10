<template>
  <!--<header>-->
    <!--<b-navbar toggleable="md" type="light" variant="light">-->

      <!--<b-navbar-brand href="#">{{$t('title')}}</b-navbar-brand>-->

      <!--<a href="#" data-target="#sidebar" data-toggle="collapse"><i class="fa fa-navicon py-2 p-1"></i></a>-->

      <!--<b-collapse is-nav id="nav_collapse">-->
        <!--<b-navbar-nav class="ml-auto">-->
          <!--<b-nav-item-dropdown right>-->
            <!--<template slot="button-content">-->
              <!--<em>{{ username }}</em>-->
            <!--</template>-->
            <!--<a href="#" @click="SignOut" class="dropdown-item">{{$t('auth.signout')}}</a>-->
          <!--</b-nav-item-dropdown>-->
        <!--</b-navbar-nav>-->
      <!--</b-collapse>-->
    <!--</b-navbar>-->
  <!--</header>-->

  <nav class="navbar navbar-static-top" role="navigation">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>
    <!-- Navbar Right Menu -->
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <!-- Messages: style can be found in dropdown.less-->
        <!--<li class="dropdown messages-menu">-->
          <!--&lt;!&ndash; Menu toggle button &ndash;&gt;-->
          <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
            <!--<i class="fa fa-envelope-o"></i>-->
            <!--<span class="label label-success">4</span>-->
          <!--</a>-->
          <!--<ul class="dropdown-menu">-->
            <!--<li class="header">You have 4 messages</li>-->
            <!--<li>-->
              <!--&lt;!&ndash; inner menu: contains the messages &ndash;&gt;-->
              <!--<ul class="menu">-->
                <!--<li>&lt;!&ndash; start message &ndash;&gt;-->
                  <!--<a href="#">-->
                    <!--<div class="pull-left">-->
                      <!--&lt;!&ndash; User Image &ndash;&gt;-->
                      <!--<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">-->
                    <!--</div>-->
                    <!--&lt;!&ndash; Message title and timestamp &ndash;&gt;-->
                    <!--<h4>-->
                      <!--Support Team-->
                      <!--<small><i class="fa fa-clock-o"></i> 5 mins</small>-->
                    <!--</h4>-->
                    <!--&lt;!&ndash; The message &ndash;&gt;-->
                    <!--<p>Why not buy a new awesome theme?</p>-->
                  <!--</a>-->
                <!--</li>-->
                <!--&lt;!&ndash; end message &ndash;&gt;-->
              <!--</ul>-->
              <!--&lt;!&ndash; /.menu &ndash;&gt;-->
            <!--</li>-->
            <!--<li class="footer"><a href="#">See All Messages</a></li>-->
          <!--</ul>-->
        <!--</li>-->
        <!-- /.messages-menu -->

        <!-- Notifications Menu -->
        <!--<li class="dropdown notifications-menu">-->
          <!--&lt;!&ndash; Menu toggle button &ndash;&gt;-->
          <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
            <!--<i class="fa fa-bell-o"></i>-->
            <!--<span class="label label-warning">10</span>-->
          <!--</a>-->
          <!--<ul class="dropdown-menu">-->
            <!--<li class="header">You have 10 notifications</li>-->
            <!--<li>-->
              <!--&lt;!&ndash; Inner Menu: contains the notifications &ndash;&gt;-->
              <!--<ul class="menu">-->
                <!--<li>&lt;!&ndash; start notification &ndash;&gt;-->
                  <!--<a href="#">-->
                    <!--<i class="fa fa-users text-aqua"></i> 5 new members joined today-->
                  <!--</a>-->
                <!--</li>-->
                <!--&lt;!&ndash; end notification &ndash;&gt;-->
              <!--</ul>-->
            <!--</li>-->
            <!--<li class="footer"><a href="#">View all</a></li>-->
          <!--</ul>-->
        <!--</li>-->
        <!-- Tasks Menu -->
        <!--<li class="dropdown tasks-menu">-->
          <!--&lt;!&ndash; Menu Toggle Button &ndash;&gt;-->
          <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
            <!--<i class="fa fa-flag-o"></i>-->
            <!--<span class="label label-danger">9</span>-->
          <!--</a>-->
          <!--<ul class="dropdown-menu">-->
            <!--<li class="header">You have 9 tasks</li>-->
            <!--<li>-->
              <!--&lt;!&ndash; Inner menu: contains the tasks &ndash;&gt;-->
              <!--<ul class="menu">-->
                <!--<li>&lt;!&ndash; Task item &ndash;&gt;-->
                  <!--<a href="#">-->
                    <!--&lt;!&ndash; Task title and progress text &ndash;&gt;-->
                    <!--<h3>-->
                      <!--Design some buttons-->
                      <!--<small class="pull-right">20%</small>-->
                    <!--</h3>-->
                    <!--&lt;!&ndash; The progress bar &ndash;&gt;-->
                    <!--<div class="progress xs">-->
                      <!--&lt;!&ndash; Change the css width attribute to simulate progress &ndash;&gt;-->
                      <!--<div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar"-->
                           <!--aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">-->
                        <!--<span class="sr-only">20% Complete</span>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</li>-->
                <!--&lt;!&ndash; end task item &ndash;&gt;-->
              <!--</ul>-->
            <!--</li>-->
            <!--<li class="footer">-->
              <!--<a href="#">View all tasks</a>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</li>-->
        <!-- User Account Menu -->
        <li class="dropdown user user-menu">
          <!-- Menu Toggle Button -->
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <!-- The user image in the navbar-->
            <!--<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">-->
            <!-- hidden-xs hides the username on small devices so only the image appears. -->
            <span class="hidden-xs">{{ username }}</span>
          </a>
          <ul class="dropdown-menu">
            <!-- The user image in the menu -->
            <!--<li class="user-header">-->
              <!--&lt;!&ndash;<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">&ndash;&gt;-->

              <!--<p>-->
                <!--Alexander Pierce - Web Developer-->
                <!--<small>Member since Nov. 2012</small>-->
              <!--</p>-->
            <!--</li>-->
            <!-- Menu Body -->
            <!--<li class="user-body">-->
              <!--<div class="row">-->
                <!--<div class="col-xs-4 text-center">-->
                  <!--<a href="#">Followers</a>-->
                <!--</div>-->
                <!--<div class="col-xs-4 text-center">-->
                  <!--<a href="#">Sales</a>-->
                <!--</div>-->
                <!--<div class="col-xs-4 text-center">-->
                  <!--<a href="#">Friends</a>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash; /.row &ndash;&gt;-->
            <!--</li>-->
            <!-- Menu Footer-->
            <li class="user-footer">
              <!--<div class="pull-left">-->
                <!--<a href="#" class="btn btn-default btn-flat">Profile</a>-->
              <!--</div>-->
              <div class="pull-right">
                <a href="#" class="btn btn-default btn-flat" @click.prevent="SignOut">{{$t('auth.signout')}}</a>
              </div>
            </li>
          </ul>
        </li>
        <!-- Control Sidebar Toggle Button -->
        <!--<li>-->
          <!--<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>-->
        <!--</li>-->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderSlot',
  data () {
    return {
    }
  },
  computed: {
    username () {
      return this.$store.getters['auth/jwtDecoded']['name']
    },
    language () {
      return this.$store.getters['auth/language']
    }
  },
  methods: {
    SignOut () {
      this.$store.dispatch('auth/logout').then(() => {
        this.$i18n.locale = this.language
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
