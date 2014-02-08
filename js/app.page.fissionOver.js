//没有土豪裂变
APP.page.fissionOver = Object.create(APP.FSMPageStatus, {

	name:{
		value:'fissionOver',
		writable:false
	},
	selector:{
		value:"#fissionOver",
		writable:false,
	},
	
	message:function(){
		
	}
});

$.extend(APP.page.fissionOver, {
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