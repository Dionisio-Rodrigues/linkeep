var tabList = new Array();
var inputName = document.getElementById("input-name");
var bttnSave = document.getElementById("bttn-save");
var urlTab = "";
var urlICon = "";

var myTabList = document.getElementById("my-tab-list");
var myTabs = document.getElementsByClassName("my-tab");

bttnSave.addEventListener("click", saveTab)

window.onload = () => {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        inputName.value = tabs[0].title;
        urlTab = tabs[0].url;
        urlICon = tabs[0].favIconUrl;
    })

    updateTabList()
}

function saveTab() {
    let type = ""

    let tab ={
        name: inputName.value,
        url: urlTab,
        icon: urlICon
    }

    if (tabList.every((item, index, array) => item.url != tab.url)) {
        tabList.unshift(tab);
        type = "save";
    } else {
        tabList[tabList.findIndex((item, index, array) => item.url == tab.url)] = tab;
        type = "update";
    }

    chrome.storage.sync.set({ "LINKEEP_STORAGE": JSON.stringify(tabList) }, () => console.log(type + " successfully"));

    updateTabList();
}

function deleteTab(tab){    

    let index  = tabList.findIndex((item, index, array) => item == tab);
    tabList.splice(index, 1);
    chrome.storage.sync.set({"LINKEEP_STORAGE": tabList}, () => console.log("delete successfully") );

    updateTabList();
}

async function updateTabList(){

    let copyTabList = tabList.slice()

    await chrome.storage.sync.get(["LINKEEP_STORAGE"]).then(listJSON => {
        listJSON.LINKEEP_STORAGE != undefined ? tabList = JSON.parse(listJSON.LINKEEP_STORAGE).slice(): console.log(undefined);
    }).catch(error => console.log(error));

    loadMyTabs();
    console.log(tabList);
}

function loadMyTabs(){
    let html = `<ul id="my-tab-list">
    `

    tabList.forEach(tab => {
        if(tab.icon == ""){
            tab.icon = "../assets/link_white_blue.png"
        }

        html += `<li class="my-tab" selected="false" url-tab="${tab.url}">
                    <div class="tab-link-content">
                        <a href="${tab.url}">
                            <img src="${tab.icon}">
                            <div>
                                <h2>${tab.name}</h2>
                            </div>
                        </a>
                    </div>
                    <div class="tab-option-content">
                        <div class="option copy-tab">
                            <img src="./assets/archives.png">
                        </div>
                        <div class="option edit-tab">
                            <img src="./assets/pen.png">
                        </div>
                        <div class="option delete-tab">
                            <img src="./assets/delete.png">
                        </div>
                    </div>
                </li>
                `
    })

    html += `</ul>`

    myTabList.innerHTML = html;
}