# {{ title }}

{% for comic in comics %}
* {{ comic.title }} [ {{ comic.links }} ] - {{ comic.genres | join(", ")}}
{%- endfor %}
