function copy(copy_text){
	var btnArray = ['否','是'];
	mui.confirm('复制该记录？','',btnArray,function(e){
 		if(e.index == 1){
 			//（google已经禁止利用js来复制粘贴）安卓版本复制粘贴，ios的参考native.js汇总
 			var Context = plus.android.importClass("android.content.Context");
		    var main = plus.android.runtimeMainActivity();
		    var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		    plus.android.invoke(clip,"setText",copy_text);
			plus.nativeUI.toast("该记录已经复制到剪贴板~");	                 			
 		}else{
 			
 		}
 	})
}
