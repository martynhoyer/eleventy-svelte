<script context="module">
  export const data = {
    layout: "layouts/base.11ty.js",
    tags: "page",
    permalink: function (data) {
      if (data.page.slug === "home") return "/";
      return `${data.page.slug}/`;
    },
    pagination: {
      data: "contentfulPages",
      size: 1,
      alias: "page",
      addAllPagesToCollections: true,
    },
    eleventyComputed: {
      title: function (data) {
        return data.page.title;
      },
    },
  };
</script>

<script>
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
  export let page;
  export let contentfulMainNavigation;

  const { childContent } = page;

  const filteredTestimonials =
    childContent.length > 0 &&
    childContent.filter((item) => item.__typename === "Testimonial");

  const filteredAwards =
    childContent.length > 0 &&
    childContent.filter((item) => item.__typename === "Award");

  const filteredCauses =
    childContent.length > 0 &&
    childContent.filter((item) => item.__typename === "Cause");

  const filteredBlogPosts =
    childContent.length > 0 &&
    childContent.filter((item) => item.__typename === "BlogPost");

  const filteredMedia =
    childContent.length > 0 &&
    childContent.filter((item) => item.__typename === "Media");

  const filteredRoles =
    childContent.length > 0 &&
    childContent.filter((item) => item.__typename === "Role");

  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const groupedTestimonialsArray =
    filteredTestimonials &&
    Object.entries(groupBy(filteredTestimonials, "category"));
</script>

<style>
  .indent {
    margin: 1rem;
    outline: 1px solid rgba(255, 0, 0, 0.25);
  }
</style>

<div class="indent">
  <p>[pages.svelte]</p>
  <ul>
    {#each contentfulMainNavigation as { slug, shortTitle, title }}
      <li>
        <a href={`/${slug !== 'home' ? slug : ''}`}>{shortTitle || title}</a>
      </li>
    {/each}
  </ul>

  <h1>{page.title}</h1>
  <div>
    {@html documentToHtmlString(page.body.json)}
  </div>
  {#each filteredMedia as { url, title, format }}
    <div>
      <h2><a href={url}>{title}</a></h2>
      <div>{format}</div>
    </div>
  {/each}
  {#each groupedTestimonialsArray as [title, items]}
    <h2>{title}</h2>
    {#each items as { body }}
      {@html documentToHtmlString(body.json)}
    {/each}
  {/each}
  {#if filteredAwards.length > 0}
    <h2>Awards</h2>
    {#each filteredAwards as { title, organisation, year }}
      <h3>{title}</h3>
      <div>{organisation}</div>
      <div>{year}</div>
    {/each}
  {/if}
  {#each filteredBlogPosts as { title, excerpt, publishDatetime, slug }}
    <h2>
      <a
        href={`/${page.slug}/${new Date(publishDatetime)
            .toISOString()
            .split('T')[0]}-${slug}`}>{title}</a>
    </h2>
    {publishDatetime}
    {@html documentToHtmlString(excerpt.json)}
  {/each}
  {#each filteredCauses as { body, title, url, logo }}
    <h2><a href={url}>{title}</a></h2>
    <img src={logo.url} width="200px" alt="" />
    {@html documentToHtmlString(body.json)}
  {/each}
</div>
