<template>
  <div>

    
    <div class="mde">
        <textarea id="my-text-area"></textarea>
        <span>david teste</span>
    </div>

  </div>
</template>

<style>
 @import "easymde/dist/easymde.min.css";

  .mde {
    width: 70vw;
    margin-left: 1em;
  }

</style>

<script>
import EasyMDE from 'easymde';

let editor = null;

export default {
  mounted() {

    let options = {
      element: document.getElementById('my-text-area'),
      spellChecker: false,
      nativeSpellcheck: false,
      showIcons : ['table', 'heading-smaller', 'heading-bigger', ],
      hideIcons : ['image']
    }

    const easyMDE = new EasyMDE(options);
    editor = easyMDE;
  }
}
</script>

