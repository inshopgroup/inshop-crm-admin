<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('contact_value') }} "{{ item && item.value }}"</h1>
    </section>
    <section class="content">
      <item-errors :entity="'contact'" />
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
              <table
                class="table table-striped table-hover"
                v-if="item"
              >
                <thead>
                  <tr>
                    <th>{{ $t('field') }}</th>
                    <th>{{ $t('value') }}</th>
                  </tr>
                </thead>
                <tbody> 
                  <tr>
                    <td>{{ $t('contact_value') }}</td>
                    <td>{{ item.value }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('contactType_name') }}</td>
                    <td>
                      <template v-if="item.contactType">
                        {{ item.contactType.name }}
                      </template>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('clients') }}</td>
                    <td>
                      <ul>
                        <li
                          v-for="client in item.clients"
                          :key="client.id"
                        >
                          <router-link :to="{name: 'ClientShow', params: { id: client.id }}">
                            {{ client.name }}
                          </router-link>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('companies') }}</td>
                    <td>
                      <ul>
                        <li
                          v-for="company in item.companies"
                          :key="company.id"
                        >
                          <router-link :to="{name: 'CompanyShow', params: { id: company.id }}">
                            {{ company.name }}
                          </router-link>
                        </li>
                      </ul>
                    </td>
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
                    <td>{{ item.updateBy }}</td>
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
              :entity="'Contact'"
              :path="'contact'"
              :key="historyKey"
            />
          </div>
        </div>
      </div>
      <item-show-actions
        :item="item"
        :entity="'Contact'"
        :path="'contact'"
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
    item: 'contact/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'contact/getItem',
      reset: 'contact/reset'
    })
  }
}
</script>
