const Koa = require('koa');
const app = new Koa();
//返回的是函数
const router = require('koa-router')();
// 解析请求信息的
const bodyParser = require('koa-bodyparser');


//中间件
app.use(async (ctx,next) => {
   console.log(ctx.request.method);
   console.log(ctx.request.url);
   await next();
});

// 必须在router之前引入
app.use(bodyParser());

//加入中间件，使用路由
app.use(router.routes());

//处理get请求
router.get('/hello/:name',async (ctx,next)=>{
    let name = ctx.params.name;
    ctx.body = `hello ${name}`;
});

//提供一个表单。通过这个地址访问
router.get('/',async (ctx,next)=>{
    ctx.body = `<h1>Index</h1>
    <form action="/sign-in" method="post">
        <p>Name: <input name="name" type="text" id="name"></p>
        <p>Password: <input name="password" type="password" id="password"></p>
        <p>File: <input name="file" type="file" id="file"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});

router.post('/sign-in',async (ctx,next)=>{
    //看一下表单传过来的请求是怎样的
    // {"name":"123","password":"123"}
    let body = ctx.request.body;
    // 只能看到一些header信息
    let request = ctx.request;
    ctx.body = {
        body
    }
});

  
app.listen(3000);

// 只需安装koa2，再编写语句，node执行即可，不需要通过koa-generator来生成