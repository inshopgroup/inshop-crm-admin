<template>
  <v-container fluid>
    <v-row justify="space-between">
      <v-col>
        <is-title title="dashboard_title"></is-title>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="6" sm="12">
        <bar-box :title="$t('clients_30')" :data="data.clients_30" />
      </v-col>
      <v-col md="6" sm="12">
        <bar-box :title="$t('events_30')" :data="data.events_30" />
      </v-col>
    </v-row>

    <v-row>
      <v-col md="4" sm="6" xs="12">
        <doughnut-box :title="$t('user_7')" :data="data.user_7" />
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <doughnut-box :title="$t('user_30')" :data="data.user_30" />
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <doughnut-box :title="$t('user_365')" :data="data.user_365" />
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <doughnut-box :title="$t('user_time_7')" :data="data.user_time_7" />
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <doughnut-box :title="$t('user_time_30')" :data="data.user_time_30" />
      </v-col>
      <v-col md="4" sm="6" xs="12">
        <doughnut-box :title="$t('user_time_365')" :data="data.user_time_365" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarBox from '../components/chart/box/BarBox'
import DoughnutBox from '../components/chart/box/DoughnutBox'
import axios from '../interceptor'

export default {
  components: {
    DoughnutBox,
    BarBox
  },
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
      const url = `${process.env.VUE_APP_API_URL}/users/dashboard`

      axios.get(url).then(response => {
        this.data = response.data['hydra:member'][0]
      })
    }
  }
}
</script>
