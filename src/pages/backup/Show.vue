<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>
    <section class="content">
      <item-errors :entity="'backup'" />
      <div
        class="nav-tabs-custom"
        v-if="item"
      >
        <ul class="nav nav-tabs">
          <li class="active">
            <a
              href="#general"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_general') }}</a>
          </li>
          <li>
            <a
              href="#history"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_history') }}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div
            class="tab-pane active"
            id="general"
          >
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th width="20%">
                    {{ $t('field') }}
                  </th>
                  <th>{{ $t('value') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t('name') }}</td>
                  <td>{{ item['name'] }}</td>
                </tr>
                <tr>
                  <td>{{ $t('size') }}</td>
                  <td>{{ item['size'] }}</td>
                </tr>
                <tr>
                  <td>{{ $t('status_name') }}</td>
                  <td><span v-if="item['status']">{{ item['status']['name'] }}</span></td>
                </tr>
                <tr>
                  <td>{{ $t('type_name') }}</td>
                  <td><span v-if="item['type']">{{ item['type']['name'] }}</span></td>
                </tr>
                <tr>
                  <td>{{ $t('createdAt') }}</td>
                  <td>{{ dateFormat(item.createdAt) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('updatedAt') }}</td>
                  <td>{{ dateFormat(item.updatedAt) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('updatedBy') }}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="tab-pane"
            id="history"
          >
            <history
              :id="parseInt($route.params.id)"
              :entity="'Backup'"
              :path="'backup'"
              :key="historyKey"
            />
          </div>
        </div>
      </div>
      <item-show-actions
        :item="item"
        :entity="'Backup'"
        :path="'backup'"
      />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import History from '../../components/History'

export default {
  components: { History, ItemErrors, ItemShowActions },
  data () {
    return {
      historyKey: 1
    }
  },
  computed: mapGetters({
    item: 'backup/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'backup/getItem',
      reset: 'backup/reset'
    })
  }
}
</script>
