<template>
    <div class="loading">
        <img class="pic" :src="theme.images.I010">
        <div class="close">{{txt}}</div>
    </div>
</template>
<script>
export default {
    props: {
        gameData: Object,
        theme: Object
    },

    data() {
        return {
            pic: this.gameData.theme.images.I010,
            txt: 3
        }
    },

    created() {
        // loading页面关闭
        let timer = setInterval(() => {
            this.txt = this.txt - 1;

            if(this.txt === 0) {
                this.$router.push('introduction');
            }
        }, 1000)
    }
}
</script>
<style lang="less" scoped>
    .loading {
        position: relative;

        .pic {
            width: 100vw;
            height: 100vh;
            z-index: 100;
        }

        .close {
            position: absolute;
            right: .44rem;
            width: .64rem;
            height: .64rem;
            border-radius: 50%;

        }
    }
</style>


