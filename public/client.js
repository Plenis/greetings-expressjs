document.addEventListener('DOMContentLoaded', function(){

let messageElem = document.querySelector('.info');

if(messageElem === ''){
    setTimeout(function(){
messageElem.innerHTML = '';
    }, 3000);
};
});