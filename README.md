# Just a Few Icons

SVG icons with some style.

This repository is a zero-build static GitHub Pages site. The SVG files live in `icons/`, and the gallery is plain HTML, CSS, and JavaScript.

## Usage

Use the SVG files directly:

```html
<img src="icons/jf--icon_podcast.svg" alt="">
```

Or use the web component from the gallery page:

```html
<jafi-icon name="podcast"></jafi-icon>
```

## Development

There is no build step. Edit the files directly and preview with:

```sh
npx serve .
```

Or, after installing dependencies:

```sh
npm run serve
```

When adding or removing icons, update the icon list in `icons.js`.

## License

MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
