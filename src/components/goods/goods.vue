<template>
<div>
  <div class="goods">
  	<div class="menu-wrapper" ref="menuWrapper">
 		<ul>
 			<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
 				<span class="text">
 				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
 				</span>
 			</li>
 		</ul>
  	</div>
  	<div class="food-wrapper" ref="foodWrapper">
  		<ul>
  			<li class="food-list food-list-hook" v-for="item in goods">
  				<h1 class="title">{{item.name}}</h1>
  				<ul>
  					<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
  						<div class="icon">
  							<img width="57" height="57" :src="food.icon">
  						</div>
  						<div class="content">
  							<h2 class="name">{{food.name}}</h2>
  							<p class="desc">{{food.description}}</p>
  							<div class="extra">
  								<span class="count">月售{{food.sellCount}}份</span>
  								<span>好评率{{food.rating}}%</span>
  							</div>
  							<div class="price">
  								<span class="new">${{food.price}}</span>
  								<span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
  							</div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
                </div>
  						</div>
  					</li>
  				</ul>
  			</li>
  		</ul>
  	</div>
    <shopcart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
  </div>
  <food :food="selectedFood" ref="food"></food>
</div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import food from "../food/food.vue";
const ERR_OK = 0;
  export default {
  	props : {
  		seller : {
  			type : Object
  		}
  	},
  	data(){
  		return {
  			goods : [],
  			listHeight : [],
  			srcollY :0,
        selectedFood:{}
  		}
  	},
  	computed : {
  		currentIndex(){
  			for(let i=0;i<this.listHeight.length;i++){
  				let height1 = this.listHeight[i];
  				let height2 = this.listHeight[i+1];
  				if(!height2 ||(this.srcollY>=height1 && this.srcollY<height2)){
  					return i;
  				}
   			}
   			return 0;
  		},
      selectFoods(){
        let foods=[];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count){
              foods.push(food);
            }
          });
        });
        return foods;
      }
  	},
  	created(){
  		this.classMap = ['decrease','discount','special','invoice','guarantee'];

  		this.$http.get('/api/goods').then( (response)=>{
        response = response.body;
        if(response.errno === ERR_OK ){
          this.goods = response.data;
          this.$nextTick(() => {
		  	this._initScroll();
		  	this._calculateHeight();
          });
        }
      });
  	},
  	methods : {
  		selectMenu(index,event){
  			if(!event._constructed){
  				return
  			}
  			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
  			let el = foodList[index];
  			this.foodScroll.scrollToElement(el,300);
  		},
  		_initScroll(){
  			this.menuScroll = new BScroll(this.$refs.menuWrapper,{
  				click:true
  			});
  			this.foodScroll = new BScroll(this.$refs.foodWrapper,{
  				probeType :3,
          click:true
  			});
  			this.foodScroll.on('scroll',(pos)=>{
  				this.srcollY = Math.abs(Math.round(pos.y));
  			});
  		},
  		_calculateHeight(){
  			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
  			let height = 0;
  			this.listHeight.push(height);
  			for(let i=0;i<foodList.length;i++){
  				let item = foodList[i];
  				height += item.clientHeight;
  				this.listHeight.push(height);
  			}
  		},
      cartAdd(el) {
      　this.$nextTick(() => {
        　this.$refs['shopcart'].drop(el);　//调用shopcart组件的drop()函数
        });
      },
      selectFood(food,event){
        if(!event._constructed){
          return
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
  	},
    components : {
      shopcart,
      cartcontrol,
      food
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
.goods{
	position: absolute;
	width:100%;
	top:179px;
	display: flex;
	overflow: hidden;
	bottom: 46px;
}
.goods .menu-wrapper{
	flex:  0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.goods .menu-wrapper .menu-item{
	display: table;
	height: 54px;
	width: 56px;
	line-height: 14px;
	border-bottom: 1px solid rgba(7,17,27,0.2);
	padding:0 12px;
}
.current{
	position: relative;
	margin-top: -1px;
	z-index: 10;
	background: #fff;
	font-weight: 700;
	border: none;
}

.goods .menu-wrapper .menu-item .text{
	font-size: 12px;
	display: table-cell;
	width: 56px;
	vertical-align: middle;
}
.goods .menu-wrapper .menu-item .text .icon{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		height:12px;
		margin-right: 2px;
		background-size:12px 12px;
		background-repeat: no-repeat;
}
.goods .food-wrapper{
	flex:1;
	
}
.goods .food-wrapper .title{
	padding-left: 14px;
	height: 26px;
	line-height: 26px;
	border-left: 2px solid #d9dde1;
	font-size: 12px;
	color: rgb(147,153,159);
	background: #f3f5f7;
	margin: 0;
}
.goods .food-wrapper .food-item{
	display: flex;
	margin: 18px;
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.2);
}
.goods .food-wrapper .food-item:last-child{
	margin-bottom: 0;
	border-bottom: 0;
}
.goods .food-wrapper .food-item .icon{
	flex: 0 0 57px;
	margin-right:10px; 
}
.goods .food-wrapper .food-item .content{
	flex:1;
  position: relative;
}
.goods .food-wrapper .food-item .content .name{
	font-size: 14px;
	line-height: 14px;
	margin: 2px 0 8px 0;
	height: 14px;
	color: rgb(7,17,27);
}
.goods .food-wrapper .food-item .content .desc{
	margin-bottom: 8px;
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.goods .food-wrapper .food-item .content .extra{
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.goods .food-wrapper .food-item .content .extra .count{
	margin-right: 12px;
}
.goods .food-wrapper .food-item .content .price{
	font-weight: 700;
	line-height: 24px;
}
.goods .food-wrapper .food-item .content .price .new{
	margin-right: 8px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.goods .food-wrapper .food-item .content .price .old{
	text-decoration: line-through;
	color: rgb(147,153,159);
	font-size: 10px;
}
.goods .food-wrapper .food-item .content .cartcontrol-wrapper{
  position: absolute;
  right: 0;
  bottom: 0;
}
.decrease{
	background-image: url('./img/decrease_3@2x.png');
}
.discount
{
	background-image: url('./img/discount_3@2x.png');
}
.special
{
	background-image: url('./img/special_3@2x.png');
}
.invoice
{
	background-image: url('./img/invoice_3@2x.png');
}
.guarantee
{
	background-image: url('./img/guarantee_3@2x.png');
}
</style>