class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  
  handleNormalItems(item) {
    let totalDecay = 1; 
    if (item.sellIn < 0) {
      totalDecay += 1;
  };
    if (item.quality - totalDecay < 0){
      item.quality = 0;
    } else {
        item.quality -= totalDecay;
    };
  };

  handleConjuredItems(item) {
    let totalDecay = 2; 
    if (item.sellIn < 0) {
      totalDecay += 2;
  };
    if (item.quality - totalDecay < 0){
      item.quality = 0;
    } else {
        item.quality -= totalDecay;
    };
  };
  
  handleAgedBrie(item){
    let totalGrowth = 1;
    if (item.sellIn < 0){
      totalGrowth += 1;
    };
    if (item.quality + totalGrowth > 50){
      item.quality = 50;
    } else {
      item.quality += totalGrowth;
    };
  };

  handleBackStagePass(item){
    let totalGrowth = 1;
    
    if (item.sellIn <= 10){
      totalGrowth += 1;
    };
    
    if (item.sellIn <= 5){
      totalGrowth += 1;
    };
    
    if (item.quality + totalGrowth > 50){
      item.quality = 50;
    } else {
      item.quality += totalGrowth;
    };
    
    if(item.sellIn < 0){
      item.quality = 0;
    };
  };

  updateQuality() {
    for (const item of this.items) {

      if (item.name ===  "Sulfuras, Hand of Ragnaros") {
        continue;
      };

      if (item.quality < 0){
        item.quality = 0;
      };

      item.sellIn = item.sellIn - 1;

      switch (true) {
        case item.name === 'Aged Brie':
          this.handleAgedBrie(item);
          break;
        case item.name.includes("Conjured"):
          this.handleConjuredItems(item);
          break;
        case item.name.includes("Backstage passes"):
          this.handleBackStagePass(item);
          break;
        default:
          this.handleNormalItems(item);
      };
    };
    return this.items;
  };
};

module.exports = {
  Item,
  Shop
};
