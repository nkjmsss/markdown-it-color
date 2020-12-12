# markdown-it-color

## install

```shell
npm install markdown-it-color --save
```

## use

```javascript
var md = require('markdown-it')()
            .use(require('markdown-it-color'))
```

## API

You can add options. Default option is below.

```javascript
var md = require('markdown-it')()
            .use(require('markdown-it-color'), {
              defaultClassName: 'md-colorify', // default
              inline: false, // default
            })

md.render('{primary}(sample)') // => '<span class="md-colorify md-colorify--primary">sample</span>'
```

If you want to use inline style, use like below.

```javascript
var md = require('markdown-it')()
            .use(require('markdown-it-color'), {
              inline: true,
            })

md.render('{red}(sample)') // => '<span class="md-colorify md-colorify--red" style="color: red;">sample</span>'
```
