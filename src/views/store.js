import { reactive } from 'vue'
import gql from 'graphql-tag'
import { DefaultApolloClient, useQuery, useApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { gql } from "@apollo/client";

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

  const client = useApolloClient();

  const aNormalFunction = () => {   // please note that this is not a component  
    client.query({
       query: CHARACTERS_QUERY,
       fetchPolicy: "cache-first"   // select appropriate fetchPolicy
    }).then((data) => {
       console.log(data)   //do whatever you like with the data
    }).catch((err) => {
       console.log(err)
    })
 };

  const { result, loading, error } = useQuery(CHARACTERS_QUERY);

  export const data = reactive({
    results : result,
    isLoading : loading,
    errors : error
  });