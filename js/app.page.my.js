//我的红包
APP.page.my = Object.create(APP.FSMPageStatus, {
	name:{
		value:'my',
		writable:false
	},
	selector:{
		value:"#my",
		writable:false
	}
});

$.extend(APP.page.my, {
	//第一次进入会调用
	initialize:function(){
		console.log( this.name+" initialize" );
	},
	//页面进入
	onEnter:function( data ){
		console.log( this.name+" onEnter" );
	},
	//页面离开
	onLeave:function(){
		console.log( this.name+" onLeave" );
	},
	//接收消息
	onMessage:function( data ){
		console.log( this.name+" onMessage" );
	}
});