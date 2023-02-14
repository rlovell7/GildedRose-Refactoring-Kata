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
    }
    if (item.quality + totalGrowth > 50){
      item.quality = 50;
    } else {
      item.quality += totalGrowth;
    }
  }

  handleBackStagePass(item){
    let totalGrowth = 1;
    
    if (item.sellIn <= 10){
      totalGrowth += 1;
    }
    
    if (item.sellIn <= 5){
      totalGrowth += 1;
    };
    
    if (item.quality + totalGrowth > 50){
      item.quality = 50;
    } else {
      item.quality += totalGrowth;
    }
    
    if(item.sellIn < 0){
      item.quality = 0;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
        continue;
      }

      if (this.items[i].quality < 0){
        this.items[i].quality = 0;
      };

      this.items[i].sellIn = this.items[i].sellIn - 1;

      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].name.includes('Conjured')){
            this.handleConjuredItems(this.items[i]);
          } else {
              this.handleNormalItems(this.items[i]);
            }
      } else {
          if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
            this.handleBackStagePass(this.items[i]);
          } else {
            this.handleAgedBrie(this.items[i])
          }
      };
  };
    return this.items;
  }
};

module.exports = {
  Item,
  Shop
}
