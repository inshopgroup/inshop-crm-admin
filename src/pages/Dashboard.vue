<template>
  <is-main-template title="dashboard_title">
    <v-container fluid>
      <v-layout row>
        <v-flex md6 sm12 pa-2>
          <bar-box :title="$t('clients_30')" :data="data.clients_30" />
        </v-flex>
        <v-flex md6 sm12 pa-2>
          <bar-box :title="$t('events_30')" :data="data.events_30" />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex md4 sm12 pa-2>
          <doughnut-box :title="$t('user_7')" :data="data.user_7" />
        </v-flex>
        <v-flex md4 sm12 pa-2>
          <doughnut-box :title="$t('user_30')" :data="data.user_30" />
        </v-flex>
        <v-flex md4 sm12 pa-2>
          <doughnut-box :title="$t('user_365')" :data="data.user_365" />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex md4 sm12 pa-2>
          <doughnut-box :title="$t('user_time_7')" :data="data.user_time_7" />
        </v-flex>
        <v-flex md4 sm12 pa-2>
          <doughnut-box :title="$t('user_time_30')" :data="data.user_time_30" />
        </v-flex>
        <v-flex md4 sm12 pa-2>
          <doughnut-box :title="$t('user_time_365')" :data="data.user_time_365" />
        </v-flex>
      </v-layout>
    </v-container>
  </is-main-template>
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
      let url = process.env.VUE_APP_API_URL + '/users/dashboard'

      axios.get(url).then(response => {
        this.data = response.data['hydra:member'][0]
      })
    }
  }
}
</script>
