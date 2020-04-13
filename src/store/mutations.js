/*
直接更新state的多个方法的对象
 */
export default {
  changeTitle(state,title){
    state.currentTtile=title
  },
  changeDefultActive(state,index){
    state.defaultActive=index
  }


}
