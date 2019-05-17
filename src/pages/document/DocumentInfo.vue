<template>
<div v-if="item" class="table-responsive">
  <table class="table table-striped table-hover">
    <tbody>
    <tr>
      <td>{{ $t('name') }}</td>
      <td>{{ item['name'] }}</td>
    </tr>
    <tr>
      <td>{{ $t('clients') }}</td>
      <td>
        <div v-if="item.clients" v-for="client in item.clients">
          <router-link :to="{name: 'ClientShow', params: { id: client.id }}">
            {{ client.name }}
          </router-link>
        </div>
      </td>
    </tr>
    <tr>
      <td>{{ $t('projects') }}</td>
      <td>
        <div v-if="item.projects" v-for="project in item.projects">
          <router-link :to="{name: 'ProjectShow', params: { id: project.id }}">
            {{ project.name }}
          </router-link>
        </div>
      </td>
    </tr>
    <tr>
      <td>{{ $t('createdAt') }}</td>
      <td>{{ dateFormat(item.createdAt) }}</td>
    </tr>
    <tr>
      <td>{{ $t('updatedAt') }}</td>
      <td>{{ dateFormat(item.updatedAt) }}</td>
    </tr>
    <tr>
      <td>{{ $t('updatedBy') }}</td>
      <td>{{ item['updatedBy'] }}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'DocumentInfo',
  props: {
    item: null
  }
}
</script>
