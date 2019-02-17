<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'address'" :is-loading="isLoading"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('address.tabs.general')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <div v-if="item" class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                <tr>
                  <th width="20%">{{$t('field')}}</th>
                  <th>{{$t('value')}}</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                  <td>{{$t('address.clients')}}</td>
                  <td>
                    <ul>
                      <li v-for="client in item['clients']">
                        <router-link :to="{name: 'ClientShow', params: { id: client['@id'] }}">
                          {{ client['name'] }}
                        </router-link>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('address.companies')}}</td>
                  <td>
                    <ul>
                      <li v-for="company in item['companies']">
                        <router-link :to="{name: 'CompanyShow', params: { id: company['@id'] }}">
                          {{ company['name'] }}
                        </router-link>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('address.postCode')}}</td>
                  <td>{{ item['postCode'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.country.name')}}</td>
                  <td>
                    <router-link v-if="item['country']" :to="{name: 'CountryShow', params: { id: item['country']['@id'] }}">
                      {{ item['country']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('address.city.name')}}</td>
                  <td>
                    <router-link v-if="item['city']" :to="{name: 'CityShow', params: { id: item['city']['@id'] }}">
                      {{ item['city']['name'] }}
                    </router-link>
                  </td>
                </tr>

                <tr>
                  <td>{{$t('address.region')}}</td>
                  <td>{{ item['region'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.district')}}</td>
                  <td>{{ item['district'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.street')}}</td>
                  <td>{{ item['street'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.building')}}</td>
                  <td>{{ item['building'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.apartment')}}</td>
                  <td>{{ item['apartment'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.comment')}}</td>
                  <td>{{ item['comment'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('address.updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Address'" :path="'address'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Address'" :path="'address'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemErrors from '../layout/errors/ItemErrors'
import History from '../History'

export default {
  components: {History, ItemErrors, ItemShowActions },
  computed: mapGetters({
    isLoading: 'general/isLoading',
    item: 'address/item'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      reset: 'address/reset',
      getItem: 'address/getItem'
    })
  }
}
</script>
