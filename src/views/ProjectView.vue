<script lang="ts" setup>
import { ref, watch, onMounted, onUpdated } from 'vue'
import { gsap } from 'gsap'
import { useApolloClient } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import FooterSection from '@/components/FooterSection.vue';

const route = useRoute()
const router = useRouter()
const isLoading: any = ref(true)
const pageData: any = ref({})
const pageTtitle: any = ref(null)
const proImage: any = ref(null)
const footerContent: any = ref({})
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
          footerTitle
          footerEmail
          footerContent
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
    footerContent.value = {
          title : data.data.pages.nodes[0].homepage.footerTitle,
          content: data.data.pages.nodes[0].homepage.footerContent,
          email: data.data.pages.nodes[0].homepage.footerEmail
      }
  }).catch((err) => {
      console.log(err)
  }).finally(() => {
    isLoading.value = false;
  })
}

onUpdated(() => {
})

fetchSiteData();

</script>

<template>
  <main v-if="!isLoading" class="px-5 laptop:px-0">
    <div class="container mt-28 laptop:mt-40 mb-28 laptop:mb-[300px] pl-0 laptop:pl-[23%] relative">
      <h1 class="text-[14vw] laptop:text-[8vw] font-black leading-[15vw] laptop:leading-[7vw] relative z-10">{{ pageTtitle }}</h1>
    </div>
    <div class="container pl-0 laptop:pl-[23%]">
      <div class="laptop:flex justify-between items-start">
        <div class="block bg-black h-px w-full laptop:w-2/12 mt-4"></div>
        <div class="serif text-md font-bold laptop:mt-2 my-10 laptop:my-0">Info</div>
        <div class="w-full laptop:w-7/12">
          <div class="serif text-2xl leading-loose mb-10" v-html="pageData.content"></div>
          <div v-if="pageData.isVideo" class="w-full">
            <video muted webkit-playsinline playsinline autoplay loop class="w-1/2 laptop:w-1/3">
              <source :src="pageData.video.mediaItemUrl" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
    <div class="container pl-0 laptop:pl-[23%] my-40 laptop:my-60">
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
      <FooterSection :title="footerContent.title" :email="footerContent.email" :content="footerContent.content" />
  </main>
</template>

<style scoped>
</style>
