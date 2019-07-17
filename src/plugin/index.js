import config from '@/config'
const { plugin } = config

export default (Vue) => {  
  for (let name in plugin) {
    const value = plugin[name];
    //alert(`./${name}`);  // --- .error-store
    Vue.use(require(`./${name}`).default, typeof value === 'object' ? value : undefined)
  }
}
