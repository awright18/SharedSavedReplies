const dateToTicks = (date) => {
    const epochOffset = 621355968000000000;
    const ticksPerMillisecond = 10000;
  
    const ticks =
      date.getTime() * ticksPerMillisecond + epochOffset;
  
    return ticks;
}

const toUTCDate = (date) => {

    if(!date){
        throw new Error("toUTCDate requires a date.");
    }

    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDay(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()));

}

const utcStartTicks = () => dateToTicks(toUTCDate(new Date(0,0,0,0,0,0,0)));

const utcNowTicks = () => dateToTicks(toUTCDate(new Date()));

const dateIsInThePast = (date) => nowTicks > dateToTicks(date);

const dateIsBefore = (fisrtDate,secondDate) => fisrtDate < secondDate;