<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th style="width: 75px;">{{$t('company.id')}}</th>
        <th>{{$t('company.name')}}</th>
        <th>{{$t('company.description')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>
          <router-link v-if="client" :to="{name: 'ClientShow', params: { id: client.id }}">
            {{ client.id }}
          </router-link>
        </td>
        <td>
          <router-link v-if="client" :to="{name: 'ClientShow', params: { id: client.id }}">
            {{ client['name'] }}
          </router-link>
        </td>
        <td>
          <router-link v-if="client" :to="{name: 'ClientShow', params: { id: client.id }}">
            {{ client['description'] }}
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'CompanyClients',
    props: {
      clients: {
        type: Array,
        default: function () {
          return []
        }
      }
    }
  }
</script>
