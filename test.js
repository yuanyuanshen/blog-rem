function bub() {
  this.a = 3
}
var s = new bub()
// bub.prototype.b = 66
bub()
console.log(a)
console.log(s.b)
