---
permalink: /news
layout: base
---

# News
---

{% for news in site.data.news %}
### {{news.title}}

{{news.markdownContent}}
<br><br>
{% endfor %}


<style>
    .hashLink{scroll-margin-top: 5rem;}
</style>
<script>
    var titles = document.getElementsByTagName('h3')
    for(var i = 0; i < titles.length; i++){
        titles[i].classList.add('hashLink')
    }
</script>