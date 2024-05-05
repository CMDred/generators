class LootTable {

  setters = []

  constructor(id) {
    this.prefix = `\
{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "${id}",
          "functions": [\n`;
    this.suffix = `\
          ]
        }
      ]
    }
  ]
}`;
  }

  add(str) {
    this.setters.push(str)
  }

  get get() {
    return this.prefix + this.setters.join(",") + this.suffix;
  }
}