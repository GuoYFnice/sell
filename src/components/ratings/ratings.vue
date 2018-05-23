<template>
<div class="ratings" ref="ratings">
	<div class="rating-content">
		<div class="overview">
			<div class="overview-left">
				<h1 class="score">{{seller.score}}</h1>
				<div class="title">综合评分</div>
				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="overview-right">
				<div class="score-wrapper">
					<span class="title">服务态度</span>
					<star :score="seller.serviceScore"></star>
					<span class="score">{{seller.serviceScore}}</span>
				</div>
				<div class="score-wrapper">
					<span class="title">商品评分</span>
					<star :score="seller.foodScore"></star>
					<span class="score">{{seller.foodScore}}</span>
				</div>
				<div class="delivert-wrapper">
					<span class="title">送达时间</span>
					<span class="delivert">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<split></split>
		<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :select-type="selectType" :only-conntent="onlyConntent" :ratings="ratings"></ratingselect>
		<div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
	</div>
</div>
</template>
<script>
import star from '../star/star.vue';
import BScroll from 'better-scroll';
import split from '../split/split.vue';
import {formatDate} from '../../common/js/date.js';
import ratingselect from '../ratingselect/ratingselect.vue';
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL 	   = 2;
const ERR_OK   = 0;
export default {
	props : {
		seller : {
			type : Object
		}
	},
	data(){
		return {
			ratings : [],
			selectType : ALL,
			onlyConntent : true,
		}
	},
	created(){
		this.$http.get('/api/ratings').then( (response)=>{
        response = response.body;
        if(response.errno === ERR_OK ){
			this.ratings = response.data;
			this.$nextTick(() => {
			this.scroll = new BScroll(this.$refs.ratings, {
			  click: true
			});
          });
        }
      });
	},
	methods : {
		selectRating(type) {
	        this.selectType = type;
	        this.$nextTick(() => {
	          this.scroll.refresh();
	        });
	    },
	    toggleContent() {
	        this.onlyConntent = !this.onlyConntent;
	        this.$nextTick(() => {
	          this.scroll.refresh();
	        });
	    },
	    needShow(type, text) {
	        if (this.onlyContent && !text) {
	          return false;
	        }
	        if (this.selectType === ALL) {
	          return true;
	        } else {
	          return type === this.selectType;
	        }
        },
	},
	filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
	components : {
		star,
		split,
		ratingselect
	}
}
</script>
<style>
*{
	padding:0;
	margin:0;
}
.ratings{
	position: absolute;
	top: 174px;
	width: 100%;
	left: 0;
	bottom: 0;
	overflow: hidden;

}
.ratings .rating-content .overview{
	display: flex;
	padding: 18px 0;
}
.ratings .rating-content .overview .overview-left{
	flex: 0 0 137px;
	width: 137px;
	border-right: 1px solid rgba(7,17,27,0.1);
	text-align: center;
	padding: 6px 0;
}
.ratings .rating-content .overview .overview-left .score{
	line-height: 28px;
	margin-bottom: 6px;
	font-size: 24px;
	color: rgb(255,153,0);
}
.ratings .rating-content .overview .overview-left .title{
	font-size: 12px;
	line-height: 12px;
	color: rgb(7,17,27);
	margin-bottom: 8px;
}
.ratings .rating-content .overview .overview-left .rank{
	font-size: 10px;
	line-height: 10px;
	color: rgb(147,153,159);
}
.ratings .rating-content .overview .overview-right{
	flex: 1;
	padding-left: 24px;
	padding: 12px 0 6px 24px;
}
.ratings .rating-content .overview .overview-right .score-wrapper{
	margin-bottom: 8px;
	font-size: 0;
}
.ratings .rating-content .overview .overview-right .score-wrapper .title{
	font-size: 12px;
	line-height: 18px;
	display: inline-block;
	vertical-align: top;
	color: rgb(7,17,27);
}
.ratings .rating-content .overview .overview-right .score-wrapper .star{
	display: inline-block;
	vertical-align: top;
	margin: 0 12px;
}
.ratings .rating-content .overview .overview-right .score-wrapper .star .star-item{
	margin-right: 12px;
}
.ratings .rating-content .overview .overview-right .score-wrapper .score{
	color: rgb(255,153,0);
	display: inline-block;
	vertical-align: top;
	line-height: 18px;
	font-size: 12px;
}
.ratings .rating-content .overview .overview-right .delivert-wrapper{
	font-size: 0;
}
.ratings .rating-content .overview .overview-right .delivert-wrapper .title{
	font-size: 12px;
	line-height: 18px;
	color: rgb(7,17,27);
}
.ratings .rating-content .overview .overview-right .delivert-wrapper .delivert{
	font-size: 12px;
	color: rgb(147,153,159);
	margin-left: 12px;
}
.ratings .rating-content .rating-wrapper{
	padding: 0 18px;
}
.ratings .rating-content .rating-wrapper .rating-item{
	display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.ratings .rating-content .rating-wrapper .rating-item .avatar{
	flex: 0 0 28px;
	width: 28px;
	margin-right: 12px;
}
.ratings .rating-content .rating-wrapper .rating-item .avatar img{
	border-radius: 50%;
}
.ratings .rating-content .rating-wrapper .rating-item .content{
	position: relative;
	flex: 1	;
}
.ratings .rating-content .rating-wrapper .rating-item .content .name{
	margin-bottom: 4px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(7, 17, 27);
}
.ratings .rating-content .rating-wrapper .rating-item .content .star-wrapper{
	margin-bottom: 6px;
	font-size: 0;	
}
.ratings .rating-content .rating-wrapper .rating-item .content .star-wrapper .star{
	display: inline-block;
	margin-right: 6px;
	vertical-align: top	;
}
.ratings .rating-content .rating-wrapper .rating-item .content .star-wrapper .star .star-item{
	margin-right: 8px;
}
.ratings .rating-content .rating-wrapper .rating-item .content .star-wrapper .delivery{
	display: inline-block;
	vertical-align: top;
	line-height: 22px;
	font-size: 10px;
	color: rgb(147, 153, 159);
}
.ratings .rating-content .rating-wrapper .rating-item .content .text{
	margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
}
.ratings .rating-content .rating-wrapper .rating-item .content .recommend{
	line-height: 16px;
    font-size: 0;
}
.ratings .rating-content .rating-wrapper .rating-item .content .recommend .icon-thumb_up,.ratings .rating-content .rating-wrapper .rating-item .content .recommend .item{
	display: inline-block;
	margin: 0 8px 4px 0	;
	font-size: 9px;
}
.ratings .rating-content .rating-wrapper .rating-item .content .recommend .icon-thumb_up{
	color: rgb(0, 160, 220);
}
.ratings .rating-content .rating-wrapper .rating-item .content .recommend .item{
	padding: 0 6px;
	border: 1px solid rgba(7, 17, 27, 0.1);
	border-radius: 1px;
	color: rgb(147, 153, 159);
	background: #fff;
}
.ratings .rating-content .rating-wrapper .rating-item .content .time{
	position: absolute;
	top: 8px;
	right: 0;
	line-height: 12px;
	font-size: 10px;
	color: rgb(147, 153, 159);
}
</style>