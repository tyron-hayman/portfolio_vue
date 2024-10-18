<script lang="ts" setup>
import { ref, computed } from 'vue'
import LandingBlock from '../components/LandingBlock.vue'
import WorkSection from '../components/WorkSection.vue';
import ExperienceSection from '../components/ExperienceSection.vue';
import FooterSection from '../components/FooterSection.vue';
import { useApolloClient } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";

const isLoading: any = ref(true)
const homePage: any = ref({})
const aboutSection: any = ref({})
const workSection: any = ref({})
const expSection: any = ref({})
const footerContent: any = ref({})
const { resolveClient } = useApolloClient();
const client = resolveClient()
const CHARACTERS_QUERY = gql`
    query NewQuery {
    pages {
      nodes {
        homepage {
          initialBox {
            name
            mainText
            footerText
            availability
            landingImage {
              mediaItemUrl
            }
          }
          about {
            title
            content
          }
          recentWork {
            title
            content
            year
            url
            image {
              mediaItemUrl
            }
            video {
              mediaItemUrl
            }
            isVideo
            role
          }
          workTitle
          workContent
          workExperience {
            company
            desc
            role
            yearFrom
            yearTo
          }
            experienceTitle
            experienceContent
          testimonials {
            name
            image {
              mediaItemUrl
            }
            content
            company
          }
          footerTitle
          footerEmail
          footerContent
          footerAvatar {
            mediaItemUrl
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
      homePage.value = data.data.pages.nodes[0].homepage.initialBox
      aboutSection.value = data.data.pages.nodes[0].homepage.about
      workSection.value = {
          items: data.data.pages.nodes[0].homepage.recentWork,
          title: data.data.pages.nodes[0].homepage.workTitle,
          content: data.data.pages.nodes[0].homepage.workContent,
      }
      expSection.value = {
          title : data.data.pages.nodes[0].homepage.experienceTitle,
          content: data.data.pages.nodes[0].homepage.experienceContent,
          items: data.data.pages.nodes[0].homepage.workExperience
      }
      footerContent.value = {
          title : data.data.pages.nodes[0].homepage.footerTitle,
          content: data.data.pages.nodes[0].homepage.footerContent,
          email: data.data.pages.nodes[0].homepage.footerEmail,
          image : data.data.pages.nodes[0].homepage.footerAvatar.mediaItemUrl,
      }
  }).catch((err) => {
      console.log(err)
  }).finally(() => {
    isLoading.value = false;
  })
}

fetchSiteData();

</script>

<template>
  <main v-if="!isLoading" class="px-5 laptop:px-0">
    <LandingBlock :content="homePage" :subContent="aboutSection" />
    <WorkSection :title="workSection.title" :content="workSection.content" :items="workSection.items" />
    <ExperienceSection :title="expSection.title" :content="expSection.content" :items="expSection.items" />
    <div class="flex justify-center flex-wrap">
      <FooterSection :title="footerContent.title" :email="footerContent.email" :content="footerContent.content" :image="footerContent.image" />
    </div>
  </main>
</template>

<style scoped>
</style>
