<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th style="width: 75px;">{{$t('company.id')}}</th>
        <th>{{$t('company.name')}}</th>
        <th>{{$t('company.krs')}}</th>
        <th>{{$t('company.nip')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="company in companies" :key="company['id']">
        <td>
          <router-link v-if="company" :to="{name: 'ClientShow', params: { id: company['id'] }}">
            {{ company['id'] }}
          </router-link>
        </td>
        <td>
          <router-link v-if="company" :to="{name: 'ClientShow', params: { id: company['id'] }}">
            {{ company['name'] }}
          </router-link>
        </td>
        <td>
          <router-link v-if="company" :to="{name: 'ClientShow', params: { id: company['id'] }}">
            {{ company['krs'] }}
          </router-link>
        </td>
        <td>
          <router-link v-if="company" :to="{name: 'ClientShow', params: { id: company['id'] }}">
            {{ company['nip'] }}
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ClientCompanies',
    props: {
      companies: {
        type: Array,
        default: []
      }
    }
  }
</script>
