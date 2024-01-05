const moment = require("moment-timezone");

const getLocalDate = () => {
  return new Date().toLocaleDateString("sv");
};

const convertTimeToUnix = (timeString) => {
  const hh = parseInt(timeString.substring(0, 2), 10);
  const mm = parseInt(timeString.substring(2, 4), 10);
  const ss = parseInt(timeString.substring(4, 6), 10);

  // Sử dụng template string để định dạng lại thời gian
  const formattedTime = `${hh.toString().padStart(2, "0")}:${mm
    .toString()
    .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;

  return formattedTime;
};

function convertLastTradingDate(timestring) {
  const year = parseInt(timestring.slice(0, 4), 10);
  const month = parseInt(timestring.slice(4, 6), 10) - 1; // Tháng trong JavaScript bắt đầu từ 0
  const day = parseInt(timestring.slice(6, 8), 10);

  const unixTimestamp = new Date(year, month, day).getTime();

  return unixTimestamp;
}

function getSecondNumFromNowUntilEod() {
  return Math.floor(
    (moment().endOf("day").valueOf() - moment().valueOf()) / 1000
  );
}

const convertTimeStringToUnix = (timeString) => {
  const hh = parseInt(timeString.substring(0, 2), 10);
  const mm = parseInt(timeString.substring(2, 4), 10);
  const ss = parseInt(timeString.substring(4, 6), 10);
  const mss = parseInt(timeString.substring(7), 10);

  const year = moment().toObject().years;
  const month = moment().toObject().months;
  const day = moment().toObject().date;

  const unixTime = new Date(year, month, day, hh, mm, ss, mss);
  return unixTime.getTime();
};

function getLatestItemEachMinute(data) {
  const minuteMap = new Map();

  // Iterate through each item in the array
  data.forEach((item) => {
    const minuteKey = moment(item.time).toISOString().slice(0, 16); // Extracts YYYY-MM-DDTHH:mm

    // Check if the current item is later than the one stored for the minute
    if (!minuteMap.has(minuteKey) || item.time > minuteMap.get(minuteKey).time) {
      minuteMap.set(minuteKey, item);
    }
  });

  // Convert the map values back to an array
  const result = Array.from(minuteMap.values());
  return result;
}

module.exports = {
  getLocalDate,
  convertTimeToUnix,
  getSecondNumFromNowUntilEod,
  convertTimeStringToUnix,
  convertLastTradingDate,
  getLatestItemEachMinute,
};
