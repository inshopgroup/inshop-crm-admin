<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th style="width: 75px;">
            {{ $t('id') }}
          </th>
          <th>{{ $t('version') }}</th>
          <th>{{ $t('action') }}</th>
          <th>{{ $t('username') }}</th>
          <th>{{ $t('logged_at') }}</th>
          <th>{{ $t('changes') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="log in logs"
          :key="log.id"
        >
          <td>{{ log.id }}</td>
          <td>{{ log.version }}</td>
          <td>{{ log.action }}</td>
          <td>{{ log.username }}</td>
          <td>{{ dateFormat(log.loggedAt) }}</td>
          <td>
            <ul>
              <li
                v-for="(value, property) in log.data"
                :key="property"
              >
                <b>{{ $t(property) }}:</b> {{ value }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
  mounted () {
    this.getItems({
      entity: this.entity,
      id: this.id
    })
  },
  computed: {
    ...mapGetters({
      logs: 'history/items'
    })
  },
  methods: {
    ...mapActions({
      getItems: 'history/getItems'
    })
  }
}
</script>
