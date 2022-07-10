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

    chrome.storage.sync.set({"LINKEEP_STORAGE": tabList}, ()=>{
        console.log(type+" successfully");
    });
}

function deleteTab(){

}

function readTab(){

}

function update(){
    
}