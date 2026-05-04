const aliases = {
  cellphone: 'phone',
  'cell phone': 'phone',
  'mobile phone': 'phone',
  smartphone: 'phone',
  'smart phone': 'phone',

  mug: 'cup',
  'coffee mug': 'cup',
  glass: 'cup',

  desk: 'table',
  notebook: 'book',

  computer: 'laptop',
  pc: 'laptop',

  automobile: 'car',

  kitty: 'cat',
  puppy: 'dog',
};

// IMPORTANT: better cleaning
const normalizeLabel = label => {
  if (!label) return '';

  const cleaned = label
    .toLowerCase()
    .trim()
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return aliases[cleaned] || cleaned.replace(/\s/g, '');
};

export default normalizeLabel;
