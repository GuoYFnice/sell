<template>
<div class="seller-wrapper" ref="sellerWrapper">
	<div class="seller">
		<div class="top-wrapper">
			<div class="base">
				<div class="left-base">
					<h3>{{seller.name}}</h3>
					<div class="count">
						<div class="star-wrapper">
							<star :score="seller.score"></star>
						</div>
						<span class="ratingCount">({{seller.ratingCount}})</span>
						<span class="sellCount">月售{{seller.sellCount}}单</span>
					</div>
				</div>
				<div class="right-base">
					<span class="icon icon-favorite" :class="{'active': favoriate}" @click="toggleFavoriate"></span>
					<span class="text" :class="{'active': favoriate}">{{favoriateText}}</span>
				</div>
			</div>
			<div class="delivery-wrapper">
				<div class="minPrice item border-right">
					<h5>起送价</h5>
					<div class="notice">{{seller.minPrice}}<span>元</span></div>
				</div>
				<div class="deliveryPrice item border-right">
					<h5>商家配送</h5>
					<div class="notice">{{seller.deliveryPrice}}<span>元</span></div>
				</div>
				<div class="deliveryTime item">
					<h5>平均配送时间</h5>
					<div class="notice">{{seller.deliveryTime}}<span>分钟</span></div>
				</div>
			</div>
		</div>
		<split></split>
		<div class="avtivities-wrapper">
			<h3 class="title">公告与活动</h3>
			<p class="bulletin">{{seller.bulletin}}</p>
			<ul v-if="seller.supports" class="supports">
				<li class="support-item" v-for="(item,index) in seller.supports">
					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
					<span class="text">{{seller.supports[index].description}}</span>
				</li>
			</ul>
		</div>
		<split></split>
		<div class="pics-wrapper">
			<h3 class="title">商家实景</h3>
			<div class="pics-list" v-if="seller.pics" ref="picListWrapper">
				<ul ref="picList">
					<li v-for="(item,index) in seller.pics" class="item">
						<img :src="item" alt="" width="120" height="90">
					</li>
				</ul>
			</div>
		</div>
		<split></split>
		<div class="infos-wrapper white">
			<h3 class="title">商家信息</h3>
			<div class="infos" v-if="seller.infos">
				<ul>
					<li v-for="(item,index) in seller.infos">{{item}}</li>
				</ul>
			</div>
		</div>
	</div>
	</div>
</div>
</template>
<script>
import star from '../star/star.vue';
import BScroll from 'better-scroll';
import split from '../split/split.vue';
import {saveToLocal, loadFormLocal} from './../../common/js/util';
export default {
	props : {
		seller : Object
	},
	data() {
			return {
				favoriate: (()=> {
					return loadFormLocal(this.seller.id, 'favoriate', false);
				})(),
				classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			};
		},
	computed: {
		favoriateText() {
			return this.favoriate ? '已收藏': '收藏'
		}
	},
	watch: {
		'seller'() {
			this.$nextTick( ()=> {
				this._initScroll();
				this._initPicList();
			});
		}
	},
	methods: {
		toggleFavoriate() {
			this.favoriate = !this.favoriate;
			saveToLocal(this.seller.id, 'favoriate', this.favoriate);
		},
		_initScroll() {
			if(!this.scroll) {
				this.scroll = new BScroll(this.$refs.sellerWrapper,{
					click: true
				});
			}else {
				this.scroll.refresh();
			}
		},
		_initPicList() {
			if( this.seller.pics) {
				let picList = this.$refs.picList;
				let length = this.$refs.picList.getElementsByClassName('item').length
				let width = 120;
				let marRgight = 6;
				picList.style.width = (width + marRgight)*length - 6 + 'px';
				if(!this.pics) {
					this.pics = new BScroll(this.$refs.picListWrapper,{
						scrollX: true,
						eventPassthrough: 'vertical'
					});
				}else {
					this.pics.refresh();
				}
			}
		}
	},
	created() {
		
	},
	mounted() {
		this._initScroll();
		this._initPicList();
	},
	components : {
		star,
		split
	}
}
</script>
<style>
*{
	padding:0;
	margin:0;
}
ul li{
	list-style: none;
}
.seller-wrapper{
	position: absolute;
	top: 174px;
	bottom: 0;
	width: 100%;
	overflow: hidden;
}
.seller-wrapper .seller .top-wrapper{
	padding: 18px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.seller-wrapper .seller .top-wrapper .base{
	display:flex;
	justify-content: space-between;
	margin: 0 18px;
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.seller-wrapper .seller .top-wrapper .base .left-base{
	flex:1;
}
.seller-wrapper .seller .top-wrapper .base .left-base h3{
	font-size: 14px;
	line-height: 14px;	
}
.seller-wrapper .seller .top-wrapper .base .left-base .count{
	vertical-align: top;
	margin-top: 8px;
	font-size: 0;
}
.seller-wrapper .seller .top-wrapper .base .left-base .count .star-wrapper{
	display: inline-block;
	margin-right: 8px;
	vertical-align: top;
}
.seller-wrapper .seller .top-wrapper .base .left-base .count .star-wrapper .star .star-item{
	margin-right: 10px;
}
.seller-wrapper .seller .top-wrapper .base .left-base .count .sellCount{
	display: inline-block;
	vertical-align: top;
	font-size: 10px;
	color: rgb(77,85,93);
	line-height: 21px;
}
.seller-wrapper .seller .top-wrapper .base .left-base .count .ratingCount{
	margin-right: 12px;
	display: inline-block;
	vertical-align: top;
	font-size: 10px;
	color: rgb(77,85,93);
	line-height: 21px;
}
.seller-wrapper .seller .top-wrapper .base .right-base{
	width: 36px;
	flex: 0 0 36px;
}
.seller-wrapper .seller .top-wrapper .base .right-base span{
	display: block;
	text-align: center;
	color: #d4d6d9;
}
.seller-wrapper .seller .top-wrapper .base .right-base span:first-child{
	font-size: 24px;
}					
.seller-wrapper .seller .top-wrapper .base .right-base .active{
	color: rgb(240,20,20);
}
.seller-wrapper .seller .top-wrapper .base .right-base span:last-child{
	font-size: 10px;
	color: #93999f;
}
.seller-wrapper .seller .top-wrapper .base .right-base .active .text{
	color: #4d555d;
}								
.seller-wrapper .seller .top-wrapper .delivery-wrapper{
	display: flex;
}
.seller-wrapper .seller .top-wrapper .delivery-wrapper .item{
	flex: 1;
	margin-top: 18px;
	text-align: center;
}
.seller-wrapper .seller .top-wrapper .delivery-wrapper .border-right{
	border-right: 1px solid rgba(7,17,27,0.1);
}
.seller-wrapper .seller .top-wrapper .delivery-wrapper h5{
	font-size: 10px;
	color: rgb(147,153,159);
}
.seller-wrapper .seller .top-wrapper .delivery-wrapper .notice{
	margin-top: 5px;
	font-size: 24px;
	font-weight: 200;
	color: rgb(7,17,27);
}
.seller-wrapper .seller .top-wrapper .delivery-wrapper span{
	font-size: 10px;
}
.seller-wrapper .seller .avtivities-wrapper,.seller-wrapper .seller .pics-wrapper,.seller-wrapper .seller .infos-wrapper{
	margin-top: 16px;
	/*border-top: 1px solid rgba(7,17,27,0.1);
	border-bottom: 1px solid rgba(7,17,27,0.1);*/
}
.seller-wrapper .seller .avtivities-wrapper{
	padding: 18px 18px 0;
}
.seller-wrapper .seller .avtivities-wrapper .title{
	font-size: 14px;
	color: rgb(7,17,27);
}
.seller-wrapper .seller .avtivities-wrapper .bulletin{
	margin: 8px 0 16px;
	padding: 0 12px;
	line-height: 24px;
	font-size: 12px;
	font-weight: 200;
	text-align: justify;
	color: rgb(240,20,20);
}
.seller-wrapper .seller .avtivities-wrapper .supports li{
	border-top: 1px solid rgba(7,17,27,0.1);
	padding: 16px 12px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.seller-wrapper .seller .avtivities-wrapper .supports .icon{
	vertical-align: top;
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-right: 4px;
	background-size: 12px 12px;
	background-repeat: no-repeat;
}
.decrease{
	background-image: url("./img/decrease_4@2x.png");
}
						
.discount{
	background-image: url("./img/discount_4@2x.png");
}
						
.guarantee{
	background-image: url("./img/guarantee_4@2x.png");
}
						
.invoice{
	background-image: url("./img/invoice_4@2x.png");
}
						
.special{
	background-image: url("./img/special_4@2x.png");
}
.seller-wrapper .seller .pics-wrapper{
	padding: 18px 0 18px 18px;
}
.seller-wrapper .seller .pics-wrapper .pics-list{
	width: 100%;
	margin-top: 12px;
	overflow: hidden;
	white-space: nowrap;
}
.seller-wrapper .seller .pics-wrapper .pics-list ul{
	font-size: 0;
}
.seller-wrapper .seller .pics-wrapper .pics-list ul li{
	display: inline-block;
	margin-right: 6px;
}
.seller-wrapper .seller .pics-wrapper .pics-list ul li:last-child{
	margin-right: 0;
}
.seller-wrapper .seller .infos-wrapper{
	padding: 18px 18px 0 18px;
}
.seller-wrapper .seller .infos-wrapper .infos{
	margin-top: 12px;
}
.seller-wrapper .seller .infos-wrapper .infos li{
	border-top: 1px solid rgba(7,17,27,0.1);
	line-height: 16px;
	padding: 16px 12px;
	font-size: 12px;
	color: rgb(7,17,27);
}
</style>