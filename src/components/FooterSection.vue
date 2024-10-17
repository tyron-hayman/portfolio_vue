<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const { title = 'Get In Touch', email = "#", content = "" } = defineProps<{
    title?: any
    email?: any
    content?: any
}>()

const footerBlock: any = ref(null);
const router = useRouter()
const route = useRoute()
const today = new Date();

</script>

<template>
    <div ref="footerBlock" class="container laptop:pl-[23%]">
      <div class="laptop:flex justify-between items-start">
        <div class="block bg-black h-px w-full laptop:w-2/12 mt-4"></div>
        <div class="serif text-md font-bold laptop:mt-2 my-10 laptop:my-0" v-html="title"></div>
        <div class="w-full laptop:w-7/12 serif text-2xl leading-loose" v-html="content"></div>
      </div>
    </div>
    <div class="container pl-0 mb-20 mt-20 laptop:mt-60 laptop:pl-[23%] relative">
        <a :href="'mailto:' + email" class="text-[12vw] laptop:text-[6vw] font-black border-b-2 border-black border-solid">Get In Touch</a>
    </div>
    <div class="container pl-0 mb-60 mt-20 laptop:pl-[23%] relative">
        <p class="text-md text-black/70 leading-loose">Built with <font-awesome-icon :icon="faHeart" /> in {{ today.getFullYear() }} - Project reference used with client permission.</p>
    </div>
</template>

<style scoped>
</style>