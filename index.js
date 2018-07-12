//类的调用检测 检测实例是不是new出来的
function _classCallCheck(instance,constructor){
    if(!(instance instanceof constructor)){
        throw new Error('Class constructor Child cannot be invoked without new')
    }
}

function definePropertys(target,arr){
    for(let i=0;i<arr.length;i++){
        Object.defineProperty(target,arr[i].key,{
            ...arr[i],
            configurable:true,
            enumerable:true,
            writable:true
        })
    }
}
function _createClass(constructor,protoPropertys,staticPropertys){
    if(protoPropertys.length>0){
        definePropertys(constructor.prototype,protoPropertys)
    }
    if(staticPropertys.length>0){
        definePropertys(constructor,staticPropertys);
    }
    
}
let Parent = function(){
    // 写逻辑
    function P(){
        _classCallCheck(this,P);//检测调用方式,非 new的方式报错；Parent();
    }
    _createClass(P,//属性描述器
        [
        {
            key:'eat',
            value:function(){
                console.log('吃')
            }
        }
        ],[
            {
              key:'static',
              value:function(){
                  console.log('我是静态的')
              } 
            }
        ])
    return P
}()
//子类继承父亲
function _inherits(subClass,superClass){
    //继承共有属性
    // function create(parentPrototype){
    //     function Fn(){}
    //     Fn.prototype = parentPrototype;
    //     return new Fn();
    // }
    subClass.prototype = Object.create(superClass.prototype,{
        constructor:{value:subClass}
    });
    //继承静态的方法
   // subClass.__proto__ = superClass;
    Object.setPrototypeOf(subClass,superClass);
}

let Child = (function(Parent){
    // 先实现继承父类的公有属性和静态方法
    _inherits(C,Parent);
    function C(){
        _classCallCheck(this,C);
        let obj = Parent.call(this);
        let taht = this;
        if(typeof obj ==='object'){
           that = obj;
        }
        this.age = 9;//解决了父类返回了一个引用类型的问题
    }
    return C;

})(Parent);

let child = new Child();
