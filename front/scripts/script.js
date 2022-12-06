var tabList = new Array();
var inputName = document.getElementById("input-name");
var bttnSave = document.getElementById("bttn-save");
var bttnTest= document.getElementById("bttn-test");
var urlTab = "";
var urlICon = "";
var user_info = "2361478127648123"

var myTabList = document.getElementById("my-tab-list");
var myTabs = document.getElementsByClassName("my-tab");

bttnTest.addEventListener("click", ()=>{
    test()
})

bttnSave.addEventListener("click", ()=>{
    saveTab({
        name: inputName.value,
        url: urlTab,
        iconUrl: urlICon,
        userId: user_info
    })
});

window.onload = onload()

function onload(){
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        inputName.value = tabs[0].title;
        urlTab = tabs[0].url;
        tabs[0].favIconUrl == "" ? urlICon = "link_white_blue.png" : urlICon = tabs[0].favIconUrl;
    })

    // chrome.identity.getProfileUserInfo({'accountStatus': 'SYNC'},function(info){
    //     user_info = info
    // })

    updateTabList();
}

function saveTab(tab) {
    type = ""
    method = "POST"
    if (tabList.every((item, index, array) => item.url != tab.url)) {
        tabList.unshift(tab);
        type = "save";
        myTabList.insertBefore(createHtmlTab(tab), myTabList.firstChild)
    } else {
        tabList[tabList.findIndex((item, index, array) => item.url == tab.url)] = tab;
        type = "update";
        method= "PUT"
        updateTabList();
    }

    console.log((request(method, tab, `links/${type}`)).status)
}

function deleteTab(){    
    let tab = this.parentNode.getAttribute("tab")
    tab = JSON.parse(tab)
    console.log(tab)
    let index  = tabList.findIndex((item, index, array) => item.url == tab.url);
    tabList.splice(index, 1);

    updateTabList();
    console.log((request("DELETE", tab, `links/delete`)).status)
}


async function request(method, body, endpoint){
    const init = {
        method: method,
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    }
    console.log(JSON.stringify(body))
    const response = await fetch(`http://localhost:8080/${endpoint}`, init)

    return response
}

function updateTabList(){

    console.log(user_info)

    fetch(`http://localhost:8080/links/list/${user_info}`)
    .then(responseData =>{
        return responseData.json()
    })
    .then(jsonData=>{
        tabList = jsonData.slice()
        console.log(tabList)
        loadMyTabs();
    })
    .catch(erro=>{
        console.log(erro)
    })


    // await chrome.storage.sync.get(["LINKEEP_STORAGE"]).then(listJSON => {
    //     listJSON.LINKEEP_STORAGE != undefined ? tabList = JSON.parse(listJSON.LINKEEP_STORAGE).slice(): console.log(undefined);
    // }).catch(error => console.log(error));

}

function createHtmlTab(tab){

    let newLi = document.createElement("li")
    newLi.classList.add("my-tab")

    let newDiv = document.createElement("div")
    newDiv.classList.add("tab-link-content")
    newLi.appendChild(newDiv)

    let a = document.createElement("a")
    a.href = tab.url
    newDiv.appendChild(a)

    let imgIcon = document.createElement("img")
    imgIcon.src = tab.iconUrl
    a.appendChild(imgIcon)

    let newDiv2 = document.createElement("div")
    a.appendChild(newDiv2)

    let h2 = document.createElement("h2")
    h2.innerText = tab.name
    newDiv2.appendChild(h2)


    let newDivOptions = document.createElement("div")
    newDivOptions.classList.add("tab-option-content")
    newDivOptions.setAttribute('tab', JSON.stringify(tab))
    newLi.appendChild(newDivOptions)

    let newDivOption = document.createElement("div")
    newDivOption.classList.add("option","copy-tab")
    newDivOptions.appendChild(newDivOption)

    let imgOption = document.createElement("img")
    imgOption.src = "./assets/archives.png"
    newDivOption.appendChild(imgOption)

    let newDivOption2 = document.createElement("div")
    newDivOption2.classList.add("option","edit-tab")
    newDivOptions.appendChild(newDivOption2)

    let imgOption2 = document.createElement("img")
    imgOption2.src = "./assets/pen.png"
    newDivOption2.appendChild(imgOption2)

    let newDivOption3 = document.createElement("div")
    newDivOption3.classList.add("option","delete-tab")
    newDivOptions.appendChild(newDivOption3)
    newDivOption3.addEventListener("click", deleteTab)

    let imgOption3 = document.createElement("img")
    imgOption3.src = "./assets/delete.png"
    newDivOption3.appendChild(imgOption3)

    return newLi;
}

function loadMyTabs(){
    while(myTabList.firstChild){
        myTabList.removeChild(myTabList.firstChild)
    }

    tabList.forEach((tab)=>{
        myTabList.appendChild(createHtmlTab(tab))
    })
}

// async function test(){
//     const response = await fetch(`http://localhost:8080/links/list/${user_info}`)
//     .then(responseData =>{
//         responseData.json()
//     })
//     .then(jsonData=>{
//         console.log()
//     })
// }