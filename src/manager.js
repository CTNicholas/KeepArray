
class KeepArrayManager {
  static add (table) {
    this.tables[table.name] = table
  }

  static change (arr = { KeepArray: {} }) {
    const table = this.tables[arr.KeepArray.name] || null
    if (!table) {
      console.error('[KeepArray] table not added')
    }

    table.array = arr
    table.write()
  }
}

KeepArrayManager.tables = {}

module.exports = KeepArrayManager
