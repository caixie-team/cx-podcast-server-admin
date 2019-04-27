<template>
    <div class="c-hero">
        <div class="c-hero__img">
            <slot />

            <span class="c-hero__circle1"></span>
            <span class="c-hero__circle2"></span>
            <span class="c-hero__circle3"></span>
            <span class="c-hero__circle4"></span>

            <span class="c-hero__circle5 c-hero__circle--small"></span>
            <span class="c-hero__circle6 c-hero__circle--small"></span>
            <span class="c-hero__circle7 c-hero__circle--small"></span>
            <span class="c-hero__circle8 c-hero__circle--small"></span>
        </div>

    </div>

</template>
<script>
  export default {
    name: 'Hero'
  }
</script>
