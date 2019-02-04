# Awesome Chinese Webcomics

This is a curated list of Chinese webcomics for language learners.

## List

{% for comic in comics %}
  {{- comic.title }} [ {{ comic.links }} ] - {{ comic.genres | join(", ")}} ({{ comic.difficulty }})
{% endfor %}

## Criteria for consideration

Comics on this list should have all of these qualities:

- Speech bubbles contain big, easily decipherable text
- A good number of chapters can be viewed for free
- Available from an official source and are thus not susceptible to copyright takedown notice
- Easy and convenient to read on a smartphone

A small number of comics that don't meet some of the above criteria are nevertheless added because they are available in both Chinese and English.

Some things will disqualify a comic from being considered for this list:

- Poor image quality
- Speech bubbles are consistently illegible, e.g. text is very small or font is highly stylized
- Most chapters are behind a paywall. If it’s possible to read chapters at a slower pace for free, that’s acceptable (e.g. reading tokens that replenish after 24 hours).

## Difficulty assessment

We assign a difficulty of beginner, intermediate, advanced, and expert to each comic on the list. Here is how we define these ratings:

Beginner - Almost no text except in the chapter title

Intermediate - Fairly short chapters, minimal text. Some comics that would otherwise be advanced are downgraded to intermediate because an official English translation exists.

Advanced - The standard difficulty rating

Expert - Text contains a lot of technical jargon or classical Chinese

## Spreadsheet

This page is generated from a [public spreadsheet].(https://docs.google.com/spreadsheets/d/1VFy6jdPbRjZiQJ2a0fn9eFnAcrQh5ebSh21tTihKeKA/)
