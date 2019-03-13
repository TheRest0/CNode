<template>
  <div class="UserInfo">
    <!--在数据未返回的时候，显示这个正在加载的gif-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.png" />
    </div>
    <div class="userInfomation">
      <section>
        <img :src="userinfo.avatar_url" alt="">
        <span>{{userinfo.loginname}}</span>
        <p>
          {{userinfo.score}}积分
        </p>
        <p>
          注册时间：{{userinfo.create_at | formatDate}}
        </p>
      </section>
      
      <div class="topic">
        <p>最近创建的话题</p>
        <ul>
          <li v-for="item in topcilimitby5" :key="item.title">
            <router-link :to="{name:'post_content',params:{id:item.id}}">
              {{item.title}}  
            </router-link>  
          </li>
        </ul>
      </div>
      <div class="replies">
        <p>最近参与的话题</p>
        <ul>
          <li v-for="item in replylimitby5" :key="item.title">
            <router-link :to="{name:'post_content',params:{id:item.id}}">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      isLoading:false,
      userinfo:{}
    }
  },
  methods:{
    getData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
      .then(res=>{
        this.isLoading = false
        this.userinfo = res.data.data
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  computed:{
    topcilimitby5(){
      if(this.userinfo.recent_topics){
        return this.userinfo.recent_topics.slice(0,5)
      }
    },
    replylimitby5(){
      if(this.userinfo.recent_replies){
        return this.userinfo.recent_replies.slice(0,5)
      }
    }
  },
  beforeMount(){
    this.isLoading = true;//加载成功之前显示加载动画
    this.getData();//在页面加载之前获取数据
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .userInfomation {
    background: white;
    width: 75%;
    margin: 10px auto;
  }
  .userInfomation section {
    padding: 12px;
  }
  .userInfomation img {
    width: 30px;
  }
  .userInfomation li {
    list-style:none;
  }
  .userInfomation .replies,
  .userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
  }
  .userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }
  .userInfomation > div >ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
  }
  .userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
  }

</style>
