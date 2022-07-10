export function saveTab(tab){
    let type = "save"
    let tabList = []

    chrome.storage.sync.get("LINKEEP_STORAGE", (list)=> tabList = list.slice());

    if(tabList.every((item, index, array) => JSON.parse(item).url != tab.url)){
        tabList.push(JSON.stringify(tab));
        type = "save"
    }else{
        tabList[tabList.findIndex((item, index, array) => JSON.parse(item).url == tab.url)] = JSON.stringify(tab);
        type = "update"
    }

    chrome.storage.sync.set({"LINKEEP_STORAGE": tabList}, ()=> console.log(type+" successfully") );
}

export function deleteTab(tab){
    let tabList = []

    tab = JSON.stringify(tab);
    
    chrome.storage.sync.get("LINKEEP_STORAGE", (list) => tabList = list.slice)

    let index  = tabList.findIndex((item, index, array) => item == tab)

    tabList.splice(index, 1)

    chrome.storage.sync.set({"LINKEEP_STORAGE": tabList}, () => console.log("delete successfully") );
}

// function readTab(){

// }

// function updateTab(){
    
// }