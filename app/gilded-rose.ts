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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name === "Sulfuras, Hand of Ragnaros") continue;
      item.sellIn -= 1;

      switch (item.name) {
        case "Aged Brie":
          if (item.sellIn >= 0) item.quality += 1;
          else item.quality += 2;
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.sellIn >= 10) item.quality += 1;
          else if (item.sellIn >= 5) item.quality += 2;
          else if (item.sellIn >= 0) item.quality += 3;
          else item.quality = 0;
          break;

        case "Conjured Mana Cake":
          if (item.sellIn >= 0) item.quality -=2;
          else item.quality -= 4;
          break;

        default:
          if (item.sellIn >= 0) item.quality -= 1;
          else item.quality -= 2;
          break;
      }
      if (item.quality < 0) item.quality = 0;
      if (item.quality > 50) item.quality = 50;
    }
    return this.items;
  }
}
