
// 缓存管理
const bf = '1.0.0';

const get = (key)=>{
    let temp = wx.getStorageSync(bf);
    return temp[key];
}

const set = (key,value)=>{
    if (!wx.getStorageSync(bf)) {
        wx.setStorageSync(bf, {})
    }
    let temp = wx.getStorageSync(bf);
    temp[key] = value;
    wx.setStorageSync(bf, temp)
}

const clear = (cb)=>{
    wx.clearStorage({
        success(e){
            if(typeof cb == 'function')
            cb(e);
        }
    })
}

// 有就更新对象没有就添加对象
const update = (arr,obj)=>{
    for(var i = 0;i<arr.length;i++){
        if(has(obj['title'],arr[i])){
            arr[i] = obj
        }else{
            arr.push(obj)
        }
    }
    return arr;
}
const has = (value,obj)=>{
    if(obj['title'] == value){
        return true;
    }
    return false;
}

module.exports = {
    get,set,clear,update
}