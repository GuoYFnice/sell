<template>
	<div class="star">
		<span v-for="itemClass in itemClasses" class="star-item" :class="itemClass" track-by="$index"></span>
	</div>
</template>
<script>
	const LENGTH =5;
	const CLS_ON ="on";
	const CLS_HELF ="helf";
	const CLS_OFF ="off";
	export default {
		props : {
			score : {
				type : Number
			}
		},
		computed : {
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score*2)/2;
				let hasDecimal = score%1!==0;
				let integer =Math.floor(score);
				for(let i=0;i<integer;i++){
					result.push(CLS_ON);
				}
				if(hasDecimal){
					result.push(CLS_HELF);
				}
				while(result.length<LENGTH){
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>
<style>
	.star{
		font-size: 0;
	}
	.star .star-item{
		display: inline-block;
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
		background-size: 20px 20px;
		margin-right:22px; 
	}
	.star .star-item:last-child{
		margin-right: 0;
	}
	.on{
		background-image: url("./img/star48_on@2x.png");
	}
	.half{
		background-image: url("./img/star48_half@2x.png");
	}
	.off{
		background-image: url("./img/star48_off@2x.png");
	}
</style>