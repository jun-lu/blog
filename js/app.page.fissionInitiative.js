//主裂变 我裂变给别人
APP.page.fissionInitiative = Object.create(APP.FSMPageStatus, {

	name:{
		value:'fissionInitiative',
		writable:false
	},
	selector:{
		value:"#fissionInitiative",
		writable:false
	}
});

$.extend(APP.page.fissionInitiative, {
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