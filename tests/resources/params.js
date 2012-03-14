var params = [
  '/?foo',
  '/?foo=bar',
  '/path/to/file/',
  '/path/to/file/?query',
  '/path/to/file/?foo1=bar1&foo2=bar2',
  '/index.html',
  '/myPage.html',
  '/my-Page.html',
  '/my_Page_hello.htm'
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = params;
}