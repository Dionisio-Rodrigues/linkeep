
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