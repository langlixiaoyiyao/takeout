<template>
    <div class="page-common page-user">
        <header-top title="用户信息页面" />
        <div>用户名：{{userInfo.data.name}}</div>
    </div>
</template>
<script>

import HeaderTop from "@/components/HeaderTop.vue";
import { mapState } from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.login.userInfo,
        })
    },
    components: {
        HeaderTop,
    },
    mounted() {
        this.$store.dispatch("delayUpdatePageState");
    }
}
</script>