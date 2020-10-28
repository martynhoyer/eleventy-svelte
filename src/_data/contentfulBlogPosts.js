// required packages
const fetch = require("node-fetch");

// This is the space ID. A space is like a project folder in Contentful terms
const space = process.env.CONTENTFUL_SPACE
// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

// get blogposts
async function getAllBlogposts() {

  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // Blogposts array
  let blogposts = [];

  // make queries until makeNewQuery is set to false
  while (makeNewQuery) {
    console.log('Fetching Contenful blog posts...')
    try {
      // initiate fetch
      const dato = await fetch(`https://graphql.contentful.com/content/v1/spaces/${space}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          query: `{
            blogPostCollection(limit: ${recordsPerQuery}, skip: ${recordsToSkip}) {
              items {
                sys {
                  id
                }
                title
                slug
                excerpt {
                  json
                }
                publishDatetime
                linkedFrom {
                  pageCollection {
                    items {
                      slug
                    }
                  }
                }
                body {
                  json
                }
                metaDescription
              }
            }
          }`
        })
      });

      // store the JSON response when promise resolves
      const response = await dato.json();

      // handle Contentful errors
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.log(error.message);
        });
        throw new Error("Aborting: Contentful errors");
      }

      // update blogpost array with the data from the JSON response
      blogposts = blogposts.concat(response.data.blogPostCollection.items);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back fewer than the records we fetch per query
      if (response.data.blogPostCollection.items.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // // format blogposts objects
  const blogpostsFormatted = blogposts.map((item) => {
    return {
      id: item.sys.id,
      date: new Date(item.publishDatetime),
      publishDateTime: item.publishDatetime,
      slugDate: new Date(item.publishDatetime).toISOString().split('T')[0],
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      parentPageSlug: item.linkedFrom.pageCollection.items[0].slug,
      body: item.body,
      metaDescription: item.metaDescription
    };
  });

  // return formatted blogposts
  return blogpostsFormatted;
}

// export for 11ty
module.exports = getAllBlogposts;