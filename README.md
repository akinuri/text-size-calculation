# text-size-calculation

Sometimes I need to know the width of a single-line text or the height of a wrapped text in a fixed-width container. There does not seem to be a way to get these. Why?

So I thought if I knew the width of every character, I could calculate these. This repo is an attempt at doing that.

## Roadmap
- [x] Get the list of local fonts.
- [ ] Given a font, calculate every character's width and create a dictionary.
- [ ] Create a function to calculate text width or text block height using font dictionaries.

