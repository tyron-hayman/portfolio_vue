<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap/gsap-core';
const props = defineProps<{
  num?: any
  title?: any
  image?: any
}>()

const container: any = ref(null);
const workImage: any = ref(null);

onMounted(() => {    
})
</script>

<template>
        <div ref="container" class="flex justify-between items-center border-t border-black/5 border-solid py-20 relative">
            <div>
                <p class="text-md text-black/50 font-bold">0{{ num }}</p>
                <h3 class="text-3xl laptop:text-5xl font-black text-black">{{ title }}</h3>
            </div>
            <div>
                <h4 class="text-3xl font-normal text-black">Link</h4>
            </div>
        </div>
</template>

<style scoped>
</style>