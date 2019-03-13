import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article.vue'
import PostList from '../components/PostList.vue'
import UserInfo from '../components/UserInfo.vue'
import Slidebar from "../components/Slidebar.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:PostList
      }
    },
    {
      name:'post_content',
      path:'/topic/:id&author=:name',
      components:{
        main:Article,
        slidebar:Slidebar
      }
    },
    {
      name:'user_info',
      path:'/user/:name',
      components:{
        main:UserInfo
      }
    }
  ]
})
