<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('address') + ' #' + item.id }}</h1>
    </section>
    <section class="content">
      <item-errors entity="address" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#general" data-toggle="tab" aria-expanded="false">
              {{ $t('tabs_general') }}</a
            >
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
                  <tr>
                    <td>{{ $t('postCode') }}</td>
                    <td>{{ item.postCode }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('country_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.country"
                        :to="{
                          name: 'CountryShow',
                          params: { id: item.country.id }
                        }"
                      >
                        {{ item.country.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('city_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.city"
                        :to="{ name: 'CityShow', params: { id: item.city.id } }"
                      >
                        {{ item.city.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('region') }}</td>
                    <td>{{ item.region }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('district') }}</td>
                    <td>{{ item.district }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('street') }}</td>
                    <td>{{ item.street }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('building') }}</td>
                    <td>{{ item.building }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('apartment') }}</td>
                    <td>{{ item.apartment }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('comment') }}</td>
                    <td>{{ item.comment }}</td>
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
              entity="Address"
              path="address"
            />
          </div>
        </div>
      </div>
      <item-show-actions :item="item" entity="Address" path="address" />
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
    item: 'address/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'address/getItem',
      reset: 'address/reset'
    })
  }
}
</script>
