let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:"
        + date.getSeconds() + "Secs";
}


function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
       // console.log("State Changed Called. Ready State: " + xhr.readyState + " Status:"
         //   + xhr.status);
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 client Error or 500 Server Error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
}
const getURL = "http://localhost:3306/Employeepayroll/"
function getUserDetails(data) {
    console.log("Get User Data : " + data)
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made AJAX Call to server at : " + showTime());

const deleteURL = "http://localhost:3306/Employeepayroll/4"
function userDeleted(data) {
    console.log("User Deleted : " + data)
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3306/Employeepayroll"
const empData = {"name": "Krunali", "salary": "2000000"};
function userAdded(data) {
    console.log("User Added : " + data)
}
makeAJAXCall("POST", postURL, userAdded, true, empData);