<template>
  <div class="c-apps-navigation">
    <apps-picker></apps-picker>
    <sidebar></sidebar>
  </div>
</template>
<script>
  import AppsPicker from '~/components/picker'
  import Sidebar from '~/components/sidebar'

  export default {
    name: 'MyAppsNavigation',
    components: {
      AppsPicker,
      Sidebar
    }
  }
</script>
