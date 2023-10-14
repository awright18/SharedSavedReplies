
const createAlarm = async (name, periodInMinutes) => {

    const existingAlarm = await chrome.alarms.get(name);

    if(existingAlarm?.periodInMinutes == Number(periodInMinutes)){
        
        console.log(`alarm for ${name} for ${periodInMinutes} minutes already exists`);

        return; 
    }

    await chrome.alarms.create(
        name,
        { periodInMinutes: Number(periodInMinutes) }
    )

    console.log(`alarm for ${name} created for every ${periodInMinutes} minutes.`);
}

const clearAlarm = async (name) => {

    await chrome.alarms.clear(name);

    console.log(`alarm ${name} cleared.`);
}

const onAlarm = async (handleAlarm) => {

    await chrome.alarms.onAlarm.addListener(
        async (alarm) => {

            console.log(`alarm ${alarm.name} fired`)

            await handleAlarm(alarm.name)
        });
}

export { onAlarm, clearAlarm, createAlarm }