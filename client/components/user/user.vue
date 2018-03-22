<template>
  <div class="c-user" :title="user.user_nicename">
    <img class="gravatar"
         :src="user.avatarUrl" v-if="user.avatarUrl" style="width: 26px; height: 26px;">
    <svgicon name="gridicons-user-circle" v-else/>
    <span class="c-user__name">{{user.user_nicename}}</span>
  </div>
</template>
<script>
  import '~/icons/gridicons-user-circle';

  export default {
    name: 'UserItem',
    props: {
      user: {
        type: Object
      }
    }
  }
</script>
