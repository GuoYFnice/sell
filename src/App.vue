<template>
  <div>
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab">
      <div class="tab-item">
      <router-link to='/goods' class="tab-items">商品</router-link>
      </div>
      <div class="tab-item">
      <router-link to='/ratings' class="tab-items">评论</router-link>
      </div>
      <div class="tab-item">
      <router-link to='/seller' class="tab-items">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>
<script>
  import header from './components/header/header.vue'
  const ERR_OK = 0;
  export default {
    data(){
      return {
        seller : {}
      }
    },
    created(){
      this.$http.get('/api/seller').then( (response)=>{
        response = response.body;
        if(response.errno === ERR_OK ){
          this.seller = response.data;
        }
      });
    },
    components : {
      'v-header': header
    }
  }
</script>
<style>
  @import url('./common/style/fonts.css');
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item .tab-items{
    display: block;
    font-size: 14px;
    color: rgb(77,85,93);
  }
  .tab .tab-item .tab-items.active{
    color:  rgb(240,20,20);
  }
</style>
