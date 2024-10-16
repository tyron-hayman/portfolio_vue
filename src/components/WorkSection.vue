<script lang="ts" setup>
import { onMounted } from 'vue';
import WorkItem from './WorkItem.vue';
import { useRoute, useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

const props = defineProps<{
  content?: any
  title?: any
  items?: any
}>()

const router = useRouter()

function goToProject(id : any) {
    router.push({ path: '/projects/' + id })
  }
</script>

<template>
  <div class="flex justify-center flex-wrap my-[200px] overflow-x-hidden">
    <div class="container laptop:pl-[23%]">
      <div class="laptop:flex justify-between items-start">
        <div class="block bg-black h-px w-full laptop:w-2/12 mt-4"></div>
        <div class="serif text-md font-bold laptop:mt-2 my-10 laptop:my-0" v-html="title"></div>
        <div class="w-full laptop:w-7/12 serif text-2xl leading-loose" v-html="content"></div>
      </div>
    </div>
    <div class="container laptop:pl-[23%] mt-[100px] laptop:mt-[200px]">
        <div ref="container" class="flex group justify-between items-center border-t border-black/5 border-solid py-20 relative cursor-pointer first:border-0" v-for="(item, index) in items" @click="goToProject(item.title)">
            <div class="group-hover:pl-14 transition-all">
                <p class="text-lg text-black/50 font-black">0{{ index + 1 }}</p>
                <h3 class="text-3xl laptop:text-5xl font-black text-black">{{ item.title.replaceAll("-", " ") }}</h3>
            </div>
            <div>
                <h4 class="text-3xl font-normal text-black"><font-awesome-icon :icon="faArrowRightLong" /></h4>
            </div>
            <div class="absolute w-0 bg-black group-hover:w-10 opacity-0 group-hover:opacity-100 left-0 bottom-0 top-0 block transition-all"></div>
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>