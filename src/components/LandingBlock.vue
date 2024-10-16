<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps<{
  content?: any
  subContent?: any
}>()

const titleSpans: any = ref(null);
let titleArr: any = ref(props.content.mainText.split(" "))


onMounted(() => {
  let q = gsap.utils.selector(titleSpans.value);
  gsap.set(q("span"), { y: 300, opacity: 0 });
  gsap.to(q("span"), { y: 0, opacity: 1, duration: 0.75, ease : "power3.out", delay : 0.5, stagger: 0.05 });
})

</script>

<template>
  <div class="flex justify-center flex-wrap">
    <div class="container mt-40 mb-[300px] pl-0 laptop:pl-[23%]">
      <h2 ref="titleSpans" class="text-black text-[15vw] laptop:text-[8vw] leading-[15vw] laptop:leading-[8vw] font-bold">
        <span v-for="word in titleArr" :key="word" class="inline-block pr-4">
          {{ word }}
        </span>
      </h2>
    </div>
    <div class="container pl-0 laptop:pl-[23%]">
      <div class="laptop:flex justify-between items-start">
        <div class="block bg-black h-px w-full laptop:w-2/12 mt-4"></div>
        <div class="serif text-md font-bold laptop:mt-2 my-10 laptop:my-0" v-html="subContent.title"></div>
        <div class="w-full laptop:w-7/12 serif text-2xl leading-loose" v-html="subContent.content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
