// this file is made to keep compatibility for possible users consumed lib directly from repo using <script> tag

;(function () {
  var script = document.createElement('script')
  script.setAttribute('src', 'https://unpkg.com/urlon@2.0.0/src/urlon.js') // never update version here
  document.head.appendChild(script)
  console.warn(
    'Please consider use npm version of library or one served from unpkg.com service. Follow https://github.com/cerebral/urlon to see details.'
  )
})()
