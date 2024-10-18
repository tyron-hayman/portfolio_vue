<script lang="ts" setup>
import { ref, watch } from 'vue'
import NavBlock from './components/NavBlock.vue';
import LoadingBlock from './components/LoadingBlock.vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'

const route = useRoute();
const router = useRouter();
const isLoading: any = ref(true);

router.beforeEach((to, from, next) => {
  isLoading.value = true
    next()
})

router.afterEach(() => {
    isLoading.value = false
})
</script>

<template>
  <NavBlock content="TyronHayman" />
  <LoadingBlock :loading="isLoading" />
  <RouterView v-slot="{Component}">
    <Transition name="pageTrans" mode="out-in">
      <component :is="Component"/>
    </Transition>
  </RouterView>
</template>

<style scoped>
.pageTrans-enter-active,
.pageTrans-leave-active {
  transition: all 0.7s ease;
  -webkit-transition: all 0.7s ease;
  -moz-transition: all 0.7s ease;
  -o-transition: all 0.7s ease;
}

.pageTrans-enter-from,
.pageTrans-leave-to {
  opacity: 0;
  transform: translateY(100px);
  -webkit-transform: translateY(100px);
  -moz-transform: translateY(100px);
}
</style>
