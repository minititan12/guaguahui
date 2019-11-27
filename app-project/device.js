document.addEventListener('plusready', function(){
  //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
  plus.key.addEventListener('backbutton',function(){
    //判断系统的名称是不是android
    if(plus.os.name == 'Android'){
      //判断本地存储中main属性是不是为true,
      //true就是首页
      if(localStorage.main == 'true'){
        //获取android实例对象
        let main = plus.android.runtimeMainActivity()
        //转移到后台
　　　　main.moveTaskToBack(true)
      }else{
        window.history.go(-1)
      }
    }
  })
})