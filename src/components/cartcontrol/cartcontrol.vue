<template>
  <div>
  	<div class="cartcontrol">
  		<transition name="move">
  		<div class="descease"v-show="food.count>0" @click.stop.prevent="descCount">
			<span class="inner icon-remove_circle_outline"></span>
  		</div>
  		</transition>
  		<div class="count" v-show="food.count>0">{{food.count}}</div>
  		<div class="add icon-add_circle" @click.stop.prevent="addCount"></div>
  	</div>
  </div>
</template>
<script>
import Vue from 'vue'
  export default {
  	props : {
  		food : {
  			type : Object
  		}
  	},
  	methods : {
  		addCount(event){
  			if(!event._constructed){
  				return
  			}
  			if(!this.food.count){
  				Vue.set(this.food,'count',1);
  			}else{
  				this.food.count++;
  			}
  			this.$emit('cart-add',event.target);
  		},
  		descCount(event){
  			if(!event._constructed){
  				return
  			}
  			if(this.food.count>0){
  				this.food.count--;
  			}
  		},
  	}
  }
</script>
<style>
.cartcontrol{
	font-size:0;
}
.cartcontrol .descease{
	display: inline-block;
	padding: 6px;
	transition: all 0.4s linear;
}
.cartcontrol .move-enter-active,.cartcontrol .move-leave-active{
	opacity: 1;
	transform: translate3d(0,0,0);
}
.cartcontrol .descease .inner{
	display: inline-block;
	line-height: 24px;
	font-size: 24px;
	color: rgb(0,160,220);
	transition: all 0.4s linear;
	transform: rotate(0);
}
.cartcontrol .move-enter,.cartcontrol .move-leave-active{
	opacity: 0;
	transform: translate3d(24px,0,0);
}
.cartcontrol .move-enter .inner,.cartcontrol .move-leave-active .inner{
	transform: rotate(180deg);
}
.cartcontrol .count{
	display: inline-block;
	vertical-align: top;
	width: 12px;
	padding-top: 6px;
	line-height: 24px;
	text-align: center;
	font-size: 10px;
	color: rgb(147,153,159);
}
.cartcontrol .add{
	display: inline-block;
	color: rgb(0,160,220);
	line-height: 24px;
	font-size: 24px;
	padding: 6px;
}
</style>