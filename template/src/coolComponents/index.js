import Prompt from '@/coolComponents/Prompt/Prompt.js';
import DropdownMore from '@/coolComponents/DropdownMore/DropdownMore';
import LimitRowTableCol from '@/coolComponents/TableCol/LimitRowTableCol';
import SideMenu from '@/coolComponents/SideMenu/SideMenu';


let globalComponents = {
  Prompt
}

let components = [
  DropdownMore,
  LimitRowTableCol,
  SideMenu
]

globalComponents.install = function(Vue, options){
  Vue.prototype.$coolComponents = {};

  components.forEach((item) => {
    Vue.component(item.name, item);
  });

  // 在vue中挂在$coolComponents键，并把方法中的this更改为vue。
  for(let key in globalComponents) {
    Vue.prototype.$coolComponents[key] = {};
    for(let methodName in globalComponents[key]) {
      Vue.prototype.$coolComponents[key][methodName] = function() {
        // 整理需要传递的参数
        var param = [];
        for (var i = 0; i < arguments.length; i++) {
          param.push(arguments[i]);
        }
        globalComponents[key][methodName].apply(Vue.prototype, param);
      }
    }
  }
};

export default globalComponents;
