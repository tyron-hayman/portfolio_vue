<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter, useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faDribbble } from '@fortawesome/free-brands-svg-icons';


const navBlock: any = ref(null);
const router = useRouter()
const route = useRoute()

const props = defineProps<{
  content?: any
}>()

const navItems: any = [
  { title : "LinkedIn", url : "https://www.linkedin.com/in/tyronhayman/", icon : faLinkedin },
  { title : "GitHub", url : "https://github.com/tyron-hayman", icon : faGithub },
  { title : "Dribble", url : "https://dribbble.com/tyhayman", icon : faDribbble }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const timeline = gsap.timeline({
    scrollTrigger: {
      scrub: true,
      start: 'top',
      end: '+=400px'
    }
  })

  timeline.to(navBlock.value, { y: 50, opacity: 0, filter: 'blur(4px)' })

})

function goHome() {
    router.push({ path: '/' })
  }
</script>

<template>
  <div ref="navBlock" class="flex items-center justify-between px-5 laptop:px-20 py-16">
    <div class="flex items-center">
        <h1 class="text-4xl font-bold text-black uppercase"><span class="hidden tablet:block">{{ content }}</span><span class="block tablet:hidden">TH</span></h1>
        <p v-if="route.path != '/'" class="bg-black text-white text-md cursor-pointer rounded-full px-5 py-2 ml-4" @click="goHome"><font-awesome-icon :icon="faArrowLeftLong" /></p>
    </div>
    <div>
      <ul class="flex items-center gap-6">
        <li v-for="item in navItems" :key="item.title">
          <a :href="item.url" class="text-2xl transition-all text-black hover:text-white" target="_blank"><font-awesome-icon :icon="item.icon" /></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>
