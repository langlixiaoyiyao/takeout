import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

const methods = [
    'get','put','post','delete'
];

const apis = {
    category: '/index_category', // 页面食品分类列表
    shops: '/shops', //商铺列表(根据经纬度)
    searchGoods: '/search_shops', // 根据关键字获取商家列表
    captcha: '/captcha', //获取图片验证码
    pwdLogin: '/login_pwd', //账号密码登录
    sendcode: '/sendcode', // 发送短信验证码
    smsLogin: '/login_sms', // 手机号验证码登录
    userinfo: '/userinfo', // 获取用户信息(根据会话)
    logout: '/logout', // 请求登出
    shopInfo: '/shop_info', // 获取商家信息
    shopRatings: '/shop_ratings', //获取商家评价数组
    shopGoods: '/shop_goods', //获取商家商品数组
    updateUser: '/update_userinfo',
};


const Api = {
    msgHandler: () => {

    }
};

instance.interceptors.request.use(function(config) {
    return config;
});

instance.interceptors.response.use(function(response) {
    if (response.data.code === 1 && !response.config?.customConfig?.pass) {
        Api.msgHandler(response.data.msg);
    }
    return response.data;
}, function(error) {
    Api.msgHandler(error);
    return Promise.reject(error);
});


for(const item in apis) {
    Api[item] = {};
    for(const method of methods) {
        Api[item][method] = (data, config, customConfig) => {
            return instance({
                url: apis[item],
                method: method,
                ...(method == 'get' ? {params: data} : {data: data}),
                headers: config,
                customConfig,
            })
        }
    }
}

export default Api;

