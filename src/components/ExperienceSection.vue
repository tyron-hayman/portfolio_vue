<script lang="ts" setup>
import WorkItem from './WorkItem.vue';
const props = defineProps<{
  content?: any
  title?: any
  items?: any
}>()
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
    <div class="container laptop:pl-[23%] mt-[200px]">
        <div v-for="(item, index) in items" :key="item.yearFrom" class="laptop:flex justify-between items-center border-t border-black/5 border-solid py-20 relative">
            <div class="w-full laptop:w-2/3">
                <h3 class="text-3xl laptop:text-5xl font-black text-black">{{ item.company }}</h3>
                <div class="text-lg mt-5 leading-loose serif" v-html="item.desc"></div>
            </div>
            <div class="mt-5 laptop:mt-0">
                <h4 class="text-3xl font-normal text-black"><span>{{ item.yearFrom }}</span> - <span v-if="item.yearTo">{{ item.yearTo }}</span><span v-else>Present</span></h4>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>