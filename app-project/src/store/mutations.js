export default {
  //全局突变方法
  //添加微信用户信息
  addAweixinData(state,data){
    state.aweixin = data
  },
  //更改登录状态
  changeLoginStatus(state,bool){
    state.login = bool
  },
  //改变登录方式
  changeLoginWay(state,bool){
    state.showAccountLogin = bool
  },
  //更新用户信息
  updateUserData(state,data){
    state.userData = data
  },
  //改变主页面刷新状态
  updateRefreshStatus(state,bool){
    state.mainPageRefresh = bool
  },
  //改变购物车刷新状态
  updateCartRefreshStatus(state,bool){
    state.cartRefresh = bool
  },
  //改变回到顶部的状态
  updatedToTop(state,bool){
    state.toTop = bool
  },


  //home
  //改变当前的tabbar
  changeTab(state,index){
    state.currentTab = index
  },
  //是否显示搜索
  changeShowSearch(state,bool){
    state.showSearch = bool
  },
  //改变搜索的值
  changeSearchText(state,text){
    state.searchText = text
  },

  //product
  //改变当前product数据
  changeCurrentProductData(state,data){
    state.currentProductData = JSON.parse(JSON.stringify(data))
  },
  //改变当前product的属性数据
  changeProductDetailData(state,data){
    state.productDetailData = JSON.parse(JSON.stringify(data))
  },
  //改变当前产品主图
  changeProductPopUpImg(state,img){
    state.currentProductPopUpImg = img
  },
  //改变当前选择的库存
  changeCurrentProductPopUpStock(state,stock){
    state.currentProductPopUpStock = stock
  },
  //改变当前选择的购买信息
  changeCurrentBuyDetail(state,buydetail){
    state.currentBuyDetail = buydetail
  },
  //关闭弹出窗口
  closePopup(state){
    state.showPopUp = false
  },
  //打开弹出窗口
  openPopup(state){
    state.showPopUp = true
  },
  //弹出图片预览
  changeShowMasking(state,bool){
    state.showMasking = bool
  },

  //cart
  //在购物车添加商品
  addCommodity(state,detail){
    state.cart = [...state.cart,detail]
  },
  //修改购物车列表
  editCommodity(state,cart){
    state.cart = cart
  },
  //更新购物车
  updateCart(state){
    let cart = [...state.cart]
    let result = []
    let haveGood = []
    for(let item of cart){
      let index = haveGood.indexOf(item.id)
      if(index == -1){
        let newItem = {...item}
        result.push(newItem)
        haveGood.push(item.id)
      }else{
        for(let newItem of result){
          if(newItem.id == item.id){
            newItem.number = newItem.number + item.number
          }
        }
      }
    }
    state.cart = result
  },
  //修改选择的商品ID
  changeSelectedID(state,selectedID){
    state.selectedID = selectedID
  },
  //清空要购买的列表
  clearSelectedID(state){
    state.selectedID = []
  },
  //更新购物车是否全选的属性
  updateSelectedAll(state,bool){
    state.selectedAll = bool
  },
  //更新已选择的要购买的列表
  updateSelectedList(state){
    let result = []
    let priceSum = 0
    if(state.selectedID.length > 0){
      for(let ID of state.selectedID){
        for(let item of state.cart){
          if(item.id == ID){
            let price = parseFloat(item.price)
            let number = parseFloat(item.number)
            let totalPrice = price * number
            item.totalPrice = totalPrice.toFixed(2)
            priceSum = priceSum + totalPrice
            result.push(item)
          }
        }
      }
    }
    priceSum = parseFloat(priceSum).toFixed(2)
    state.selectedList = result
    state.selectedListTotalPrice = priceSum
  },
  //清除购物车中已经进入待支付的商品
  clearCart(state){
    let cartList = JSON.parse(JSON.stringify(state.cart))
    let result = []

    for(let i = 0; i < cartList.length; i++){
      let match = false
      for(let id of state.selectedID){
        if(cartList[i].id == id){
          match = true
        }
      }
      if(!match){
        result.push(cartList[i])
      }
    }

    state.cart = result
  },

  //confirm
  //更新确认订单的数据
  updatedConfirmData(state,data){
    let result = JSON.parse(JSON.stringify(data))
    state.confirmData = result
  },
  //初始化待确认订单列表
  initConfirmList(state){
    state.confirmList = []
  },
  //初始化待确认商品总价
  initComfirmTotalPrice(state){
    state.confirmListTotalPrice = 0
  },
  //添加待确认的商品列表
  addConfirmList(state){
    let selectedList = JSON.parse(JSON.stringify(state.selectedList))
    state.confirmList = [...selectedList]
  },
  //直接添加到待确认商品列表
  addToConfirmList(state,good){
    let detail = JSON.parse(JSON.stringify(good))
    state.confirmList = [detail]
  },
  //计算待确认的商品总价格
  countConfirmTotalPrice(state){
    let price = 0
    let list = JSON.parse(JSON.stringify(state.confirmList))
    for(let item of list){
      let itemTotalPrice = parseFloat(item.price) * parseFloat(item.number)
      price = price + itemTotalPrice
    }
    price = price.toFixed(2)
    state.confirmListTotalPrice = price
  },


  //pay
  //更新支付订单信息
  updatePayOrderData(state,data){
    let result = JSON.parse(JSON.stringify(data))
    state.payOrderData = result
  },
  //添加待支付的商品列表
  addWaitPayList(state){
    state.waitPayList = [...state.waitPayList,...state.confirmList]
  },
  //更新待支付的商品列表
  updateWaitPayList(state){
    let list = [...state.waitPayList]
    let waitPayID = []
    let result = []
    for(let item of list){
      let index = waitPayID.indexOf(item.id)
      if(index == -1){
        let newItem = {...item}
        result.push(newItem)
        waitPayID.push(item.id)
      }else{
        for(let newItem of result){
          if(newItem.id == item.id){
            newItem.number = newItem.number + item.number
            let totalPrice = parseFloat(newItem.number) * parseFloat(newItem.price)
            newItem.totalPrice = totalPrice.toFixed(2)
          }
        }
      }
    }
    state.waitPayList = result
  },
  //删除待支付的商品
  delWaitPayGoods(state,id){
    let list = [...state.waitPayList]
    for(let i = 0; i < list.length; i++){
      if(list[i].id == id){
        list.splice(i,1)
      }
    }
    state.waitPayList = list
  },
  //计算选择商品的总价格
  // countWaitPayTotalPrice(state){
  //   let price = 0
  //   let list = [...state.waitPayList]
  //   for(let item of list){
  //     price = price + parseFloat(item.totalPrice)
  //   }
  //   price = price.toFixed(2)
  //   state.waitPayListTotalPrice = price
  // },


  //address
  //更新newAddress
  updateNewAddress(state,addressDetail){
    state.newAddress = addressDetail
  },
  //更新addressList
  updateAddressList(state,addressList){
    state.addressList = addressList
  },
  //更新默认地址
  updateDefaultAddress(state,data){
    state.defaultAddress = data
  },

  //初始化classifyList数据
  initClassifyList(state,data){
    state.classifyList = data
  },
  //改变classifyIndex的值
  changeCurrentClassifySort(state,index){
    state.currentClassifySort = index
  },

  //客服
  //获取消息
  getAnswer(state, say) {
    // state.answer.push(playload)
    let answer = JSON.parse(JSON.stringify(state.answer))

    if(answer.hasOwnProperty(say.shop_user_id)){
      answer[say.shop_user_id].push(say)
    }else{
      answer[say.shop_user_id] = []
      answer[say.shop_user_id].push(say)
    }

    state.answer = answer
  },

  //获取历史消息
  getHistoryAnswer(state,data){
    let answer = JSON.parse(JSON.stringify(state.answer))
    let history = JSON.parse(JSON.stringify(data.historyData)).reverse()
    let newHistory = []
    for(let item of history){
      newHistory.push({
        css: item.attribute,
        id: item.id,
        shop_user_id: item.shop_user_id,
        text: item.content,
        timetamp: item.timetamp,
        type: 1
      })
    }
    console.log('newhistory',newHistory)
    console.log('answer',answer)
    if(answer.hasOwnProperty(data.id)){
      answer[data.id] = [...newHistory,...answer[data.id]]
    }else{
      answer[data.id] = [...newHistory]
    }
    console.log(answer)

    state.answer = answer
  },

  //储存新消息
  getNewAnswer(state,say){
    let newAnswer = JSON.parse(JSON.stringify(state.newAnswer))
    if(newAnswer.hasOwnProperty(say.shop_user_id)){
      newAnswer[say.shop_user_id].push(say)
    }else{
      newAnswer[say.shop_user_id] = []
      newAnswer[say.shop_user_id].push(say)
    }

    state.newAnswer = newAnswer
  },

  //删除新消息中的一个聊天对象
  delNewAnswer(state,id){
    for(let key in state.newAnswer){
      if(key == id){
        delete state.newAnswer.key
      }
    }
  },   

  //添加新消息到消息列表,并清除新消息
  addNewAnswerToAnswer(state,id){
    let messages = []
    let newAnswer = JSON.parse(JSON.stringify(state.newAnswer))
    for(let key in newAnswer){
      if(key == id){
        messages = newAnswer[key]
        newAnswer[key] = []
      }
    }
    state.newAnswer = newAnswer

    let answer = JSON.parse(JSON.stringify(state.answer))
    let match = false
    for(let key in answer){
      if(key == id){
        match = true
        answer[key] = [...answer[key],...messages]
      }
    }
    
    if(!match){
      answer[id] = messages
    }

    state.answer = answer
  },

  updateNewAnswer(state,shopList){
    let newAnswer = JSON.parse(JSON.stringify(state.newAnswer))
    for(let shop of shopList){
      let match = false
      for(let key in newAnswer){
        if(key == shop.shop_user_id){
          match = true
        }
      }
      if(!match){
        newAnswer[shop.shop_user_id] = []
      }
    }

    state.newAnswer = newAnswer
  },

  //更新订单列表
  updateOrderList(state,list){
    state.orderList = list
  },

  //更新订单标题
  updateOrderActive(state, active){
    state.orderActive = active
  },

  //更新品牌页面输入框输入的值
  updateCurrentGoodsInputValue(state,value){
    state.currentGoodsInputValue = value
  },

  //更新服务弹出框是否弹出
  updateServePopUp(state,bool){
    state.servePopUp = bool
  },

  //更新分享弹出框是否弹出
  updateSharePopUp(state,bool){
    state.sharePopUp = bool
  },

  //更新消息数量
  updatedMessageNum(state){
    let num = 0
    for(let key in state.newAnswer){
      num = num + state.newAnswer[key].length
    }

    state.messageNum = num
  },

  //添加第一次加载的客服
  addToServiceFirstLoad(state,shopID){
    let list = [...state.serviceFirstLoad]
    list.push(shopID)
    state.serviceFirstLoad = list
  },

  //更新微信token
  updateWXTicket(state,ticket){
    state.wxTicket = ticket
  },

  //改变支付方式
  changePayRadio(state,str){
    state.payRadio = str 
  },

  //营销功能
  //拼团
  //更新拼团总数据
  updateGroupBuyData(state,data){
    let result = JSON.parse(JSON.stringify(data))
    state.groupBuyData = result
  },

  //更新拼团产品页中选择的拼团id
  updatedGroupBuyID(state,id){
    state.groupBuyID = id
  },

  //更新拼团产品页中的已有拼团列表
  updateAllSpellGroups(state,data){
    let list = JSON.parse(JSON.stringify(data))
    state.allSpellGroups = list
  },

  //拼团弹窗是否显示
  changeGroupDialogState(state,obj){
    state.showGroupDialog = obj
  }
}