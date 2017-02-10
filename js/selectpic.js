function selectpic(pic_id){//pic_id是所要选择图片的id值
	this.pic_id = pic_id
	if(mui.os.plus){
		var a = [{
			title: "拍照"
		}, {
			title: "从手机相册选择"
		},{
			title:"撤销图片"
		}];
		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: a
		}, function(b) {
			switch (b.index) {
				case 0:
					break;
				case 1:
					getImage(pic_id)
					break;
				case 2:
					galleryImg(pic_id);
					break;
				case 3:
					deleteImg(pic_id);
					break;
				default:
					break
			}
			
		})	
	}
		
}




//拍照
	function getImage(pic_id) {
		var c = plus.camera.getCamera();
		c.captureImage(function(e) {
			plus.io.resolveLocalFileSystemURL(e, function(entry) {
				var s = entry.toLocalURL() + "?version=" + new Date().getTime();
				appendFile(pic_id,s);
				document.getElementById(pic_id).src = s;
				
				//变更大图预览的src
				//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
//					document.querySelector("#__mui-imageview__group .mui-slider-item img").src = s + "?version=" + new Date().getTime();;;
			}, function(e) {
				console.log("读取拍照文件错误：" + e.message);
			});
		}, function(s) {
			console.log("error" + s);
		}, {
			filename: "_doc/head.jpg"
		})
		
		
	}
	
	
	
//从相册选择图片
	function galleryImg(pic_id) {
		plus.gallery.pick(function(a) {
			plus.io.resolveLocalFileSystemURL(a, function(entry) {
				plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
					root.getFile("head.jpg", {}, function(file) {
						//文件已存在
						file.remove(function() {
							entry.copyTo(root, 'head.jpg', function(e) {
									var e = e.fullPath + "?version=" + new Date().getTime();
									appendFile(pic_id,e);
									document.getElementById(pic_id).src = e;
									//变更大图预览的src
									//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
//										document.querySelector("#__mui-imageview__group .mui-slider-item img").src = e + "?version=" + new Date().getTime();;
								},
								function(e) {
									console.log('copy image fail:' + e.message);
								});
						}, function() {
							console.log("delete image fail:" + e.message);
						});
					}, function() {
						//文件不存在
						entry.copyTo(root, 'head.jpg', function(e) {
								var path = e.fullPath + "?version=" + new Date().getTime();
								appendFile(pic_id,e);
								document.getElementById("head-img1").src = path;
								//变更大图预览的src
								//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
								document.querySelector("#__mui-imageview__group .mui-slider-item img").src = path;
							},
							function(e) {
								console.log('copy image fail:' + e.message);
							});
					});
				}, function(e) {
					console.log("get _www folder fail");
				})
			}, function(e) {
				console.log("读取拍照文件错误：" + e.message);
			});
		}, function(a) {}, {
			filter: "image"
		})
	};


	function deleteImg(pic_id){
		document.getElementById(pic_id).src="../img/iconfont-tianjia.png"
		f1 = null
	}


function appendFile(pic_id,path){
	
	
	var img = new Image();
//		path_pic = path;
		img.src=path;
		img.onload = function(){
			var base64="";
			var that = this;
//				生成比例
			var w = that.width,
				h = that.height,
				scale = w/h;
				w = 480 ||w;//480 你想压缩到多大 改这里
				h = w/scale;
//				生成canvas
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = w;
    		canvas.height = h;
			ctx.drawImage(that,0,0,w,h);
			base64 = canvas.toDataURL('image/png',1||0.8);//1最清晰，越低越模糊。有一点不清楚这里明明设置的是png。弹出 base64 开头的一段 data：image/png;却是png。哎开心就好，开心就好
			localStorage.setItem(pic_id,base64)
			
			//下面两行，就是显示当前所选取的图片，之前的方法里面已经实现
//				var pic = document.getElementById("x");
//				pic.src = base64; //这里丢到img 的 src 里面就能看到效果了
				
		}
	
}


	function defaultImg() {
		if(mui.os.plus){
			plus.io.resolveLocalFileSystemURL("_doc/head.jpg", function(entry) {
				var s = entry.fullPath + "?version=" + new Date().getTime();;
				document.getElementById("head-img").src = s;
			}, function(e) {
				document.getElementById("head-img").src = '../img/BS_2.png';
			})
		}else{
			document.getElementById("head-img").src = '../img/BS_2.png';
			}
			
		}
	
	function initImgPreview() {
	var imgs = document.querySelectorAll("img.mui-action-preview");
	imgs = mui.slice.call(imgs);
	if (imgs && imgs.length > 0) {
		var slider = document.createElement("div");
		slider.setAttribute("id", "__mui-imageview__");
		slider.classList.add("mui-slider");
		slider.classList.add("mui-fullscreen");
		slider.style.display = "none";
		slider.addEventListener("tap", function() {
			slider.style.display = "none";
		});
		slider.addEventListener("touchmove", function(event) {
			event.preventDefault();
		})
		var slider_group = document.createElement("div");
		slider_group.setAttribute("id", "__mui-imageview__group");
		slider_group.classList.add("mui-slider-group");
		imgs.forEach(function(value, index, array) {
			//给图片添加点击事件，触发预览显示；
			value.addEventListener('tap', function() {
				slider.style.display = "block";
				_slider.refresh();
				_slider.gotoItem(index, 0);
			})
			var item = document.createElement("div");
			item.classList.add("mui-slider-item");
			var a = document.createElement("a");
			var img = document.createElement("img");
			img.setAttribute("src", value.src);
			a.appendChild(img)
			item.appendChild(a);
			slider_group.appendChild(item);
		});
		slider.appendChild(slider_group);
		document.body.appendChild(slider);
		var _slider = mui(slider).slider();
		}
	}