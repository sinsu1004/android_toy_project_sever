const express=require("express");

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
   
    });  //예상치 못한 에러 서버다운 방지 
const app=express();
const port=5000;
app.use(express.json()) ;



app.listen(port,()=>{
    console.log("서버가 정상적으로 실행 되었습니다.");
});

app.get("/",(request,response)=>{
    response.send("성공입니다");
});

require("./router/test_router")(app);