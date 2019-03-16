<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">{{$t('history.id')}}</th>
          <th>{{$t('history.version')}}</th>
          <th>{{$t('history.action')}}</th>
          <th>{{$t('history.username')}}</th>
          <th>{{$t('history.logged_at')}}</th>
          <th>{{$t('history.changes')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id">
          <td>{{ log.id }}</td>
          <td>{{ log['version'] }}</td>
          <td>{{ log['action'] }}</td>
          <td>{{ log['username'] }}</td>
          <td>{{ moment(log['logged_at']).format('DD-MM-YYYY HH:mm') }}</td>
          <td>
            <ul>
              <li v-for="(value, property) in log['data']">
                <b>{{ $t(path + '.' + property) }}:</b> {{value}}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'History',
    components: {},
    props: {
      id: {
        type: Number,
        required: true
      },
      entity: {
        type: String,
        required: true
      },
      path: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        moment: moment,
      }
    },
    mounted () {
      this.getItems({
        entity: this.entity,
        id: this.id,
      })
    },
    computed: {
      ...mapGetters({
        logs: 'history/items',
      })
    },
    methods: {
      ...mapActions({
        getItems: 'history/getItems',
      }),
    }
  }
</script>
