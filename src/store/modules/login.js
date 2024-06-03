import Api from '@/common/api';

export default {
    state: {
        userInfo: {
            type: 'unLogin',
            data: {},
        }
    },
    mutations: {
        updateUserInfo(state, obj) {
            state.userInfo = Object.assign(state.userInfo, obj);
        }
    },
    actions: {
        async getUserInfo(context, customConfig) {
            console.log(context);
            const res = await Api.userinfo.get({
                id: context.state.userInfo.data._id || ''
            }, {}, customConfig);
            let obj = {
            }
            if (res.code === 0) {
                obj = {
                    data: res.data,
                    type: 'login',
                }
            } else {
                obj = {
                    data: {},
                    type: 'unLogin',
                }
            }
            context.commit('updateUserInfo', obj);
        }
    }
}
