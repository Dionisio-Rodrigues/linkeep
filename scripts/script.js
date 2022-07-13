
var inputName = document.getElementById("inputName");
var inputLink = document.getElementById("inputLink");
var bttnSave = document.getElementById("saveBttn");

let tabList = [];

bttnSave.addEventListener("click", saveTab)

chrome.storage.sync.get(["LINKEEP_STORAGE"], (listJSON)=>{ 
    tabList = JSON.parse(listJSON.LINKEEP_STORAGE).slice();
    console.log("esse -->" +tabList)
});

function saveTab(){
    let type = "??????????"
    let tab = {
        name: inputName.value,
        url: inputLink.value
    };

    chrome.storage.sync.get(["LINKEEP_STORAGE"], (listJSON)=> tabList = JSON.parse(listJSON.LINKEEP_STORAGE).slice());

    console.log(tabList.every((item, index, array) => JSON.parse(item).url != tab.url));

    if(tabList.every((item, index, array) => JSON.parse(item).url != tab.url)){
        tabList.push(JSON.stringify(tab));
        type = "save"
    }else{
        tabList[tabList.findIndex((item, index, array) => JSON.parse(item).url == tab.url)] = JSON.stringify(tab);
        type = "update"
    }

    chrome.storage.sync.set({"LINKEEP_STORAGE": JSON.stringify(tabList)}, ()=> console.log(type+" successfully") );
}

window.onload = () => {

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        inputName.value = tabs[0].title;
        inputLink.value = tabs[0].url;
    })
}