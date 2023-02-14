const {Shop, Item} = require("../src/gilded_rose");

describe("Normal Items", function(){
  it("quality degrades by 1 every day", function(){
    const testShop = new Shop([new Item("+5 Dexterity Vest", 4, 7)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(6);
  });
  it("after sell date, quality degrades twice as fast", function(){
    const testShop = new Shop([new Item("+5 Dexterity Vest", 0, 7)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(5);
  });
  it("quality is never below 0", function(){
    const testShop = new Shop([new Item("+5 Dexterity Vest", 4, 0), new Item("Elixir of the Mongoose", -1, 1), new Item("+5 Dexterity Vest", 4, -12)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(0);
    expect(testItems[1].quality).toBe(0);
    expect(testItems[2].quality).toBe(0);
  });
});

describe("Conjured Items", function(){
  it("quality degrades by 2 every day", function(){
    const testShop = new Shop([new Item("Conjured Mana Cake", 4, 7)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(5);
  });
  it("after sell date, quality degrades twice as fast", function(){
    const testShop = new Shop([new Item("Conjured Mana Cake", 0, 7)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(3);
  });
  it("quality is never below 0", function(){
    const testShop = new Shop([new Item("Conjured Mana Cake", 4, 0), new Item("Elixir of the Mongoose", -1, 1), new Item("Conjured Mana Cake", 4, -12)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(0);
    expect(testItems[1].quality).toBe(0);
    expect(testItems[2].quality).toBe(0);
  });
});

describe("Aged Brie", function() {
  it("quality should increase by 1 every day", function() {
    const testShop = new Shop([new Item("Aged Brie", 1, 0)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(1);
  });
  it("after sell date, quality increases twice as fast", function() {
    const testShop = new Shop([new Item("Aged Brie", 0, 2)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(4);
  });
  it("quality is never below 0", function(){
    const testShop = new Shop([new Item("Aged Brie", 4, -12)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(0);
  });
  it("quality cannot increase above 50", function() {
    const testShop = new Shop([new Item("Aged Brie", 3, 50), new Item("Aged Brie", -3, 49)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(50);
    expect(testItems[1].quality).toBe(50);
  });
});

describe("Backstage passes", function(){
  it("quality should increase by 1 every day", function() {
    const testShop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(21);
  });
  it("when sell date is 10 or less, quality should increase by 2 every day", function() {
    const testShop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(22);
  });
  it("when sell date is 5 or less, quality should increase by 3 every day", function() {
    const testShop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(23);
  });
  it("when sell date is less than 0, quality should be 0", function() {
    const testShop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -2, 20)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(0);
  });
  it("quality is never below 0", function() {
    const testShop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, -20)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(0);
  });
  it("quality cannot increase above 50", function() {
    const testShop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 9, 49), new Item("Backstage passes to a TAFKAL80ETC concert", 4, 48)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(50);
    expect(testItems[0].quality).toBe(50);
    expect(testItems[0].quality).toBe(50);
  });
});

describe("Sulfuras, Hand of Ragnaros", function(){
  it("quality never decreases", function(){
    const testShop = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].quality).toBe(80);
  });
  it("sellIn never decreases", function(){
    const testShop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 7, 80)]);
    const testItems = testShop.updateQuality();
    expect(testItems[0].sellIn).toBe(7);
  });
});

