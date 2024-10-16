import './assets/main.css'
import './styles/global.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApp,provide, h } from 'vue'
import App from './App.vue'
import router from './router'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://wp.tyronhayman.me/graphql',
})

const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
  })

app.use(router)
app.mount('#app')
