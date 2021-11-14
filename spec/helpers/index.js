const {JSDOM} = require('jsdom')

const doc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Test Regionist</title>
</head>
<body>
  <p>Test page.</p>
</body>
</html>
`
global.window = new JSDOM(doc, {url: 'https://github.com'}).window
global.document = global.window.document
global.navigator = global.window.navigator
global.navigator.languages = ['en-US', 'tr-TR']
global.window.Intl = {
  DateTimeFormat: function() {
    return {
      resolvedOptions: function() {
        return {
          timeZone: 'Europe/Istanbul'
        }
      }
    }
  }
}