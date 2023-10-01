
const createAlarm = async (name, periodInMinutes) => {

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

            console.log(`alarm ${alarm} fired`)

            await handleAlarm(alarm.name)
        });
}

