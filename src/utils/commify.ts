export function commify(value: number) {
  let numberString: string | string[] = String(value);

  numberString = numberString.split("").reverse();

  numberString = numberString.reduce((prev, next, index) => {
    let shouldComma = (index + 1) % 3 === 0 && index + 1 < numberString.length;

    let updatedValue = `${prev}${next}`;

    if (shouldComma) {
      updatedValue = `${updatedValue},`;
    }

    return updatedValue;
  }, "");

  numberString = numberString.split("").reverse().join("");

  return numberString;
}
