<script context="module">
  export const data = {
    layout: "layouts/base.11ty.js",
    tags: "blogPost",
    permalink: function (data) {
      return `${data.blogPost.parentPageSlug}/${data.blogPost.slugDate}-${data.blogPost.slug}/`;
    },
    pagination: {
      data: "contentfulBlogPosts",
      size: 1,
      alias: "blogPost",
      addAllPagesToCollections: true,
    },
    eleventyComputed: {
      title: function (data) {
        return data.blogPost.title;
      },
    },
  };
</script>

<script>
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
  export let blogPost;
</script>

<style>
  .indent {
    margin: 1rem;
    outline: 1px solid rgba(255, 0, 0, 0.25);
  }
</style>

<div class="indent">
  <p>[blogPosts.svelte]</p>
  <h1>{blogPost.title}</h1>
  <div>
    {@html documentToHtmlString(blogPost.body.json)}
  </div>
  {#if blogPost.childContent}
    <ul>
      {#each blogPost.childContent as childContent}
        <li>
          {@html documentToHtmlString(childContent.fields.body)}
          {childContent.fields.title}
        </li>
      {/each}
    </ul>
  {/if}
</div>
