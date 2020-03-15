import parser from "./parser";

const url = `https://en.wikipedia.org/w/api.php?action=parse&page=2020_coronavirus_pandemic_in_Switzerland&prop=text&section=3&format=json&origin=*`;

export async function fetchData() {
  const {
    parse: {
      text: { "*": html }
    }
  } = await fetch(url).then(d => d.json());
  const array = parseTable(html);
  return cleanObject(toObject(cleanArray(array)));
}

function parseTable(html) {
  const elem = document.createElement("div");
  elem.innerHTML = html;
  return parser.parseTable(elem);
}

function toObject(array) {
  const header1 = array.shift().map(h => slugify(h));
  const header2 = array.shift().map(h => slugify(h));
  return array
    .map(row => {
      return row.reduce(
        (prev, curr, i) => ({ ...prev, [`${header1[i]}_${header2[i]}`]: curr }),
        {}
      );
    })
    .map(s => ({ ...s, date: s.date_date }));
}

function slugify(str) {
  return str
    .toLowerCase()
    .split("")
    .filter(c => "abcdefghijklmnopqrstuvwxyz".includes(c))
    .join("");
}

function cleanArray(array) {
  const topHead = array.shift();
  array = array.map(row => row.map(cleanValue));
  return [topHead, ...array];
}

function cleanValue(val) {
  val = val.replace(/[[(]\d+[\])]/g, "");

  if (!val.length) {
    return 0;
  } else if (!isNaN(parseInt(val)) && !val.includes("-")) {
    return parseInt(val);
  }
  return val;
}

function cleanObject(array) {
  const confimed = array.find(a => a?.date?.includes?.("Confirmed"));
  const recovered = array.find(a => a?.date?.includes?.("Recovered"));
  const death = array.find(a => a?.date?.includes?.("Death"));

  return {
    array: array.filter(
      row => !isNaN(new Date(row.date).getTime()) && row.date
    ),
    confimed,
    recovered,
    death
  };
}
