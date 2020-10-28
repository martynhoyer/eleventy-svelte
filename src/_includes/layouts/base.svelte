<script context="module">
  export const data = {
    layout: "layouts/base.11ty.js",
  };
</script>

<script>
  export let data;
  const { content } = data;
</script>

<style>
  .indent {
    margin: 1rem;
    outline: 1px solid rgba(255, 0, 0, 0.25);
  }
</style>

<div class="indent">
  [base.svelte]
  {@html content}
</div>
