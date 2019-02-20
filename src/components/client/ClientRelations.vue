<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>{{$t('client.name')}}</th>
        <th>{{$t('client.description')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clients" :key="client['id']">
        <td>
          <router-link v-if="client" :to="{name: 'ClientShow', params: { id: client['id'] }}">
            {{ client['name'] }}
          </router-link>
        </td>
        <td>
          <router-link v-if="client" :to="{name: 'ClientShow', params: { id: client['id'] }}">
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
    name: 'ClientRelations',
    props: {
      clients: {
        type: Array,
        default: []
      }
    }
  }
</script>
