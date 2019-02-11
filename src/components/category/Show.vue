<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'category'" :is-loading="isLoading"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('category.tabs.general')}}</a></li>
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
                  <td>{{$t('category.name')}}</td>
                  <td>{{ translation(item).name }}</td>
                </tr>
                <tr>
                  <td>{{$t('category.description')}}</td>
                  <td>{{ translation(item).description }}</td>
                </tr>
                <tr>
                  <td>{{$t('category.isActive')}}</td>
                  <td>{{ item.isActive ? $t('yes') : $t('no') }}</td>
                </tr>
                <tr>
                  <td>{{$t('category.position')}}</td>
                  <td>{{ item.position }}</td>
                </tr>
                <tr>
                  <td>{{$t('category.parent.name')}}</td>
                  <td>
                    <router-link v-if="item['parent']" :to="{name: 'CategoryShow', params: { id: item['parent']['@id'] }}">
                      {{ item['parent']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('category.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('category.updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('category.updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Category'" :path="'category'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Category'" :path="'category'"></item-show-actions>
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
    isLoading: 'category/show/isLoading',
    item: 'category/show/retrieved'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      reset: 'category/show/reset',
      retrieve: 'category/show/retrieve'
    })
  }
}
</script>
