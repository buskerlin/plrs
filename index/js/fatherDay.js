
(function(){
	
	function playNow(){
		document.querySelector(".audio-phone").volume = 0.8;
        document.querySelector(".audio-phone").play();
	};
	document.addEventListener("WeixinJSBridgeReady",playNow);
	
//	/*..定义rem..*/
//	var w = document.body.clientWidth;
//	var h = document.body.clientHeight;
//	document.documentElement.style.fontSize = parseInt(w/32*(h/w)) + "px";
	
	//静音一
	$(".close-vol").click(function(){
		document.querySelector(".audio-phone").play();
	});
	
	//挂断
	$(".close-phone").click(function(){
		document.querySelector(".audio-phone").pause();
	});
	
	//ios 音频循环播放
	document.querySelector(".audio-phone").addEventListener("ended",function(){
		alert("000");
		document.querySelector(".audio-phone").play();
	});
	document.querySelector(".canon").addEventListener("ended",function(){
		alert("111");
		document.querySelector(".canon").play();
	});
	
	//背景音乐按钮
	$(".audio-on img").eq(0).click(function(){
		document.querySelector(".canon").pause();
		$(".audio-on img").hide();
		$(".audio-on img").eq(1).show();
	});
	$(".audio-on img").eq(1).click(function(){
		document.querySelector(".canon").play();
		$(".audio-on img").hide();
		$(".audio-on img").eq(0).show();
	});
	
	//每屏停留time s以后才允许下滑
	var slideGo = true; //滑到最后一页时取消时间限制
	function slide(cancle){
		
		if(arguments.length == 1){
			slideGo = false;
		}
		
		if(!slideGo){
			return false;
		}
		
		$(".shape").show();
		$(".slideNext").hide();
		
		var listener = function(){
			document.querySelector(".shape").addEventListener("touchmove",function(e){
				e.preventDefault();
				e.stopPropagation();
			});
		}
		listener();
		
		setTimeout(function(){
			$(".slideNext").fadeIn();
			$(".shape").hide();
		},4000);
	}
	
	//load实例化
//	var loadMedias = new loadMedia({
//		img: true,
//		audios: true,
//		scaleShow: ".scaleShow",
//		loadComplete:function(){
//			
//				setTimeout(function(){
//					$(".loadBox").remove();
//					$(".contentBox").show();
//					$(".index > ul li").addClass("fadeIn");
//					$("#I_do").addClass("fadeIn");
//					
//				},800);
//		}
//	});
	
	//接听or挂断
	$(".phoneBak").bind("touchstart",function(){
		$(".indexPage").remove();
		//document.querySelector(".audio-phone").volume = 1.4;
		document.querySelector(".audio-phone").pause();
		
		document.removeEventListener("WeixinJSBridgeReady",playNow);
		
		//分享文案
		$("title").html("给老爸打个电话吧");
		
		slide();
		
		//music
		document.querySelector(".canon").play();
		$(".audio-on img").eq(0).addClass("wheel-A-B");
		
		$(".title01").eq(0).addClass("fadeIn");
		document.querySelector(".title01").addEventListener("webkitAnimationEnd",function(){
			//建筑物移动
			$(".build").addClass("build-A");
			
			$(".wheel01").addClass("wheel-A-B");
			$(".wheel02").addClass("wheel-A-S");
			
			$(".left01").addClass("left01-A");
			$(".left02").addClass("left02-A");
			$(".right01").addClass("right01-A");
			$(".right02").addClass("right02-A");
		
		});
		
		//callback
		function slideCallback(index){
			switch(index){
				case 0:
					slide();
					break;
				case 1:
					slide();
					$(".title01").eq(1).addClass("fadeIn");
					document.querySelectorAll(".title01")[1].addEventListener("webkitAnimationEnd",function(){
						$(".rain").addClass("rain-A");
					});
					break;
				case 2:
					slide();
					$(".title01").eq(2).addClass("fadeIn");
					document.querySelectorAll(".title01")[2].addEventListener("webkitAnimationEnd",function(){
						//$(".body03").addClass("fadeIn-2");
						$(".father-hand").addClass("father-A");
						$(".mom-hand").addClass("mom-A");
						$(".child").addClass("child-A");
					});
					break;
				case 3:
					slide();
					
					$(".title01").eq(3).addClass("fadeIn");
					document.querySelectorAll(".title01")[3].addEventListener("webkitAnimationEnd",function(){
						setTimeout(function(){
							$(".body04Bak").addClass("fadeOut-2");
							$(".body04").addClass("fadeIn-2");
						},1200);
					});
					break;
				case 4:
					slide();
					
					$(".audio-on").removeClass("audio-T");
					$(".share-button").removeClass("fadeIn-delay8s");
					
					//$(".title01").eq(4).addClass("fadeIn");
					document.querySelectorAll(".point05 li")[8].addEventListener("webkitAnimationEnd",function(){
						$(".title-bottom").addClass("show-A");
					});
					$(".point05 li").addClass("show-D");
					break;
				case 5:
					slide("cancle");
					
					$(".qrcode").addClass("fadeIn");
					$(".share-button").addClass("fadeIn-delay8s");
					$(".audio-on").addClass("audio-T");
					document.querySelector(".qrcode").addEventListener("webkitAnimationEnd",function(){
						$(".title06").addClass("fadeIn");
						setTimeout(function(){
							$(".callme").addClass("fadeIn callme-T");
						},1200);
					});
					
					$(".slideNext").hide();
					break;
			}
		}
		
		//实例化swiper
		var mySwiper = new Swiper(".content",{
			direction: 'vertical',
//			longSwipesRatio : 0.1,
			onTouchMove:function(){
				$(".slideNext").hide();
			},
			onSlideChangeEnd:function(){
				slideCallback(mySwiper.activeIndex);	
			}
		});
		
		//添加向下指示箭头点击支持
		$(".slideNext").click(function(){
			$(".slideNext").hide();
			mySwiper.slideNext(console.log("5"),1200);
		});
	});
	
})();
