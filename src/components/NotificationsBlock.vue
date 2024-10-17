<script lang="ts" setup>
import { ref, watch, onMounted, onUpdated } from 'vue'
import { gsap } from 'gsap'
import { useApolloClient } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const isLoading: any = ref(true)
const noteList: any = ref({});
const notificationWrap: any = ref(null)
const { resolveClient } = useApolloClient();
const client = resolveClient();
const CHARACTERS_QUERY = gql`
    query NewQuery {
  themeSettingsNext {
    notificationOptions {
      showNotifications
      notificationList {
        title
        content
      }
    }
  }
}`

const fetchSiteData = () => {
  client.query({
      query: CHARACTERS_QUERY,
      fetchPolicy: "cache-first"
  }).then((data) => {
    console.log(data.data.themeSettingsNext.notificationOptions.notificationList)
    noteList.value = data.data.themeSettingsNext.notificationOptions.notificationList;
  }).catch((err) => {
      console.log(err)
  }).finally(() => {
    isLoading.value = false;
  })
}

onUpdated(() => {
    let q = gsap.utils.selector(notificationWrap.value);
    gsap.set(q(".group"), { opacity: 0, scale: 0.1 });
    gsap.to(q(".group"), { opacity: 1, scale : 1, duration: 0.75, ease : "elastic.out(1,0.3)", delay : 4, stagger: 0.05 });
})

const closeNote = (event) => {
    gsap.to(event.currentTarget, { opacity : 0, scale : 0.1, duration : 0.35, onComplete: () => {
        event.target.style.display = "none"
    } });
}

fetchSiteData();

</script>

<template>
    <div ref="notificationWrap" v-if="!isLoading" class="fixed z-[1000] right-10 bottom-10 w-[300px] flex flex-wrap gap-4">
        <div class="group w-full rounded-xl overflow-hidden bg-white p-5 relative shadow-lg" v-for="(item, index) in noteList" @click="closeNote($event)">
            <h3 class="text-md font-bold text-black mb-5">{{ item.title }}</h3>
            <div class="text-sm text-gray-800 leading-relaxed font-normal notification" v-html="item.content"></div>
            <div class="absolute right-5 top-5 z-10">
                <p class="text-black text-md"><font-awesome-icon :icon="faXmark" /></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.notification >>> a {
    color: #000000!important;
    font-weight: 800!important;
    text-decoration: underline;
}
</style>
