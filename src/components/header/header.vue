<template>
  <div class="header">
    <div class="header-top">
    	<div class="left">
    		<img :src="seller.avatar" width="64" height="64">
    	</div>
    	<div class="title">
    		<img src="./img/brand@2x.png" width="30" height="18">
    		<span class="name">{{seller.name}}</span>
			<div class="msg">
				{{seller.description}}/{{seller.deliveryTime}}分钟到达
	    	</div>
	    	<div class="supports" v-if="seller.supports">
	    		<span class="icon" :class="classMap[seller.supports[0].type]"></span>
	    		<span class="txt">{{seller.supports[0].description}}</span>
	    	</div>
	    	<div class="more" v-if="seller.supports" @click="showDetail">
	    		<span class="text">{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i>
	    	</div>
    	</div>
    </div>
    <div class="header-bottom" @click="showDetail">
    	<span class="bottom-img"></span><span class="bottom-text">{{seller.bulletin}}</span>
    	<i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
    	<img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailShow">
    	<div class="detail-wrapper clearfix">
    		<div class="detail-main">
    			<h1 class="name">{{seller.name}}</h1>
    			<div class="star-wrapper">
    				<star :score="seller.score"></star>
    			</div>
    			<div class="title">
    				<div class="line"></div>
    				<div class="text">优惠信息</div>
    				<div class="line"></div>
    			</div>
    			<ul v-if="seller.supports" class="supports">
    				<li class="supports-item" v-for="(item,index) in seller.supports">
    					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
    					<span class="text">{{seller.supports[index].description}}</span>
    				</li>
    			</ul>
    			<div class="title">
    				<div class="line"></div>
    				<div class="text">商家公告</div>
    				<div class="line"></div>
    			</div>
    			<div class="bulletin">
    				<p class="content">{{seller.bulletin}}</p>
    			</div>
    		</div>
    	</div>
    	<div class="detail-close" @click="closeDetail"><i class="icon-close"></i></div>
    </div>
    </transition>
  </div>
</template>
<script>
	import star from '../star/star.vue';
    export default {
	  	props : {
	  		seller : {
	  			tpye : Object
	  		}
	  	},
	  	data() {
	  		return{
	  			detailShow : false
	  		};
	  	},
	  	methods : {
	  		showDetail(){
	  			this.detailShow = true
	  		},
	  		closeDetail(){
	  			this.detailShow = false
	  		}
	  	},
	  	created(){
	  		this.classMap = ['decrease','discount','special','invoice','guarantee'];
	  	},
	  	components : {
	  		star 
	  	}
  	};
</script>
<style>
	.clearfix{
		display: inline-block;
	}
	.clearfix:after{
		display: block;
		content: ".";
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}
	.header{
		overflow: hidden;
		background: rgba(7,17,27,0.4);
		position: relative;
	}
	.header .header-top{
		position: relative;
		padding: 24px 12px 18px 24px;
		/*font-size: 0;*/
	}
	.header .header-top .left{
		display: inline-block;
		margin-right: 16px;
		vertical-align: top;
	}
	.header .header-top .left img{
		border-radius: 2px;
	}
	.header .header-top .title{
		display: inline-block;
	}
	.header .header-top .title .name{
		font-size: 16px;
		font-weight: bold;
		line-height: 18px;
		vertical-align: top;
		color:rgb(255,255,255);
	}
	.header .header-top .title .msg{
		margin: 8px 0 10px 0;
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
		color:rgb(255,255,255);
	}
	.header .header-top .title .supports .icon{
		display: inline-block;
		width: 12px;
		height:10px;
		margin-right: 4px;
		background-size:12px 12px;
		background-repeat: no-repeat;
	}
	.header .header-top .title .supports .txt{
		color:rgb(255,255,255);
		font-size: 10px;
		font-weight: 200;
		line-height: 12px;
	}
	.header .header-top .title .more{
		position: absolute;
		right: 12px;
		bottom: 18px;
		padding: 0 8px;
		line-height: 24px;
		height: 24px;
		background-color: rgba(0,0,0,0.2);
		border-radius: 12px;
		text-align: center;
		color: rgb(255,255,255);
	}
	.header .header-top .title .more .icon-keyboard_arrow_right{
		vertical-align: top;
	}
	.header .header-top .title .more .text{
		color: rgb(255,255,255);
		font-weight: 200;
		font-size: 10px;
		vertical-align: top;
	}
	.header .header-bottom{
		position: relative;
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color :rgb(255,255,255);
		background: rgba(7,17,27,0.2);
	}
	.header .header-bottom .bottom-img{
		display: inline-block;
		height: 12px;
		width: 22px;
		background-image: url('./img/bulletin@2x.png');
		background-size: 22px 12px;
		background-repeat: no-repeat;
		vertical-align: top;
		margin-top: 8px;
	}
	.header .header-bottom .bottom-text{
		margin: 0 4px;
		vertical-align: top;
		font-size: 10px;
	}
	.header .header-bottom .icon-keyboard_arrow_right{
		position: absolute;
		top:6px;
		right: 12px;
	}
	.header .background{
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	.header .detail{
		color: rgb(255,255,255);
		position: fixed;
		z-index: 100;
		top:0;
		left:0;
		width: 100%;
		height:100%;
		overflow: auto;
		transition: all 0.5s;
		background: rgba(7,17,27,0.8);
		backdrop-filter :blur(10px);
	}
	.fade-enter-active{
		opacity: 1;
		background: rgba(7,17,27,0.8);
	}
	.fade-enter,.fade-leave-active{
		opacity: 0;
		background: rgba(7,17,27,0);		
	}
	.header .detail .detail-wrapper{
		min-height: 100%;
		width: 100%;	
	}
	.header .detail .detail-wrapper .detail-main{
		margin-top: 64px;
		width: 100%;
		padding-bottom: 64px;
	}
	.header .detail .detail-wrapper .detail-main .name{
		line-height: 16px;
		font-size: 16px;
		font-weight: 700;
		text-align: center;
	}
	.header .detail .detail-wrapper .detail-main .star-wrapper{
		margin-top: 18px;
		padding:2px 0;
		text-align: center;
	}
	.header .detail .detail-wrapper .detail-main .title{
		display: flex;
		width: 80%;
		margin: 38px auto 24px auto;
	}
	.header .detail .detail-wrapper .detail-main .title .line{
		flex:1;
		position: relative;
		top :-6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.header .detail .detail-wrapper .detail-main .title .text{
		padding: 0 12px;
		font-size: 14px;
	}
	.header .detail .detail-wrapper .detail-main .supports{
		width: 80%;
		margin: 0 auto;
	}
	.header .detail .detail-wrapper .detail-main .supports .supports-item{
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	.header .detail .detail-wrapper .detail-main .supports .supports-item:last-child{
		margin-bottom: 0;
	}
	.header .detail .detail-wrapper .detail-main .supports .supports-item .icon{
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
	}
	.header .detail .detail-wrapper .detail-main .supports .supports-item .text{
		line-height: 12px;
		font-size: 12px;
	}
	.header .detail .detail-wrapper .detail-main .bulletin{
		width: 80%;
		margin: 0 auto;
	}
	.header .detail .detail-wrapper .detail-main .bulletin .content{
		padding:0 12px;
		font-size: 12px;
		line-height: 24px;
	}
	.header .detail .detail-close{
		position: relative;
		height: 32px;
		width: 32px;
		margin: -64px auto 0 auto;
		clear: both;
		font-size: 32px;
		font-weight: 700;
		color: rgb(255,255,255);
	}
	.decrease{
		background-image: url('./img/decrease_1@2x.png');
	}
	.discount
	{
		background-image: url('./img/discount_1@2x.png');
	}
	.special
	{
		background-image: url('./img/special_1@2x.png');
	}
	.invoice
	{
		background-image: url('./img/invoice_1@2x.png');
	}
	.guarantee
	{
		background-image: url('./img/guarantee_1@2x.png');
	}
</style>