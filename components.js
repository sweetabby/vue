var Main=Vue.component('Main',{
    template:`
             <div class="template">
                  <div class="body">
                      <div class="left">
                          <router-view class='leftaside' name="left"></router-view>
                      </div>
                      <div class="right">
                          <router-view class='rightaside' name="right"></router-view>
                      </div>
                  </div>
             </div>`
})
var Left=Vue.component('Menu',{
    data(){
        return{
            menu:[],
        }
    },
    template:`
         <div>
             <ul style="padding-left: 10px;padding-top: 30px">
                 <div v-for="item in data" style="padding-left: 10px">
                     <li><router-link :to="'#'+item.id">{{item.title}}</router-link></li>
                         <ul style="padding-left: 30px">
                             <li v-for="item1 in item.child"><router-link :to="'#'+item1.id">{{item1.title}}</router-link></li>
                         </ul>
                 </div>
             </ul>
         </div>    
    `,
    computed:{
        data(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj);
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i]);
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i]);
                            }
                        }
                    }
                }

            }
            return arr;
        }
    },
    mounted(){
        fetch('./app.txt').then(function (e) {
            return e.json();
        }).then((e)=>{
            this.menu=e;
        })
    },
    watch:{
        $route(){
            var num=this.$route.hash.slice(1);
            var pos=document.querySelector(".a"+num).offsetTop-60;
            console.log(num,pos)
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({number: document.querySelector('.right').scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.number.toFixed(0)
                })
                .start()
            animate()
        }
    }
})
var Right=Vue.component('Right',{
    template:`
       <div class="markdown-body" style="padding-left: 20px">
        <div v-html="data"></div>
     </div> 
    `,
    data(){
        return {
            data:''
        }
    },
    mounted(){
        fetch("./doc.txt").then(function (e) {
            return e.text()
        }).then((e)=>{
            this.data=e;
        })
    }
})
var Quick=Vue.component('Quick',{
    template:`
     <div style="padding-top: 60px;">
       quickquickquickquickquickquick
     </div>
    `
})