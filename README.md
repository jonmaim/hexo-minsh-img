# hexo-minsh-img
This tag plugin will add a `max-width` style into the specified image. Look at the source if you want an example on how to access an asset path.

## Usage
```
{% minsh_img image.png alt text here, caption here, 100 %}
```
will result into 
```
<div class="minsh-img">
  <img src="/community-building/3-different-types-of-community-platforms/image.png" alt="alt text here" title="alt text here" style="max-width:630px; max-height: 330px">
  <figcaption>caption here</figcaption>
</div>
```
