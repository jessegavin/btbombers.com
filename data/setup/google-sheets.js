module.exports = {
  url: gid => {
    return `https://docs.google.com/spreadsheets/d/1kAeMDeEoWltbtR8KkQuOLFma00LwPBVwJYyy8-Pm0bs/pub?gid=${gid}&single=true&output=csv`;
  },
  sheets: [
    { gid: '0', table: 'PlayerStats' },
    { gid: '210846253', table: 'Games' },
    { gid: '1819147416', table: 'Seasons' },
    { gid: '1737780422', table: 'Players' }
  ]
};