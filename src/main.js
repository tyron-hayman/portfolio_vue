import './assets/main.css'
import './styles/global.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from '@/utils/apolloClient';
import { createPinia } from 'pinia'
import { createApp,provide, h } from 'vue'
import App from './App.vue'
import router from './router'

const pinia = createPinia();
const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
  })

app.use(pinia)
app.use(router)
app.mount('#app')
