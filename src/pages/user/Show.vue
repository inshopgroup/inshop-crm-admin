<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'user'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('user.tabs.general')}}</a></li>
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
                  <td>{{$t('user.name')}}</td>
                  <td>{{ item['name'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.email')}}</td>
                  <td>{{ item['email'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.groups.name')}}</td>
                  <td>
                    <div v-for="group in item['groups']" :key="group.id">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      {{ group.name }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('user.language.name')}}</td>
                  <td v-if="item['language']">{{ item['language']['name'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('user.updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'User'" :path="'user'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'User'" :path="'user'"></item-show-actions>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemShowActions from '../../components/layout/ItemShowActions'
  import ItemErrors from '../../components/layout/errors/ItemErrors'
  import History from '../../components/History'

  export default {
    components: {History, ItemErrors, ItemShowActions},
    computed: {
      ...mapGetters({
        item: 'user/item'
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    beforeDestroy() {
      this.reset()
    },
    methods: {
      ...mapActions({
        getItem: 'user/getItem',
        reset: 'user/reset'
      })
    }
  }
</script>
