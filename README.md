# hexo-minsh-img
This tag plugin will add a `max-width` style into the specified image. Look at the source if you want an example on how to access an asset path.

## Usage
```
{% minsh_img trivago.jpg 'A post on the Trivago Facebook page' %}
```
will result into 
```
<p class="minsh-img"><img src="/community-building/3-steps-to-create-your-community-management-strategy-2-3/trivago.png" style="max-width:494px" alt="A post on the Trivago Facebook page" title="A post on the Trivago Facebook page"></p>
```
