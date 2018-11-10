<template>
  <div>
    <section class="content-header">
      <h1>{{$t('contact.value')}} "{{ item && item['value'] }}"</h1>
    </section>

    <section class="content">
      <item-show-errors :entity="'contact'" :is-loading="isLoading"></item-show-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('vat.tabs.general')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <div v-if="item" class="table-responsive">
              <table class="table table-striped table-hover" v-if="item">
                <thead>
                <tr>
                  <th>{{$t('field')}}</th>
                  <th>{{$t('value')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{{$t('contact.value')}}</td>
                  <td>{{ item['value'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('contact.contactType.name')}}</td>
                  <td>{{ item['contactType']['name'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('contact.clients')}}</td>
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
                  <td>{{$t('contact.companies')}}</td>
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
                  <td>{{$t('contact.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('contact.updatedAt')}}</td>
                  <td>{{ moment(item['updateAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('contact.updatedBy')}}</td>
                  <td>{{ item['updateBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Contact'" :path="'contact'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Contact'" :path="'contact'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemShowErrors from '../layout/errors/ItemShowErrors'
import History from '../History'

export default {
  components: {History, ItemShowErrors, ItemShowActions},
  computed: mapGetters({
    isLoading: 'contact/show/isLoading',
    item: 'contact/show/retrieved'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      del: 'contact/del/del',
      reset: 'contact/show/reset',
      retrieve: 'contact/show/retrieve'
    }),

    deleteItem (item) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        this.del(item).then(() => this.$router.push({ name: 'ContactList' }))
      }
    }
  }
}
</script>
