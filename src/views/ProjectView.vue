<script lang="ts" setup>
import { ref, watch, onMounted, onUpdated } from 'vue'
import { gsap } from 'gsap'
import { useApolloClient } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';

const route = useRoute()
const router = useRouter()
const isLoading: any = ref(true)
const pageData: any = ref({})
const pageTtitle: any = ref(null)
const proImage: any = ref(null)
const { resolveClient } = useApolloClient();
const client = resolveClient();
const CHARACTERS_QUERY = gql`
    query NewQuery {
    pages {
      nodes {
        homepage {
          recentWork {
            title
            content
            image {
              mediaItemUrl
            }
            role
            isVideo
            url
            year
            video {
              mediaItemUrl
            }
            techStack {
              tech
            }
          }
        }
      }
    }
}`

const fetchSiteData = () => {
  client.query({
      query: CHARACTERS_QUERY,
      fetchPolicy: "cache-first"
  }).then((data) => {
    const arr = data.data.pages.nodes[0].homepage.recentWork;
    const target = route.params.id;
    const result = arr.find(({ title }) => title === target);
    console.log(result)
    pageData.value = result;
    pageTtitle.value = result.title.replaceAll("-", " ");
  }).catch((err) => {
      console.log(err)
  }).finally(() => {
    isLoading.value = false;
  })
}

onUpdated(() => {
  gsap.registerPlugin(ScrollTrigger)

  const timeline = gsap.timeline({
    scrollTrigger: {
      scrub: true,
      start: 'top',
      end: '+=600px'
    }
  })
  gsap.set(proImage.value, { opacity : 0 })
  gsap.to(proImage.value, { opacity : 0.30, duration : 1, delay : 0.75 })
  timeline.to(proImage.value, { y: 50, opacity : 0, filter : 'blur(4px)', zIndex : 0 })
})

fetchSiteData();

onBeforeRouteLeave((to, from, next) => {
  gsap.to(proImage.value, { opacity : 0, duration : 0.75, onComplete: () => {
    next()
  }})
})

</script>

<template>
  <main v-if="!isLoading" class="px-5 laptop:px-0">
    <div class="container mt-40 mb-[300px] pl-0 laptop:pl-[23%] relative">
      <h1 class="text-[8vw] font-black leading-[7vw] relative z-10">{{ pageTtitle }}</h1>
      <div ref="proImage" v-if="!pageData.isVideo" class="w-[55%] overflow-hidden block aspect-video !bg-cover rounded-3xl fixed top-[10%] right-0 z-[0] rotate-6"
      :style="{ background : `url(${pageData.image.mediaItemUrl}) center center no-repeat`}"></div>
      <div ref="proImage" v-else class="w-[15%] !bg-cover rounded-3xl fixed top-[10%] right-[25%] z-[0] rotate-6">
        <video muted autoplay loop class="absolute inset-x-0 z-10 inset-y-0 w-full">
          <source :src="pageData.video.mediaItemUrl" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <div class="container pl-0 laptop:pl-[23%]">
      <div class="laptop:flex justify-between items-start">
        <div class="block bg-black h-px w-full laptop:w-2/12 mt-4"></div>
        <div class="serif text-md font-bold laptop:mt-2 my-10 laptop:my-0">Info</div>
        <div class="w-full laptop:w-7/12 serif text-2xl leading-loose" v-html="pageData.content"></div>
      </div>
    </div>
    <div class="container pl-0 laptop:pl-[23%] my-60">
      <div class="laptop:flex justify-between items-start">
        <div class="block bg-black h-px w-full laptop:w-2/12 mt-4"></div>
        <div class="serif text-md font-bold laptop:mt-2 my-10 laptop:my-0">The Stack</div>
        <div class="w-full laptop:w-7/12 serif text-2xl leading-loose">
          <ul>
            <li v-for="item in pageData.techStack">{{ item.tech }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container pl-0 laptop:pl-[23%] mb-60">
        <div class="laptop:flex justify-between items-start">
          <div class="block bg-black h-px w-full laptop:w-2/12 mt-4"></div>
          <div class="serif text-md font-bold laptop:mt-2 my-10 laptop:my-0">Status</div>
          <div class="w-full laptop:w-7/12">
            <p v-if="!pageData.url" class="serif text-2xl text-black">Campaign Ended</p>
            <a v-else :href="pageData.url" target="_blank" class="serif text-xl text-white rounded-full bg-black px-4 py-2">View Live Site</a>
          </div>
        </div>
      </div>
  </main>
</template>

<style scoped>
</style>
