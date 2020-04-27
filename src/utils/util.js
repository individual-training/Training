
// Input onChange delay
export const delayChange = (() => {
  let timer = null;
  const clear = (timer) => {
    clearTimeout(timer);
    timer = null;
  }
  return (fn) => {
    timer && clear(timer)
    timer = setTimeout(() => {
      fn();
    },400)
  }
})()



export const objToArr = (obj={}) => {
  return Object.keys(obj).map(item=>{
    return [item,obj[item]]
  })
}
