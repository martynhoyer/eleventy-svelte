// required packages
const fetch = require("node-fetch");

// This is the space ID. A space is like a project folder in Contentful terms
const space = process.env.CONTENTFUL_SPACE
// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

// get pages
async function getAllPages() {

  // max number of records to fetch per query
  const recordsPerQuery = 5;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // Pages array
  let pages = [];

  // make queries until makeNewQuery is set to false
  while (makeNewQuery) {
    console.log('Fetching Contenful pages...')
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
            pageCollection(limit: ${recordsPerQuery}, skip: ${recordsToSkip}) {
              items {
                sys {
                  id
                  firstPublishedAt
                }
                title
                slug
                metaDescription
                body {
                  json
                }
                childContentCollection {
                  items {
                    ... on Testimonial {
                      sys {
                        id
                      }
                      __typename
                      category
                      body {
                        json
                      }
                    }
                    ... on Award {
                      sys {
                        id
                      }
                      __typename
                      title
                      organisation
                      year
                    }
                    ... on Cause {
                      sys {
                        id
                      }
                      __typename
                      title
                      url
                      logo {
                        url
                      }
                      body {
                        json
                      }
                    }
                    ... on BlogPost {
                      sys {
                        id
                      }
                      __typename
                      title
                      publishDatetime
                      slug
                      excerpt {
                        json
                      }
                    }
                    ... on Media {
                      sys {
                        id
                      }
                      __typename
                      title
                      url
                      format
                    }
                    ... on TextRotator {
                      sys {
                        id
                      }
                      itemsCollection (limit: 10) {
                        items {
                          title
                        }
                      }
                      textLabel
                    }
                  }
                }
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

      // update pages array with the data from the JSON response
      pages = pages.concat(response.data.pageCollection.items);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back fewer than the records we fetch per query
      if (response.data.pageCollection.items.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // // format pages objects
  const pagesFormatted = pages.map((item) => {
    return {
      id: item.sys.id,
      date: new Date(item.sys.firstPublishedAt),
      title: item.title,
      slug: item.slug,
      body: item.body,
      metaDescription: item.metaDescription,
      childContent: item.childContentCollection.items
    };
  });

  // return formatted pages
  return pagesFormatted;
}

// export for 11ty
module.exports = getAllPages;