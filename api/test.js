const {response, request} = require('express');
const mysql=require('mysql');
const ms=mysql.createConnection({
    user:'root',
    host:'localhost',
    database:'app',
    password:'5067',
    port:3306
})

ms.connect(err=>{
    if(err) console.log(err);
    else{
        console.log("성공");
    }
})

const test=(request,response) =>{

    response.send('성공성공');

}
const movie=(request,response) =>{
    var data2=request.body;
    var id=Object.values(data2);
    console.log(id[1]);
    const data=id[0];

    // ms.query('select name,image from movie where id= '+data,(error,rows)=>{
    //     if(error) throw error;
    //     console.log(rows);
    //     console.log(rows[0].name);
    //     response.send(rows[0]);
    // })
    ms.query('select name,image from movie',(error,rows)=>{
        if(error) throw error;
        console.log(rows);
        response.send(rows);
    })


}
const userproblem=(request,response) =>{
    var data2=request.body;
    var id=Object.values(data2);
    ms.query('select name,head,introduce,viewcount from userproblem order by viewcount desc',(error,rows)=>{
        if(error) throw error;
        console.log(rows);
        console.log("userproblem");
        response.send(rows);

    })

}

const userselect=(request,response) =>{
    var data2=request.body;
    var id=Object.values(data2);
    console.log(userselect);
    var data=id[1];

    ms.query('select * from userproblem where head=\''+data+'\'',(error,rows)=>{
        if(error) throw error;
        console.log(rows);
        console.log("userselect");
        console.log(rows[0].viewcount);
        var count=rows[0].viewcount;
        count++;
        ms.query('update userproblem set viewcount ='+count+' where head=\''+data+'\'',(error)=>{
            if(error) throw error;
        });
        response.send(rows);
        

    })

}



const usersearch=(request,response) => {       
    var data2=request.body;
    var id=Object.values(data2);
    console.log(usersearch);
    ms.query('select name,head,introduce,viewcount from userproblem where head like \'%'+id[1]+'%\' order by viewcount desc',(error,rows)=>{
        if(error){
            console.log(error);
        };
        console.log(rows);
        console.log("usersearch");
        response.send(rows);

    })

}

const check_nickname=(request,response) =>{      //닉네임 중복체크
    var data=request.body;
    var id=Object.values(data);
    console.log(check_nickname);



    ms.query('select * from user where nickname=\''+id[1]+'\'',(error,rows)=>{
        if(error){
            console.log(error);
        };
        console.log(rows);
        if(typeof rows[0]=="undefined"){
            response.send([{data:"ok_nickname"}]);
            console.log("1");
        }
        else{
            response.send([{data:"no_nickname"}]);
            console.log("2");
        }
        
    });


}


const check_device=(request,response)=>{      //앱이 켜질때 디바이스가 닉네임을 등록했는지 확인 
    var data=request.body;
    var id=Object.values(data);
    console.log(check_device);

    ms.query('select nickname from user where unique_id=\''+id[1]+'\'',(error,rows)=>{
        if(error){
            console.log(error);
        };
        console.log(rows[0]);
        if(typeof rows[0]=="undefined"){
          
            response.send([{data:"no_device"}]);
        }
        else{
            var result=rows[0];
            console.log(result);
            response.send([{data:"ok_device"},result]);

        }
    
    });
}

const insert_nickname=(request,response)=>{    //닉네임 추가
    var data=request.body;
    var id=Object.values(data);
    console.log(id);
    console.log(id[1]);
    console.log(id[2]);

    ms.query('insert into user (unique_id,nickname) values(?,?)',[id[1],id[2]],(error,rows)=>{
        if(error){
            console.log(error);
        };
        response.send([{data:"save"}]);
    });
}

const save_userproblem=(request,response)=>{
    var data=request.body;
    var id=Object.values(data);
    console.log(id);

    ms.query('select update_count from user where nickname =?',[id[1]],(error,rows)=>{
        if(error){
            console.log(error);
        };
        console.log(rows[0].update_count);
        if(rows[0].update_count!=0){
        ms.query('insert into userproblem (name,head,introduce,data) values(?,?,?,?)',[id[1],id[2],id[3],id[4]],(error,rows)=>{

            response.send([{data:"save"}]);
        });

        }

    });

}

const humanquiz=(request,response)=>{
    ms.query('select image from humanquiz',(error,rows)=>{
        response.send(rows);
    });

    
}

module.exports={
    test,
    movie,
    userproblem,
    usersearch,
    userselect,
    check_nickname,
    check_device,
    insert_nickname,
    save_userproblem,
    humanquiz,
}