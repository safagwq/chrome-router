function get(url,fn){
    var xhr = new XMLHttpRequest();            
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
            fn(xhr.responseText)
        }
    }
    xhr.send()
}

// get('./routes.json',function (data){
//     alert(data)
// })

