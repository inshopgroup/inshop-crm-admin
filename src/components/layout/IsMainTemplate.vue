<template>
  <v-container fluid>
    <v-row justify="space-between">
      <v-col v-if="title" class="col-auto">
        <is-title :title="title" :title-params="titleParams"></is-title>
      </v-col>

      <v-col v-if="routeAdd" class="col-auto">
        <v-btn color="success mr-lg-5" dark fab :to="{ name: routeAdd }">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-text>
            <item-errors v-if="entity" :entity="entity" />
            <slot></slot>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemErrors from './errors/ItemErrors'

export default {
  name: 'IsMainTemplate',
  components: { ItemErrors },
  props: {
    title: {
      type: String,
      default: null
    },
    entity: {
      type: String,
      default: null
    },
    titleParams: {
      type: Object,
      default: null
    },
    routeAdd: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: 'add'
    }
  }
}
</script>
