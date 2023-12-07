<template>
  <v-app>
    <div>
      <NavbarComp v-if="localStorageItem !== null" />
      
      <v-main class="mx-4 mb-4">
        <router-view />
      </v-main>
      
    </div>
  </v-app>
</template>

<script>
import NavbarComp from '@/components/NavbarComp.vue'

export default {
  name: 'App',
  components: {
    NavbarComp
  },
  data: () => ({
    localStorageItem: localStorage.getItem('token')
  })
};
</script>
