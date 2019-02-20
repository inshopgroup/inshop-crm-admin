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
        <tr v-for="log in logs" :key="log['id']">
          <td>{{ log['id'] }}</td>
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
  import axios from '../interceptor'

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
        logs: []
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        let url = process.env.API_URL + '/history/' + this.entity + '/' + this.id

        axios.get(url)
          .then(response => {
            this.logs = response.data
          })
      }
    }
  }
</script>
