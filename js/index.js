$(function () {
    if(!localStorage.getItem('verification')){
        alert("登录缓存已失效，即将转入登录界面！");
        window.location.href = 'login.html';
    }
});

function routing() {
    window.location.href = 'update_information.html';
}
var type;
var state;
var sumPages;
var pageNum = 1;
var title = new Array();
var author = new Array();
var time = new Array();
var id = new Array();
let val1 = document.getElementById("dropdownMenu").innerText;
let val2 = document.getElementById("dropdownMenu1").innerText;

function viewDetail(which) {
    let idValue = which.getAttribute('id');
    let state = which.getAttribute('class');
    if(state === '0')
        window.location.href = 'published_information.html?id=' + idValue;
    if(state === '1')
        window.location.href = 'deleted_information.html?id=' + idValue;
}
function proceedData(data){
    for(let i = 0; i < data.length; i++){
        title[i] = data[i].title;
        author[i] = data[i].author;
        time[i] = data[i].createTime.substring(0,10);
        id[i] = data[i].id;
    }
}

function ajaxRequest() {
    $.ajax({
        // beforeSend: function (request) {
        //     request.setRequestHeader('Authorization', localStorage.getItem('verification'));
        // },
        type: 'GET',
        headers: {'Authorization':localStorage.getItem('verification')},//Authorization
        url: baseURL + getNews,
        data: {
            'type': type,
            'status': state,
            'pageNum': pageNum
        },
        success: function (res,status) {
            let data = res.data;
            let inf = ``;
           ;
            if(res.status === 0){
                sumPages = res.message;
                $('.essay-list').empty(); //清空.essay-list 内所有内容
                proceedData(data);
                let tempInf;
                for(let i = 0; i < data.length; i++){
                    tempInf = `
                        <div class="row">
                            <div class="col-sm-5 col-md-5 col-1">
                                <span class="inf-title">&raquo; ${title[i]}</span>
                            </div>
                            <div class="col-sm-2 col-md-2 col-2">
                                <span class="inf-title" ><b>${author[i]}</b></span>
                            </div>
                            <div class="col-sm-3 col-md-3 col-3" >
                                <span class="inf-title" >${time[i]}</span>
                            </div>
                            <div class="col-sm-2 col-md-2 col-4">
                                <span class="inf-title">
                                <a href="#" class="${state}" id="${id[i]}" onclick="viewDetail(this);return false;">查看</a>
                                </span>
                            </div>
                        </div> `;
                    inf += tempInf;
                }
                $('.essay-list').append(inf);
                document.getElementById("page").innerText = pageNum + '';
            }
        }
    })
}
function menuBtn(which) {
    type = which.getAttribute('id');
    let typeValue = document.getElementById(type).innerText;
    document.getElementById("dropdownMenu").innerText = typeValue;
    if(document.getElementById("dropdownMenu1").innerText !== val2 && document.getElementById("dropdownMenu").innerText !== val1){
        pageNum = 1;
        ajaxRequest(); //向后台getNews
    }
}
function menuBtn1(which) {
    let status = which.getAttribute('id');
    let statusValue = document.getElementById(status).innerText;
    document.getElementById("dropdownMenu1").innerText = statusValue;
    if(status === 'online')
         state = 0;
    if(status === 'delete')
         state = 1;
    if(document.getElementById("dropdownMenu1").innerText !== val2 && document.getElementById("dropdownMenu").innerText !== val1){
        pageNum = 1;
        ajaxRequest(); //向后台getNews
    }
}
function prev() {
    if(pageNum === 1){
        // alert("已到达首页！");
        return false;
    }
    else {
        pageNum--;
        ajaxRequest();
    }
}
function next() {
    if(pageNum < sumPages){
        pageNum++;
        ajaxRequest();
    }
    else {
        // alert("已到达尾页");
        return false;
    }
}
