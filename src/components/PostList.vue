<template>
  <div class="PostList">
    <!--在数据未返回的时候，显示这个正在加载的gif-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.png">
    </div>
    <!--代表我門的主题帖子列表-->
    <div class="posts" v-else>
      <ul>
        <li>
          <div class="toobar">
            <span v-for="btn in btns" :key="btn" 
                  :class="[{active:btn == clickTab}]"
                  @click="changeBtn">
              {{btn}}
            </span>  
          </div>
        </li>
        <li v-for="post in posts" :key="post.title">
          <!--头像-->
          <img :src="post.author.avatar_url">
          <!--回复/浏览-->
          <span class="allcount">
            <span class="reply_count">{{post.reply_count}}</span>/{{post.visit_count}}
          </span>
          <!--帖子的分类-->
          <span  :class="[{put_good:(post.good  == true),put_top:(post.top  == true),
              'topiclist-tab':(post.good  != true && post.top  != true)}]" v-if="tabName=='all'">
            <span>{{post | tabFormatter}}</span>
          </span>
          <!--标题-->
          <router-link  :to="
            {name:'post_content',
              params:{
                id:post.id,
                name:post.author.loginname
              }
            }"
          >
            <span>{{post.title}}</span>
          </router-link>
          <!--最終回复时间-->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
        </li>
        <li>
          <pagination @handleList="renderList"></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from './Pagination'
import $ from 'jquery'
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      posts: [],
      postpage:1,
      clickTab:"全部",
      tabName:'all',
      btns:['全部','精华','分享','问答','招聘','客户端测试']
    };
  },
  components:{
    pagination
  },
  methods: {
    getData() {
      if(this.tabName == 'all'){
        this.$http.get("https://cnodejs.org/api/v1/topics", {
          params:{
            page: this.postpage,
            limit: 20
          }
        })
        .then(res => {
          this.isLoading = false; //加载完成去除动画
          this.posts = res.data.data;
        })
        .catch(err => {
          //处理返回失败后的问题
          console.log(err);
        });
      }else{
        this.$http.get(`https://cnodejs.org/api/v1/topics/?tab=${this.tabName}`,{
          params:{
            page: this.postpage,
            limit: 20
          }
        })
        .then(res => {
          this.isLoading = false; //加载完成去除动画
          this.posts = res.data.data;
        })
        .catch(err => {
          //处理返回失败后的问题
          console.log(err);
        });
      }
      
    },
    renderList(value){
      this.postpage = value
      this.getData()
    },
    changeBtn(btnData){
      switch(btnData.target.innerText){
        case '全部':
          this.tabName = 'all'
          this.clickTab = '全部'
          this.getData()
          break
        case '精华':
          this.tabName = 'good'
          this.clickTab = '精华'
          this.getData()
        break
        case '分享':
          this.tabName = 'share'
          this.clickTab = '分享'
          this.getData()
        break
        case '问答':
          this.tabName = 'ask'
          this.clickTab = '问答'
          this.getData()
        break
        case '招聘':
          this.tabName = 'job'
          this.clickTab = '招聘'
          this.getData()
        break
        case '客户端测试':
          this.tabName = 'dev'
          this.clickTab = '客户端测试'
          this.getData()
        break
        default:
        break
      }
    }
  },
  beforeMount() {
    this.isLoading = true; //在页面加载之前显示加载动画
    this.getData(); //在页面加载之前获取数据
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PostList {
  background-color: #e1e1e1;
}

.posts {
  margin-top: 10px;
}
.toobar .active{
  background: #80bd01;
  color: white;
}
.PostList .posts img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  display: inline-block;
  border-radius: 5px;
}

.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 40px;
  background-color: #f5f5f5;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  padding: 5px;
  margin: 5px 10px;
  cursor: pointer;
}

.toobar span:hover {
  color: #9e78c0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading img{
  margin-left: 22%;
}
</style>