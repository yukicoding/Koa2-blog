/**
 * @description test demo
 */

function sum(a, b) {
  return a + b
}
test('10 add 30  equal 40', () => {
  let res = sum(10, 30)
  expect(res).toBe(40)
})
