<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('contact_value') }} "{{ item && item.value }}"</h1>
    </section>
    <section class="content">
      <item-errors entity="contact" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#general" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_general')
            }}</a>
          </li>
          <li>
            <a href="#history" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_history')
            }}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="general" class="tab-pane active">
            <div v-if="item" class="table-responsive">
              <table v-if="item" class="table table-striped table-hover">
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
                        <li v-for="client in item.clients" :key="client.id">
                          <router-link
                            :to="{
                              name: 'ClientShow',
                              params: { id: client.id }
                            }"
                          >
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
                        <li v-for="company in item.companies" :key="company.id">
                          <router-link
                            :to="{
                              name: 'CompanyShow',
                              params: { id: company.id }
                            }"
                          >
                            {{ company.name }}
                          </router-link>
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <show-row-is-active :item="item" />
                  <show-row-created-at :item="item" />
                  <show-row-updated-at :item="item" />
                  <show-row-updated-by :item="item" />
                </tbody>
              </table>
            </div>
          </div>
          <div id="history" class="tab-pane">
            <history
              :id="parseInt($route.params.id)"
              :key="historyKey"
              entity="Contact"
              path="contact"
            />
          </div>
        </div>
      </div>
      <item-show-actions :item="item" entity="Contact" path="contact" />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import History from '../../components/History'
import ShowRowIsActive from '../../components/Show/ShowRowIsActive'
import ShowRowCreatedAt from '../../components/Show/ShowRowCreatedAt'
import ShowRowUpdatedAt from '../../components/Show/ShowRowUpdatedAt'
import ShowRowUpdatedBy from '../../components/Show/ShowRowUpdatedBy'

export default {
  components: {
    ShowRowUpdatedBy,
    ShowRowUpdatedAt,
    ShowRowCreatedAt,
    ShowRowIsActive,
    History,
    ItemErrors,
    ItemShowActions
  },
  data() {
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
