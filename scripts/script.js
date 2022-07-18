
var inputName = document.getElementById("inputName");
var inputLink = document.getElementById("inputLink");
var bttnSave = document.getElementById("saveBttn");

bttnSave.addEventListener("click", saveTab)

chrome.storage.sync.get(["LINKEEP_STORAGE"], (listJSON) => console.log(JSON.parse(listJSON.LINKEEP_STORAGE)));

function saveTab() {
    let tabList = new Array();
    let type = "??????????"

    let tab = {
        name: inputName.value,
        url: inputLink.value
    }

    chrome.storage.sync.get(["LINKEEP_STORAGE"]).then(listJSON => {
        tabList = JSON.parse(listJSON.LINKEEP_STORAGE).slice()

        if (tabList.every((item, index, array) => JSON.parse(item).url != tab.url)) {
            tabList.push(JSON.stringify(tab));
            type = "save"
        } else {
            tabList[tabList.findIndex((item, index, array) => JSON.parse(item).url == tab.url)] = JSON.stringify(tab);
            type = "update"
        }

        chrome.storage.sync.set({ "LINKEEP_STORAGE": JSON.stringify(tabList) }, () => console.log(type + " successfully"));

    }).catch(error => console.log(error))
}

window.onload = () => {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        inputName.value = tabs[0].title;
        inputLink.value = tabs[0].url;
    })
}