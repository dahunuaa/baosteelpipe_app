(function($){
	var dtask = null;
	function downLoadTask(filName,url){
		var options = {method:"GET",filename:"_doc/"+fileName};
		dtask = plus.downloader.createDownload(url,options);
		dtask.start();
		
	}
	function openTask(filName){
		plus.runtime.openFile("_doc/"+fileName,{},function(e){
			plus.nativeUI.toast("打开文件")
		})
	}
	
	function pauseDownloadTask(){
		dtask.pause();
		plus.nativeUI.toast("已暂停")
	}
	
	function resumeDownloadTask(){
		dtask.resume();
		plus.nativeUI.toast("已回复下载")
	}
	
	function cancelDownTask(){
		dtask.abort();
		dtask=null;
		plus.nativeUI.toast("已取消下载")
	}
})
