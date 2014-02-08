
/**
	全局命名空间 APP
	
	APP = {
		// ajax 接口
		io:{},
		FSM:function(){},//页面切换控制类
		FSMPageStatus:function(){}, //页面基础类
		Tip:function(){},//页面tip类
		page:{
			fsm:Object //FSM 实例
			
			home:Object extend FSMPageStatus // 主页
			my:Object extend FSMPageStatus //我的钱包
			fission:Object extend FSMPageStatus //裂变页面
			fissionInitiative:Object extend FSMPageStatus //裂变chat页，主裂变
			fissionPassive:Object extend FSMPageStatus //裂变chat页， 被裂变
			fissionOver:Object extend FSMPageStatus //裂变失败页
			
			
		},
		//构建页面 html 区块
		htmlFragment:{
			xxx:function( data ){
				return "html";
			}
		},
		//所有页面特效
		effect:{
			
		}
		
	};
	
	
	API:
		#添加页面
			@pageStatus 必须为 FSMPageStatus 实例
			APP.page.fsm.add( pageStatus )
			
		#页面切换
			@param string name // name的可选值范围在 APP.page.fsm.statusNames
			APP.page.fsm.changeStatus( name );
		
		#显示提示
			@param string|dom  //Tip框中要显示的HTML片段
			@onReady function  // Tip准备完成的回调 第一个参数是 Tip 顶层的 dom	
			var tip = new APP.Tip(html, onReady);
			
			tip.show(); //显示
			tip.hide(); //隐藏
		
	
	
	

*/


var APP = window.APP || {page:{}};

APP.hash = {
	get:function(){
		return window.location.hash.replace("#",'').split('-');
	},
	push:function( name ){
		 window.location.hash += "-"+name;
	},
	set:function( name ){
		window.location.hash = name;
	}
};

//状态机		
APP.FSM = function(){
	this.status = {};
	this.statusNames = [];
	this.currentStatusName = -1;
};

APP.FSM.prototype = {
	constructor:APP.FSM,
	//切换状态
	changeStatus:function( statusName, data){
		var page = this.status[statusName];
		if( page ){
			this.currentStatusName = statusName;
			this.status[statusName].enter( data );
			this.leaves();
		}else{
			console.log("no status+"+ s)
		}
	},
	//添加状态
	add:function( status ){
		var name = status.name;
		if( !this.status[name] ){
			this.status[name] = status;
			this.statusNames.push( name );
		}else{
			console.log("已经存在"+ name);
		}
	},
	//
	leaves:function(){
		
		for(var item in this.status){
			//console.log(item, this.currentStatusName)
			if( item != this.currentStatusName ){
				this.status[item].leave( this.currentStatusName );
			}
		}
	},
	pageMessage:function( data, name){
		if( name && this.status[name]){
			this.status[name].message( data );
		}else{
			for(var item in status){
				this.status[item].message( data );
			}
		}
	}
};


/**
	APP.FSMPageStatus
	
	定义一个页面原型，必须被继承
	1:页面进入需要执行 init 方法，重写 enter 方法请注意
	.enter();//进入
	.leave();//离开
*/


APP.FSMPageStatus = {
	name:null,// 在控制器中页面的名字
	currentStatus:false, //页面当前状态[false, true] 隐藏，显示
	isInit:false,//是否应初始化
	selector:"",//页面容器的选择器
	element:null,//页面容器元素由初始化方法赋值
	ui:{},
	//初始化
	init:function(){
		this.isInit = true;
		this.element = $(this.selector);
		this.initialize();
	},
	//进入
	enter:function( data ){
	
		if( this.isInit == false ){
			this.init();
		}
		if(this.currentStatus == false){
			this.currentStatus = true;
			this.element.removeClass('page-out').addClass("page-in");
		}
		this.onEnter( data );
	},
	//离开
	leave:function(){
		
		if(this.currentStatus == true){
			this.currentStatus = false;
			this.element.removeClass('page-in').addClass("page-out");
			this.onLeave();
		}
		
	},
	//第一次进入会调用 重写
	initialize:function(){
		console.log( this.name+" initialize" );
	},
	//页面进入 重写
	onEnter:function( data ){
		console.log( this.name+" onEnter" );
	},
	//页面离开 重写
	onLeave:function(){
		console.log( this.name+" onLeave" );
	},
	//接收消息 重写
	onMessage:function( data ){
		console.log( this.name+" onMessage" );
	}
};