<template>
  <div class="header">
    <router-link :to="{name:'root'}">
      <img src="../assets/cnodejs_light.svg" alt="" />
    </router-link>
 
    <ul>
      <li><a href="">首页</a></li>
      <li><a href="">新手入门</a></li>
      <li><a href="">API</a></li>
      <li><a href="">关于</a></li>
      <li><a href="">注册</a></li>
      <li><a href="">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* *{
  margin:0;
  padding:0;
} */
.header{
  background: #5a5555;
  height: 50px;
}
img{
  max-width: 120px;
  margin-left: 15px;
  margin-top: 10px;
}
ul{
  list-style: none;
  float: right;
}
li{
  display: inline-block;
  padding: 0 10px
}
a{
  text-decoration: none;
  color: #ccc;
  font-size: 14px;
  text-shadow: none
}
</style>
