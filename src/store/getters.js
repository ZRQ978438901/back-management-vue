/*
包含多个基于state的getter计算属性的对象
 */
export default {

  getCurrentTitle(state){
    return state.currentTtile
  },

  getDefaultActive(state){
    return state.defaultActive
  }

}
