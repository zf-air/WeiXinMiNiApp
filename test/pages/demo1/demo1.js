Page({
    data:{
        msg:'hello zf'
    },
    click:function(){
        this.setData({msg:'click me'})
    },
    clickBack:function(){
        this.setData({msg:'hello zf'})
    }
})