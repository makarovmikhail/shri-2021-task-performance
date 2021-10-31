function quantile(arr, q) {
  const sorted = arr.sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
  } else {
    return Math.floor(sorted[base]);
  }
}

function prepareData(result) {
  return result.data.map((item) => {
    item.date = item.timestamp.split("T")[0];

    return item;
  });
}

// TODO: реализовать

function getDate(date) {
  return `${date.getFullYear()}-${Number(date.getMonth()) + 1}-${
    String(date.getDate()).length === 1 ? "0" + date.getDate() : date.getDate()
  }`;
}

// показать значение метрики за несколько дней
function showMetricByPeriod(data, page, startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  console.log(`All metrics from ${startDate} to ${endDate}:`);

  while (getDate(start) <= getDate(end)) {
    calcMetricsByDate(data, page, getDate(start));
    start.setDate(start.getDate() + 1);
  }
}

// показать по размеру body (фактического размера окна)
function showBodyScreen(data) {
  let table = {};
  data
    .map((item) => item.additional.body)
    .forEach((item) => {
      const key = `${item.width}x${item.height}`;
      if (table[key]) {
        table[key].hits += 1;
      } else {
        table[key] = {hits: 1, width: item.width, height: item.height};
      }
    });

  console.table(table);
}

// срез по платформам
function showUserAgents(data) {
  let table = {};
  data
    .map((item) => item.additional.userAgent)
    .forEach((item) => {
      const key = getBrowser(item);
      if (table[key]) {
        table[key].hits += 1;
      } else {
        table[key] = {hits: 1, userAgent: key};
      }
    });

  console.table(table);
}

// Пример
// добавить метрику за выбранный день
function addMetricByDate(data, page, name, date) {
  let sampleData = data
    .filter(
      (item) => item.page == page && item.name == name && item.date == date
    )
    .map((item) => item.value);

  let result = {};

  result.hits = sampleData.length;
  result.p25 = quantile(sampleData, 0.25);
  result.p50 = quantile(sampleData, 0.5);
  result.p75 = quantile(sampleData, 0.75);
  result.p95 = quantile(sampleData, 0.95);

  return result;
}
// рассчитывает все метрики за день
function calcMetricsByDate(data, page, date) {
  console.log(`All metrics for ${date}:`);

  let table = {};
  table.connect = addMetricByDate(data, page, "connect", date);
  table.ttfb = addMetricByDate(data, page, "ttfb", date);
  table.load = addMetricByDate(data, page, "load", date);
  table.focus = addMetricByDate(data, page, "focus", date);
  table.click = addMetricByDate(data, page, "click", date);
  table.load = addMetricByDate(data, page, "load", date);
  table.generate = addMetricByDate(data, page, "generate", date);
  table.draw = addMetricByDate(data, page, "draw", date);

  console.table(table);
}

fetch(
  "https://shri.yandex/hw/stat/data?counterId=A0B0C6F9-EC49-40E7-BA38-BB947975A436"
)
  .then((res) => res.json())
  .then((result) => {
    let data = prepareData(result);

    // добавить свои сценарии, реализовать функции выше

    showMetricByPeriod(data, "main", "2021-10-31", "2021-11-01");
    showBodyScreen(data);
    showUserAgents(data);
  });
