
var inputName = document.getElementById("inputName");
var inputLink = document.getElementById("inputLink");
var bttnSave = document.getElementById("saveBttn");
var listLinks = document.getElementById("")

bttnSave.addEventListener("click", saveTab)

async function saveTab() {
    let tabList = new Array();
    let type = "??????????"
    let tab = {
        name: inputName.value,
        url: inputLink.value
    }

    await chrome.storage.sync.get(["LINKEEP_STORAGE"]).then(listJSON => {
        listJSON.LINKEEP_STORAGE != undefined ? tabList = JSON.parse(listJSON.LINKEEP_STORAGE).slice(): console.log(undefined);
    }).catch(error => console.log(error))


    if (tabList.every((item, index, array) => item.url != tab.url)) {
        tabList.push(tab);
        type = "save"
    } else {
        tabList[tabList.findIndex((item, index, array) => item.url == tab.url)] = tab;
        type = "update"
    }

    chrome.storage.sync.set({ "LINKEEP_STORAGE": JSON.stringify(tabList) }, () => console.log(type + " successfully"));
}

async function deleteTab(tab){
    let tabList = new Array()
    
    await chrome.storage.sync.get("LINKEEP_STORAGE")
    .then(listJSON => tabList = JSON.parse(listJSON.LINKEEP_STORAGE).slice())
    .catch(error => console.log(error))

    let index  = tabList.findIndex((item, index, array) => item == tab)
    tabList.splice(index, 1)
    chrome.storage.sync.set({"LINKEEP_STORAGE": tabList}, () => console.log("delete successfully") );
}

window.onload = () => {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        inputName.value = tabs[0].title;
        inputLink.value = tabs[0].url;
    })
}