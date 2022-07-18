let template = document.getElementsByTagName("body");
template[0].innerHTML += changeTab(template[0].getAttribute("content"));

function changeTab(valueAttribute){
    var htmlCode;
    if(valueAttribute == "home"){
        htmlCode = '<ul class="nav nav-tabs">'+
        '<li class="nav-item">'+
            '<a class="nav-link active" aria-current="page" href="../index.html">Home</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/add.html">Add</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/favorites.html">Favorites</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/mylinks.html">My links</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/settings.html">Settings</a>'+
        '</li>'+
        '<li class="nav-item">'+
        '<a class="nav-link" href="../html/donate.html">Coffee</a>'+
        '</li>'+
        '</ul>';
    }else if(valueAttribute == "add"){
        htmlCode = '<ul class="nav nav-tabs">'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../index.html">Home</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a <a class="nav-link active" aria-current="page" href="../html/add.html">Add</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/favorites.html">Favorites</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/mylinks.html">My links</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/settings.html">Settings</a>'+
        '</li>'+
        '<li class="nav-item">'+
        '<a class="nav-link" href="../html/donate.html">Coffee</a>'+
        '</li>'+
        '</ul>';
    }else if(valueAttribute == "favorites"){
        htmlCode = '<ul class="nav nav-tabs">'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../index.html">Home</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/add.html">Add</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link active" aria-current="page" href="../html/favorites.html">Favorites</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/mylinks.html">My links</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/settings.html">Settings</a>'+
        '</li>'+
        '<li class="nav-item">'+
        '<a class="nav-link" href="../html/donate.html">Coffee</a>'+
        '</li>'+
        '</ul>';
    }else if(valueAttribute == "mylinks"){
        htmlCode = '<ul class="nav nav-tabs">'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../index.html">Home</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/add.html">Add</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/favorites.html">Favorites</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link active" aria-current="page" href="../html/mylinks.html">My links</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/settings.html">Settings</a>'+
        '</li>'+
        '<li class="nav-item">'+
        '<a class="nav-link" href="../html/donate.html">Coffee</a>'+
        '</li>'+
        '</ul>';
    }else if(valueAttribute == "settings"){
        htmlCode = '<ul class="nav nav-tabs">'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../index.html">Home</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/add.html">Add</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/favorites.html">Favorites</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/mylinks.html">My links</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link active" aria-current="page" href="../html/settings.html">Settings</a>'+
        '</li>'+
        '<li class="nav-item">'+
        '<a class="nav-link" href="../html/donate.html">Coffee</a>'+
        '</li>'+
        '</ul>';
    }else if(valueAttribute == "donate"){
        htmlCode = '<ul class="nav nav-tabs">'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../index.html">Home</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/add.html">Add</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/favorites.html">Favorites</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/mylinks.html">My links</a>'+
        '</li>'+
        '<li class="nav-item">'+
            '<a class="nav-link" href="../html/settings.html">Settings</a>'+
        '</li>'+
        '<li class="nav-item">'+
        '<a class="nav-link active" aria-current="page" href="../html/donate.html">Coffee</a>'+
        '</li>'+
        '</ul>';
    }
    
    return htmlCode;
}

