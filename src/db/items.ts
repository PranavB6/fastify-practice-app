const items = [
  {
    id: 1,
    name: 'Sword of Destiny',
    type: 'weapon',
    description: 'A legendary sword that grants its wielder immense power.',
    rarity: 'legendary',
    stats: {
      attack: 50,
      defense: 10,
      speed: 5,
    },
  },
  {
    id: 2,
    name: 'Shield of Valor',
    type: 'armor',
    description: 'A sturdy shield that can withstand any attack.',
    rarity: 'rare',
    stats: {
      attack: 10,
      defense: 50,
      speed: -5,
    },
  },
  {
    id: 3,
    name: 'Potion of Healing',
    type: 'consumable',
    description: 'Restores a small amount of health when consumed.',
    rarity: 'common',
    stats: {
      healthRestore: 20,
    },
  },
];

export default items;
