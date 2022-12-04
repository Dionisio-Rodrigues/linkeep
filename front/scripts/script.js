var tabList = new Array();
var inputName = document.getElementById("input-name");
var bttnSave = document.getElementById("bttn-save");
var bttnTest= document.getElementById("bttn-test");
var urlTab = "";
var urlICon = "";
var user_info

var myTabList = document.getElementById("my-tab-list");
var myTabs = document.getElementsByClassName("my-tab");

bttnTest.addEventListener("click", ()=>{
    test()
})

bttnSave.addEventListener("click", ()=>{
    saveTab({
        name: inputName.value,
        url: urlTab,
        urlIcon: urlICon,
        userId: user_info
    })
});

window.onload = () => {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        inputName.value = tabs[0].title;
        urlTab = tabs[0].url;
        tabs[0].favIconUrl == "" ? urlICon = "../assets/link_white_blue.png" : urlICon = tabs[0].favIconUrl;
    })

    chrome.identity.getProfileUserInfo({'accountStatus': 'SYNC'},function(info){
        user_info = info.id
    })

    updateTabList();
}

async function saveTab(tab) {
    type = ""
    if (tabList.every((item, index, array) => item.url != tab.url)) {
        tabList.unshift(tab);
        type = "save";
        myTabList.insertBefore(createHtmlTab(tab), myTabList.firstChild)
    } else {
        tabList[tabList.findIndex((item, index, array) => item.url == tab.url)] = tab;
        type = "update";
        updateTabList();
    }

    const init = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(tab)
    }
    console.log(JSON.stringify(tab))
    const response = await fetch("http://localhost:8080/links/"+type, init)
    console.log(response.status)
}

function deleteTab(){    
    let tab = this.parentNode.getAttribute("tab")
    tab = JSON.parse(tab)

    let index  = tabList.findIndex((item, index, array) => item.url == tab.url);
    tabList.splice(index, 1);
    chrome.storage.sync.set({"LINKEEP_STORAGE": JSON.stringify(tabList)}, () => console.log("delete successfully") );
    updateTabList();

}

async function updateTabList(){

    let copyTabList = tabList.slice()

    await chrome.storage.sync.get(["LINKEEP_STORAGE"]).then(listJSON => {
        listJSON.LINKEEP_STORAGE != undefined ? tabList = JSON.parse(listJSON.LINKEEP_STORAGE).slice(): console.log(undefined);
    }).catch(error => console.log(error));

    loadMyTabs();
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
    imgIcon.src = tab.icon
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