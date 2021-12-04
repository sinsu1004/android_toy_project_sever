const router=require("express").Router()
const api=require("../api/test.js");
module.exports =app => {
    router.post('/test',api.test);
    router.post('/movie',api.movie);
    router.get('/movie2',api.movie);
    router.post('/userproblem',api.userproblem);
    router.post('/usersearch',api.usersearch);
    router.post('/userselect',api.userselect);
    router.post('/check_nickname',api.check_nickname);
    router.post('/check_device',api.check_device);
    router.post('/insert_nickname',api.insert_nickname);
    router.post('/save_userproblem',api.save_userproblem);
    router.post('/humanquiz',api.humanquiz);
    app.use("/sinsu",router);
}