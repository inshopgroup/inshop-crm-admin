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
        <template v-if="item.clients">
          <div v-for="client in item.clients" :key="client.id">
            <router-link :to="{name: 'ClientShow', params: { id: client.id }}">
              {{ client.name }}
            </router-link>
          </div>
        </template>
      </td>
    </tr>
    <tr>
      <td>{{ $t('projects') }}</td>
      <td>
        <template v-if="item.projects">
          <div v-for="project in item.projects" :key="project.id">
            <router-link :to="{name: 'ProjectShow', params: { id: project.id }}">
              {{ project.name }}
            </router-link>
          </div>
        </template>
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
