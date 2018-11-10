<template>
<div class="wrapper">

  <!-- Main Header -->
  <header class="main-header">

    <!-- Logo -->
    <a href="/" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <!--<span class="logo-mini"><b>A</b>LT</span>-->
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">{{$t('title')}}</span>
    </a>

    <!-- Header Navbar -->
    <header-slot></header-slot>
  </header>

  <left-sidebar-slot></left-sidebar-slot>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content container-fluid">
      <router-view></router-view>
    </section>

    <!--&lt;!&ndash; Content Header (Page header) &ndash;&gt;-->
    <!--<section class="content-header">-->
    <!--<h1>-->
    <!--Page Header-->
    <!--<small>Optional description</small>-->
    <!--</h1>-->
    <!--<ol class="breadcrumb">-->
    <!--<li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>-->
    <!--<li class="active">Here</li>-->
    <!--</ol>-->
    <!--</section>-->

    <!--&lt;!&ndash; Main content &ndash;&gt;-->
    <!--<section class="content container-fluid">-->

    <!--&lt;!&ndash;-------------------------->
    <!--| Your Page Content Here |-->
    <!--------------------------&ndash;&gt;-->

    <!--</section>-->
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <footer-slot></footer-slot>

  <!--<control-sidebar-slot></control-sidebar-slot>-->

  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
  immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>

  <modal-not-done-tasks :tasks="tasks"></modal-not-done-tasks>
</div>
<!--<div class="container-fluid">-->
<!--<header-slot></header-slot>-->
<!--<div class="row">-->
<!--<div class="col pl-0 pr-0 collapse width show" id="sidebar">-->
<!--<sidebar-slot></sidebar-slot>-->
<!--</div>-->
<!--<div class="col px-5 p-md-4">-->
<!--<router-view></router-view>-->
<!--</div>-->
<!--</div>-->
<!--<footer-slot></footer-slot>-->
<!--</div>-->
</template>

<script>
import HeaderSlot from '../../components/layout/HeaderSlot.vue'
import FooterSlot from '../../components/layout/FooterSlot.vue'
import LeftSidebarSlot from '../../components/layout/LeftSidebarSlot.vue'
import ControlSidebarSlot from '../../components/layout/ControlSidebarSlot.vue'
import ModalNotDoneTasks from './ModalNotDoneTasks'
import axios from '../../interceptor'

export default {
  components: {ModalNotDoneTasks, LeftSidebarSlot, ControlSidebarSlot, FooterSlot, HeaderSlot},
  name: 'MainSlot',
  data () {
    return {
      tasks: []
    }
  },
  mounted () {
    $('ul').tree({})
    $('body').resize()

    if (this.isGranted('ROLE_TASK_LIST')) {
      this.getTasks()
    }
  },
  methods: {
    getTasks () {
      let url = process.env.API_URL + '/tasks/deadline'

      axios.get(url)
        .then(response => {
          this.tasks = response.data['hydra:member']

          if (this.tasks.length) {
            $('#modal-not-done-tasks').modal('show')
          }
        })
    }
  }
}
</script>
