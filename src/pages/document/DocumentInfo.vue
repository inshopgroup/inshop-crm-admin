<template>
  <div v-if="item" class="table-responsive">
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <td>{{ $t('name') }}</td>
          <td>{{ item.name }}</td>
        </tr>
        <tr>
          <td>{{ $t('clients') }}</td>
          <td>
            <template v-if="item.clients">
              <div v-for="client in item.clients" :key="client.id">
                <router-link
                  :to="{ name: 'ClientShow', params: { id: client.id } }"
                >
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
                <router-link
                  :to="{ name: 'ProjectShow', params: { id: project.id } }"
                >
                  {{ project.name }}
                </router-link>
              </div>
            </template>
          </td>
        </tr>

        <show-row-is-active :item="item" />
        <show-row-created-at :item="item" />
        <show-row-updated-at :item="item" />
        <show-row-updated-by :item="item" />
      </tbody>
    </table>
  </div>
</template>

<script>
import ShowRowIsActive from '../../components/Show/ShowRowIsActive'
import ShowRowCreatedAt from '../../components/Show/ShowRowCreatedAt'
import ShowRowUpdatedAt from '../../components/Show/ShowRowUpdatedAt'
import ShowRowUpdatedBy from '../../components/Show/ShowRowUpdatedBy'
export default {
  name: 'DocumentInfo',
  components: {
    ShowRowUpdatedBy,
    ShowRowUpdatedAt,
    ShowRowCreatedAt,
    ShowRowIsActive
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
