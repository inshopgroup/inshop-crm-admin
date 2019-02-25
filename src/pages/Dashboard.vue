<template>
 <div>
   <section class="content-header">
     <h1>
       {{$t('dashboard.title')}}
     </h1>
   </section>

   <section class="content">
     <div class="row">
       <div class="col-md-6">
        <bar-box
                :title="$t('dashboard.clients_30')"
                :data="data.clients_30"
        ></bar-box>
       </div>
       <div class="col-md-6">
         <bar-box
                 :title="$t('dashboard.events_30')"
                 :data="data.events_30"
         ></bar-box>
       </div>
     </div>
     <div class="row">
       <div class="col-md-4">
        <doughnut-box
                :title="$t('dashboard.user_7')"
                :data="data.user_7"
        ></doughnut-box>
       </div>
       <div class="col-md-4">
        <doughnut-box
                :title="$t('dashboard.user_30')"
                :data="data.user_30"
        ></doughnut-box>
       </div>
       <div class="col-md-4">
        <doughnut-box
                :title="$t('dashboard.user_365')"
                :data="data.user_365"
        ></doughnut-box>
       </div>
     </div>
     <div class="row">
       <div class="col-md-4">
         <doughnut-box
                 :title="$t('dashboard.user_time_7')"
                 :data="data.user_time_7"
         ></doughnut-box>
       </div>
       <div class="col-md-4">
         <doughnut-box
                 :title="$t('dashboard.user_time_30')"
                 :data="data.user_time_30"
         ></doughnut-box>
       </div>
       <div class="col-md-4">
         <doughnut-box
                 :title="$t('dashboard.user_time_365')"
                 :data="data.user_time_365"
         ></doughnut-box>
       </div>
     </div>
   </section>
 </div>
</template>

<script>
import BarBox from '../components/chart/box/BarBox'
import DoughnutBox from '../components/chart/box/DoughnutBox'
import axios from '../interceptor'

export default {
  components: {DoughnutBox, BarBox},
  data () {
    return {
      data: {},
    }
  },
  mounted () {
    if (!this.isGranted('ROLE_USER_DASHBOARD')) {
      this.$router.push('/')
    }

    this.getData()
  },
  methods: {
    getData () {
      let url = process.env.API_URL + '/users/dashboard'
      // let url = process.env.API_URL + '/users/dashboard?XDEBUG_SESSION_START=PHPSTORM'

      axios.get(url)
        .then(response => {
          this.data = response.data['hydra:member'][0]
        })
    }
  }
}
</script>
