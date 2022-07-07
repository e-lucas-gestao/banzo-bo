export function dateToString(date: any) {
  // const date = new Date(2021, 11, 11);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return (`${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`);
}

export function dateToStringFormatted(date: any) {
  // const date = new Date(2021, 11, 11);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return (`${day < 10 ? 0 : ''}${day}/${month < 10 ? 0 : ''}${month}/${year}`);
}

export function dateHourToStringFormatted(date: string) {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  return `${day}/${month}/${year}`;
}

export function dateHourToString(date: string) {
  if (!date) return '0000-00-00';

  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  return `${year}-${month}-${day}`;
}

export function timeToString(date : string) {
  const dateConverted = new Date(date);

  return `${dateConverted.getHours() <= 9 ? '0' : ''}${dateConverted.getHours()}:${dateConverted.getMinutes() <= 9 ? '0' : ''}${dateConverted.getMinutes()}`;
}

export function dateTimetoString(date: string) {
  const dateConverted = new Date(date);

  return `${dateConverted.getDate() <= 9 ? '0' : ''}${dateConverted.getDate()}/${dateConverted.getMonth() + 1 <= 9 ? '0' : ''}${dateConverted.getMonth() + 1}/${dateConverted.getFullYear()} ${timeToString(date)}`;
}

export function dateFullToString(date: any) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const dateConverted = new Date(date);

  return `${day < 10 ? 0 : ''}${day}/${month < 10 ? 0 : ''}${month}/${year} ${dateConverted.getHours() <= 9 ? '0' : ''}${dateConverted.getHours()}:${dateConverted.getMinutes() <= 9 ? '0' : ''}${dateConverted.getMinutes()}:${dateConverted.getSeconds() <= 9 ? '0' : ''}${dateConverted.getSeconds()}`;
}
