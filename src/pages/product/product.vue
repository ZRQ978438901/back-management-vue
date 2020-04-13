<template>
  <div>
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },

    methods:{
      //如果是二级分类跳转的
      isSubCategoryInto(){
        if(this.$route.params.subCategory){
            return true
        }
        return false
      }
    }
  }
</script>

<style scoped>

</style>
