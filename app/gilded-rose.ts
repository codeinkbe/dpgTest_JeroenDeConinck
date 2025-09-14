export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

interface ItemConfig {
  updateSellIn: boolean;
  updateFunction: (item: Item) => void;
  minQuality: number;
  maxQuality: number;
}

interface SpecialItemConfig extends ItemConfig {
  name: string;
}

const defaultItemConfig: ItemConfig = {
  updateSellIn: true,
  updateFunction: (item: Item) => updateItem(item, "subtract", 1),
  minQuality: 0,
  maxQuality: 50,
};

const specialItemConfigList: SpecialItemConfig[] = [
  {
    name: "Aged Brie",
    updateSellIn: true,
    updateFunction: (item: Item) => updateItem(item, "add", 1),
    minQuality: 0,
    maxQuality: 50,
  },
  {
    name: "Backstage passes to a TAFKAL80ETC concert",
    updateSellIn: true,
    updateFunction: (item: Item) => updateConcertItem(item),
    minQuality: 0,
    maxQuality: 50,
  },
  {
    name: "Conjured Mana Cake",
    updateSellIn: true,
    updateFunction: (item: Item) => updateItem(item, "subtract", 2),
    minQuality: 0,
    maxQuality: 50,
  },
  {
    name: "Sulfuras, Hand of Ragnaros",
    updateSellIn: false,
    updateFunction: (item: Item) => {},
    minQuality: 80,
    maxQuality: 80,
  },
];

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      updateQualitySteps(item);
    }
    return this.items;
  }
}

function updateQualitySteps(item: Item) {
  const itemConfig = specialItemConfigList.find(config => config.name === item.name) || defaultItemConfig;
  
  // Update sellIn
  updateSellIn(item, itemConfig.updateSellIn);
  
  // Update quality
  itemConfig.updateFunction(item);
  
  // Apply quality bounds
  applyQualityBounds(item, itemConfig.minQuality, itemConfig.maxQuality);
}

function updateSellIn(item: Item, shouldUpdate: boolean) {
  if (shouldUpdate) {
    item.sellIn -= 1;
  }
}

function applyQualityBounds(item: Item, minQuality: number, maxQuality: number) {
  if (item.quality < minQuality) item.quality = minQuality;
  if (item.quality > maxQuality) item.quality = maxQuality;
}

function updateItem(
  item: Item,
  addSubtract: "add" | "subtract",
  value: number
) {
  if (addSubtract === "add") {
    if (item.sellIn >= 0) item.quality += value;
    else item.quality += value * 2;
  } else {
    if (item.sellIn >= 0) item.quality -= value;
    else item.quality -= value * 2;
  }
}

function updateConcertItem(item: Item) {
  if (item.sellIn >= 10) item.quality += 1;
  else if (item.sellIn >= 5) item.quality += 2;
  else if (item.sellIn >= 0) item.quality += 3;
  else item.quality = 0;
}