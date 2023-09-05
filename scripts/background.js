chrome.runtime.onMessage.addListener(async (data) => {

    console.log(`received ${data}`);
    
    if (data.type === 'notification') {

        chrome.notifications.create('', data.options)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    }
  });

