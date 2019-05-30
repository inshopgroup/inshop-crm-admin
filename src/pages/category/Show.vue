<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.name }}</h1>
    </section>
    <section class="content">
      <item-errors entity="category" />
      <div class="nav-tabs-custom">
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
            <div
              v-if="item"
              class="table-responsive"
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
                    <td>{{ translate(item).name }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('description') }}</td>
                    <td>{{ translate(item).description }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('isActive') }}</td>
                    <td>{{ item.isActive ? $t('yes') : $t('no') }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('position') }}</td>
                    <td>{{ item.position }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('parent_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.parent"
                        :to="{name: 'CategoryShow', params: { id: item.parent.id }}"
                      >
                        {{ item.parent.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('createdAt') }}</td>
                    <td>{{ crmDateFormat(item.createdAt) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('updatedAt') }}</td>
                    <td>{{ crmDateFormat(item.updatedAt) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('updatedBy') }}</td>
                    <td>{{ item.updatedBy }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="tab-pane"
            id="history"
          >
            <history
              :id="parseInt($route.params.id)"
              entity="Category"
              path="category"
              :key="historyKey"
            />
          </div>
        </div>
      </div>

      <item-show-actions
        :item="item"
        entity="Category"
        path="category"
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
    item: 'category/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'category/getItem',
      reset: 'category/reset'
    })
  }
}
</script>
