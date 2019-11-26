module.exports = {
  'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  'NETLIFY': process.env.NETLIFY  || false
}