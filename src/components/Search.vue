<template>
  <div>
    <section class="content-header">
      <h1>{{$t('search.list')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <form action="#" method="post" @submit.prevent="search">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-search"></i>
            </div>
            <input type="text" class="form-control search" v-model="q" :placeholder="$t('search.keyword')" />
          </div>
        </form>
      </div>

      <div class="box box-solid" v-for="result in results">
        <div class="box-header with-border">
          <i class="fa fa-text-width"></i>
          <h3 class="box-title">{{result._data.type}}</h3>
        </div>
        <div class="box-body">
          <router-link :to="{ name: result._data.type + 'Show', params: { id: result._data.iri }}">
            <blockquote>
              <p>{{result._data.text}}</p>
            </blockquote>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import * as types from '../store/modules/search/mutation_types'

export default {
  computed: {
    q: {
      set (q) {
        this.$store.commit('search/' + types.SEARCH_UPDATE_QUERY, q)
      },
      get () {
        return this.$store.getters['search/query']
      }
    },
    results () {
      let results = this.$store.getters['search/results']

      return results && results.documents || []
    }
  },
  methods: {
    search () {
      this.$store.dispatch('search/search', this.q)
    }
  }
}
</script>

<style scoped>
  .search {
    height: 60px;
    font-size: 18px;
  }
</style>
