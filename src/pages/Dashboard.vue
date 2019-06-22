<template>
  <div>
    <section class="content-header">
      <h1>
        {{ $t('dashboard_title') }}
      </h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-md-6">
          <bar-box :title="$t('clients_30')" :data="data.clients_30" />
        </div>
        <div class="col-md-6">
          <bar-box :title="$t('events_30')" :data="data.events_30" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <doughnut-box :title="$t('user_7')" :data="data.user_7" />
        </div>
        <div class="col-md-4">
          <doughnut-box :title="$t('user_30')" :data="data.user_30" />
        </div>
        <div class="col-md-4">
          <doughnut-box :title="$t('user_365')" :data="data.user_365" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <doughnut-box :title="$t('user_time_7')" :data="data.user_time_7" />
        </div>
        <div class="col-md-4">
          <doughnut-box :title="$t('user_time_30')" :data="data.user_time_30" />
        </div>
        <div class="col-md-4">
          <doughnut-box
            :title="$t('user_time_365')"
            :data="data.user_time_365"
          />
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
  components: { DoughnutBox, BarBox },
  data() {
    return {
      data: {}
    }
  },
  mounted() {
    if (!this.isGranted('ROLE_USER_DASHBOARD')) {
      this.$router.push('/')
    }

    this.getData()
  },
  methods: {
    getData() {
      let url = process.env.VUE_APP_API_URL + '/users/dashboard'

      axios.get(url).then(response => {
        this.data = response.data['hydra:member'][0]
      })
    }
  }
}
</script>
