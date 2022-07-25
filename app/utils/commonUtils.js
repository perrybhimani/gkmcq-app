import moment from "moment";

export const TIME_PERIODS = [
  { title: "Weekly", key: "week" },
  { title: "Monthly", key: "month" },
];

export const GRAPH_TIME_PERIODS = [
  { title: "Daily", key: "week" },
  { title: "Weekly", key: "month" },
  { title: "Monthly", key: "year" },
];

export const WEEK_DAYS_ARRAY = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const MONTH_ARRAY = [
  "jan",
  "feb",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "sept",
  "oct",
  "nov",
  "dec",
];

export const addWeekDaysIfNot = (cData, dataKey, dataType, isBarChart) => {
  const newData = [...cData];
  const monthData = newData.map((el) => {
    return {
      day: parseInt(moment(el.date).format("D")),
      [dataKey]: el[dataKey],
    };
  });
  if (isBarChart && dataType === "week") {
    const remainingDays = WEEK_DAYS_ARRAY.filter(
      (el) => !newData.map((e) => e.day).includes(el)
    );

    remainingDays.forEach((day) => {
      newData.push({
        day,
        [dataKey]: null,
      });
    });

    const sorter = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7
    };
    return newData.sort((a, b) => sorter[a.day] - sorter[b.day]);
  } else if (isBarChart && dataType === "month") {
    let monthDays = moment().daysInMonth();
    const DAYS_ARRAY = Array.from({ length: monthDays }, (_, i) => i + 1);
    const remainingMonths = DAYS_ARRAY.filter(
      (el) => !monthData.map((e) => e.day).includes(el)
    );

    remainingMonths.forEach((day) => {
      monthData.push({
        day,
        [dataKey]: null,
      });
    });
    monthData.sort((a, b) => a.day - b.day);
    return monthData;
  } else if (isBarChart && dataType === "year") {
    const remainingYears = MONTH_ARRAY.filter(
      (el) => !newData.map((e) => e.month).includes(el)
    );
    remainingYears.forEach((month) => {
      newData.push({
        month,
        [dataKey]: null,
      });
    });

    const sorter = {
      jan: 1,
      feb: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      sept: 9,
      oct: 10,
      nov: 11,
      dec: 12,
    };
    newData.sort((a, b) => sorter[a.month] - sorter[b.month]);
    const changedKey = newData.map(({ month: day, ...rest }) => ({
      day,
      ...rest,
    }));
    return changedKey;
  }
};