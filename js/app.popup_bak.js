
/**
	模态提示框，不会同时出现2个 这里被设计成单例模式
	
	1：初始化在第一次调用
	

*/

APP.popup = {
	ui:{},
	isInit:false,
	devicePixelRatioClassName:{
		"default":"modal-dpr-auto",
		"1":"modal-dpr1",
		"2":"modal-dpr2"
	},
	initialize:function(){
	
		this.ui.page = $("#modalTip");
		this.ui.main = $("#modalTipMain");
		this.ui.content = $("#modalTipContent");
		
		var className = this.devicePixelRatioClassName[window.devicePixelRatio] || this.devicePixelRatioClassName['default'];
		this.ui.main.addClass( className );
		
	},
	
	show:function( html ){
		
		if( this.isInit == false ){
			this.initialize();
		}
		
		this.ui.content.html( html );
		this.ui.page.removeClass('modal-hide').addClass("'modal-show");
		
		return this.ui.page;
	},
	hide:function(){
		this.ui.page.addClass('modal-hide').removeClass("'modal-show");
	},
	
};