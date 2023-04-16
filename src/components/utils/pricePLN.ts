const jednosci = [
  "",
  " jeden",
  " dwa",
  " trzy",
  " cztery",
  " pięć",
  " sześć",
  " siedem",
  " osiem",
  " dziewięć",
];
const nascie = [
  "",
  " jedenaście",
  " dwanaście",
  " trzynaście",
  " czternaście",
  " piętnaście",
  " szesnaście",
  " siedemnaście",
  " osiemnaście",
  " dziewietnaście",
];
const dziesiatki = [
  "",
  " dziesięć",
  " dwadzieścia",
  " trzydzieści",
  " czterdzieści",
  " pięćdziesiąt",
  " sześćdziesiąt",
  " siedemdziesiąt",
  " osiemdziesiąt",
  " dziewięćdziesiąt",
];
const setki = [
  "",
  " sto",
  " dwieście",
  " trzysta",
  " czterysta",
  " pięćset",
  " sześćset",
  " siedemset",
  " osiemset",
  " dziewięćset",
];
const grupy = [
  ["", "", ""],
  [" tysiąc", " tysiące", " tysięcy"],
  [" milion", " miliony", " milionów"],
  [" miliard", " miliardy", " miliardów"],
  [" bilion", " biliony", " bilionów"],
  [" biliard", " biliardy", " biliardów"],
  [" trylion", " tryliony", " trylionów"],
];

export const priceRec = (price: number, group: number): string => {
  const s = Math.floor((price % 1000) / 100);
  let n = 0;
  let d = Math.floor((price % 100) / 10);
  let j = Math.floor(price % 10);

  if (d === 1 && j > 0) {
    n = j;
    d = 0;
    j = 0;
  }

  let k = 2;
  if (j === 1 && s + d + n === 0) {
    k = 0;
  }
  if (j === 2 || j === 3 || j === 4) {
    k = 1;
  }

  const result =
    s + d + n + j > 0
      ? setki[s] + dziesiatki[d] + nascie[n] + jednosci[j] + grupy[group][k]
      : "";

  const liczba = Math.floor(price / 1000);
  if (liczba > 0) {
    return `${priceRec(liczba, group + 1)} ${result}`;
  }

  return result;
};

export const pricePLN = (price: number): string => {
  let liczba = price;

  if (liczba < 0) {
    liczba = -liczba;
  }
  return priceRec(liczba, 0);
};
