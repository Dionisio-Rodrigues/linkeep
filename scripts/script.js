window.onload = () => {
    let tab = {
        title:"",
        url:"",
        icon:""
    }

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        tab.title = tabs[0].title;
        tab.url = tabs[0].url;
        tab.icon = tabs[0].favIconUrl;
    })
    
}