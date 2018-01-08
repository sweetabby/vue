var router=new VueRouter({
    routes:[
        {path:'/',component:Main,
            children:[
                {path:'',components:{
                    left:Left,
                    right:Right,
                }}
            ]}
    ]
})
var router=new Vue({
    el:'#root',
    router,
})