<template>
<div>
  	<div class="shopcart">
	  	<div class="content" @click="toggleList">
	  		<div class="content-left">
	  			<div class="logo-wrapper">
	  				<div class="logo" :class="{'highlight':totalCount>0}">
	  					<span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
	  				</div>
	  				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
	  			</div>
	  			<div class="price" :class="{'highlight':totalPrice>0}">${{totalPrice}}</div>
	  			<div class="desc">另需配送费{{deliveryPrice}}元</div>
	  		</div>
	  		<div class="content-right">
	  			<div class="pay" :class="payClass">
	  				{{payDesc}}
	  			</div>
	  		</div>
	  	</div>
	  	<div class="ball-container">
	  	<transition name="drop" v-for="ball in balls" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
	  		<div  v-show="ball.show" class="ball" v-bind:css="false">
	  			<div class="inner inner-hook"></div>
	  		</div>
	  	</transition>
	  	</div>
	  	<transition name="fold">
	  	<div class="shopcart-list" v-show="listShow">
	  		<div class="list-header">
	  			<h1 class="title">购物车</h1>
	  			<span class="empty" @click="empty()">清空</span>
	  		</div>
	  		<div class="list-content" ref="listConent">
	  			<ul>
	  				<li class="food" v-for="food in selectFoods">
	  					<span class="name">{{food.name}}</span>
	  					<div class="price">
	  						<span>${{food.price*food.count}}</span>
	  					</div>
	  					<div class="cartcontrol-wrapper">
	  						<cartcontrol :food="food"></cartcontrol>
	  					</div>
	  				</li>
	  			</ul>
	  		</div>
	  	</div>
	  	</transition>
  	</div>
  	<transition name="fade">
  	<div class="list-mask" v-show="listShow" @click="hiddenlist()"></div>
  	</transition>
</div>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
  export default {
  	props : {
  		selectFoods : {
  			type : Array,
  			default() {
  				return [];
  			}
  		},
  		deliveryPrice : {
  			type : Number,
  			default : 0
  		},
  		minPrice : {
  			type : Number,
  			default : 0
  		}
  	},
  	data(){
  		return{
  			balls : [
  			{
  				show:false
  			},
  			{
  				show:false
  			},
  			{
  				show:false
  			},
  			{
  				show:false
  			},
  			{
  				show:false
  			}
  			],
  			dropBalls:[],
  			fold : true
  		}
  	},
  	computed : {
  		totalPrice(){
  			let total = 0;
  			this.selectFoods.forEach((food) =>{
  				total += food.price * food.count;
  			});
  			return total;
  		},
  		totalCount(){
  			let count = 0;
  			this.selectFoods.forEach((food) =>{
  				count += food.count;
  			});
  			return count;
  		},
  		payDesc(){
  			if(this.totalPrice === 0){
  				return `$${this.minPrice}元起送`;
  			}else if(this.minPrice > this.totalPrice){
  				let diff = this.minPrice - this.totalPrice;
  				return `还差${diff}元起送`;
  			}else{
  				return '去结算';
  			}
  		},
  		payClass(){
  			if(this.minPrice > this.totalPrice){
  				return 'not-enough';
  			}else{
  				return 'enough';
  			}
  		},
  		listShow(){
  			if(!this.totalCount){
  				this.fold = true;
  				return false;
  			}
  			let show = !this.fold;
  			if(show){
  				this.$nextTick(() =>{
  					if(!this.scroll){
	  					this.scroll = new BScroll(this.$refs.listConent,{
	  						click:true
	  					});
  					}else{
  						this.scroll.refresh();
  					}
  				});
  			}
  			return show; 
  		}
  	},
  	methods : {
  		drop(el){
  			for(let i=0; i<this.balls.length; i++){
  				let ball= this.balls[i];
  				if(!ball.show){
  					ball.show = true;
  					ball.el =el;
  					this.dropBalls.push(ball);
  					return;
  				}
  			}
  		},
		beforeDrop(el){
			let count = this.balls.length;
			while(count--){
				let ball = this.balls[count];
				if(ball.show){
					let rect = ball.el.getBoundingClientRect();
					let x = rect.left-32;
					let y = -(window.innerHeight-rect.top-22);
					el.style.webkitTransform = `translate3d(0,${y}px,0)`;
					el.style.transform = `translate3d(0,${y}px,0)`;
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
					inner.style.transform = `translate3d(${x}px,0,0)`;
				}
			}
		},
		dropping(el){
			let rf = el.offsetHeight;
			this.$nextTick(() =>{
				el.style.webkitTransform = `translate3d(0,0,0)`;
				el.style.transform = `translate3d(0,0,0)`;
				let inner = el.getElementsByClassName('inner-hook')[0];
				inner.style.webkitTransform=`translate3d(0,0,0)`;
				inner.style.transform = `translate3d(0,0,0)`;
			});
		},
		afterDrop(el){
			let ball = this.dropBalls.shift();
			if(ball){
				ball.show = false;
				el.style.display='none';
			}
		},
		toggleList(){
			if(!this.totalCount){
				return;
			}
			this.fold = !this.fold;
		},
		empty(){
			this.selectFoods.forEach((food) =>{
				food.count = 0;
			});
		},
		hiddenlist(){
			this.fold = !this.fold;
		}
  	},
  	components : {
      cartcontrol
    }
  }
</script>
<style>
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
	}
	.shopcart .content{
		display: flex;
		background: #141d27;
		font-size: 0;
	}
	.shopcart .content .content-left{
		flex:1;
	}
	.shopcart .content .content-left .logo-wrapper{
		display: inline-block;
		position: relative;
		top:-10px;
		margin: 0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141d27;
	}
	.shopcart .content .content-left .logo-wrapper .logo{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #2b343c;
		text-align: center;
	}
	.shopcart .content .content-left .logo-wrapper .highlight{
		background: rgb(0,160,220);

	}
	.shopcart .content .content-left .logo-wrapper .num{
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 16px;
		font-size: 9px;
		font-weight: 700;
		color: #fff;
		background: rgb(240,20,20);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart{
		font-size: 24px;
		color: #80858a;
		line-height:44px;
	}
	.shopcart .content .content-left .logo-wrapper .logo .highlight{
		color: #fff;
	}
	.shopcart .content .content-left .price{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin-top: 12px;
		box-sizing: border-box;
		padding-right: 12px;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;
		font-weight: 700;
		color:rgba(255,255,255,0.4); 
	}
	.shopcart .content .content-left .highlight{
		color: #fff;
	}
	.shopcart .content .content-left .desc{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin: 12px 0 0 12px;
		color:rgba(255,255,255,0.4);
		font-size: 10px;
	}
	.shopcart .content .content-right{
		flex: 0 0 105px;
		width: 105px;
	}
	.shopcart .content .content-right .pay{
		height: 48px;
		line-height:48px;
		text-align: center;
		font-size: 12px;
		color:rgba(255,255,255,0.4);
		font-weight: 700;
	}
	.shopcart .content .content-right .not-enough{
		background: #2b333b;
	}
	.shopcart .content .content-right .enough{
		background: #00b43c;
		color: #fff;
	}
	.shopcart .ball-container .ball{
		position: fixed;
		left: 32px;
		bottom: 22px;
		z-index: 200;
		transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
	}
	.shopcart .ball-container .ball .inner{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(0,160,220);
		transition: all 0.4s linear;
	}
	.shopcart .shopcart-list{
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		transform: translate3d(0,-100%,0);
	}
	.shopcart .fold-enter-active,.shopcart .fold-leave-active{
		transition: all 0.5s;
	}
	.shopcart .fold-enter,.shopcart .fold-leave-active{
		transform: translate3d(0,0,0);
	}
	.shopcart .shopcart-list .list-header{
		height: 40px;
		line-height: 40px;
		padding: 0 18px;
		background: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.shopcart .shopcart-list .list-header .title{
		float: left;
		margin: 0;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.shopcart .shopcart-list .list-header .empty{
		float: right;
		font-size: 12px;
		color: rgb(0,160,220);
	}
	.shopcart .shopcart-list .list-content{
		padding: 0 18px;
		max-height: 217px;
		background: #fff;
		overflow: hidden;
	}
	.shopcart .shopcart-list .list-content .food{
		position: relative;
		padding: 12px 0;
		box-sizing: border-box;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.shopcart .shopcart-list .list-content .food .name{
		line-height: 24px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.shopcart .shopcart-list .list-content .food .price{
		position: absolute;
		right: 90px;
		bottom: 12px;
		line-height: 24px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(240,20,20);
	}
	.shopcart .shopcart-list .list-content .food .cartcontrol{
		position: absolute;
		right: 0;
		bottom: 6px;
	}
	.list-mask{
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 40;
		opacity: 1;
		background: rgba(7,17,27,0.6);
		backdrop-filter:blur(10px);
	}
	.fade-enter-active,.fade-leave-active{
		transition: all 0.5s;
	}
	.fade-enter,.fade-leave-active{
		opacity: 0;
		background: rgba(7,17,27,0);
	}
</style>