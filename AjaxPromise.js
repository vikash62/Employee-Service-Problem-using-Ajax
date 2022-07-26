let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:"
        + date.getSeconds() + "Secs";
}


function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log("State Changed Called. Ready State: " + xhr.readyState + " Status:"
            //   + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match('[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("Handle 400 client Error or 500 Server Error");
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else {
            xhr.send();
        }
    });
}

const getURL = "http://localhost:3000/employees/"
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: " + responseText);
    })
    .catch(error => console.log("Get Error Status: " + JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/11"
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: " + responseText);
    })
    .catch(error => console.log("Delete Error Status: " + JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const empData = { "name": "Hary", "salary": "20000" };
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("User Added: " + responseText);
    })
    .catch(error => console.log("Post Error Status: " + JSON.stringify(error)));      