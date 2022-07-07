import capitalize from 'capitalize-pt-br';

export function capitalizeString(string: string) {
  if (!string) {
    return 'Indisponível';
  }
  let word = string.toLowerCase();
  word = capitalize(word);
  return word;
}
