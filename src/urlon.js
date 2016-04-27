// this file is made to keep compatibility for possible users consumed lib directly from repo using <script> tag

(function () {
  var script = document.createElement('script')
  script.setAttribute('src', 'https://npmcdn.com/urlon@2.0.0/src/urlon.js') // never update version here
  document.head.appendChild(script)
  console.warn('Please consider use npm version of library or one served from npmcdn service. Follow https://github.com/vjeux/URLON to see details.')
})()
