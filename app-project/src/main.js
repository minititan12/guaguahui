import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueAreaLinkage from 'vue-area-linkage'
import './assets/border.css'
import './assets/reset.css'
import './assets/iconfont.css'
import 'babel-polyfill'
import 'swiper/dist/css/swiper.css'
import 'vue-area-linkage/dist/index.css'
import store from './store'
import touch from 'vue-directive-touch'
import { Lazyload, Swipe, SwipeItem, Loading, Toast, Button, NavBar, Tab, Tabs,Sticky,Circle,AddressEdit,Area,Dialog,Icon,RadioGroup,Radio,Checkbox,Image,Tag,Field,Cell,CellGroup,Search,Uploader,Popup,Divider,Stepper,Skeleton,Rate,ImagePreview,ActionSheet,SwipeCell,Step, Steps, CountDown} from 'vant'
import 'vant/lib/index.css';

Vue.prototype.HOST='/api'
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(VueAreaLinkage)
Vue.use(Lazyload)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Tab).use(Tabs)
Vue.use(Sticky)
Vue.use(Circle)
Vue.use(AddressEdit)
Vue.use(Area)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Image)
Vue.use(Tag)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Search)
Vue.use(Uploader)
Vue.use(Popup)
Vue.use(Divider)
Vue.use(touch)
Vue.use(Stepper)
Vue.use(Skeleton)
Vue.use(Rate)
Vue.use(ImagePreview)
Vue.use(ActionSheet)
Vue.use(SwipeCell)
Vue.use(Step).use(Steps)
Vue.use(CountDown)

localStorage.setItem('plusReady','false')

document.addEventListener('plusready', function(){
  //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
  localStorage.setItem('plusReady','true')
  plus.navigator.setStatusBarStyle('dark')
  plus.navigator.setStatusBarBackground('#ffffff')
  
  if(plus.os.name == 'Android'){
    localStorage.setItem('system','Android')
  }
  if(plus.os.name == 'iOS'){
    localStorage.setItem('system','iOS')
  }

  plus.key.addEventListener('backbutton',function(){
    //判断系统的名称是不是android
    if(plus.os.name == 'Android'){
      // 判断本地存储中main属性是不是为true,
      // true就是首页
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

router.beforeEach((to,from,next)=>{
  if(localStorage.plusReady == 'true'){
    if(to.meta.isImmersion){
      plus.navigator.setStatusBarBackground(to.meta.color)
      plus.navigator.setStatusBarStyle(to.meta.style)
      next()
    }
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
