chrome.identity.getProfileUserInfo({'accountStatus': 'SYNC'}, function(info){
    console.log( info.id)
})