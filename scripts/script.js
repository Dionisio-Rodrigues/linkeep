var tabList = new Array();
var inputName = document.getElementById("input-name");
var bttnSave = document.getElementById("bttn-save");
var urlTab = "";
var urlICon = "";

var myTabList = document.getElementById("my-tab-list");
var myTabs = document.getElementsByClassName("my-tab");

// var bttnDeleteLink; 

// window.addEventListener('DOMContentLoaded', ()=>{
//     console.log(bttnDeleteLink)
//     bttnDeleteLink.forEach((bttn)=>{
//         bttn.addEventListener('click', deleteTab)
//     })
// });

bttnSave.addEventListener("click", saveTab);



window.onload = () => {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        inputName.value = tabs[0].title;
        urlTab = tabs[0].url;
        tabs[0].favIconUrl == "" ? urlICon = "../assets/link_white_blue.png" : urlICon = tabs[0].favIconUrl;
    })

    updateTabList();
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
        myTabList.insertBefore(createHtmlTab(tab), myTabList.firstChild)
    } else {
        tabList[tabList.findIndex((item, index, array) => item.url == tab.url)] = tab;
        type = "update";
        updateTabList();
    }

    chrome.storage.sync.set({ "LINKEEP_STORAGE": JSON.stringify(tabList) }, () => alert(type + " successfully"));

}

function deleteTab(){    
    let tab = this.parentNode.getAttribute("tab")
    tab = JSON.parse(tab)

    if(confirm(`O SEGUINTE LINK SERÁ DELETADO: \n
                    Nome: ${tab.name} \n
                    Link: ${tab.url}\n`)
                    ){
                        let index  = tabList.findIndex((item, index, array) => item.url == tab.url);
                        tabList.splice(index, 1);
                        chrome.storage.sync.set({"LINKEEP_STORAGE": JSON.stringify(tabList)}, () => console.log("delete successfully") );
                        updateTabList();
                    }
    else{
        console.log("cancel")
    }

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

//     let html = `<ul id="my-tab-list">
//     `
//     html += `<li class="my-tab" selected="false" >
//     <div class="tab-link-content">
//         <a href="${tab.url}">
//             <img src="${tab.icon}">
//             <div>
//                 <h2>${tab.name}</h2>
//             </div>
//         </a>
//     </div>
//     <div class="tab-option-content" url-tab="${tab.url}">
//         <div class="option copy-tab">
//             <img src="./assets/archives.png">
//         </div>
//         <div class="option edit-tab">
//             <img src="./assets/pen.png">
//         </div>
//         <div class="option delete-tab">
//             <img src="./assets/delete.png">
//         </div>
//     </div>
// </li>
// `
//     html += `</ul>`
//     myTabList.innerHTML = html;

