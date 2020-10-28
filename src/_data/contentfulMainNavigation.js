// required packages
const fetch = require("node-fetch");

// This is the space ID. A space is like a project folder in Contentful terms
const space = process.env.CONTENTFUL_SPACE
// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

// get pages
async function getMainNavigation() {

  // max number of records to fetch per query
  const recordsPerQuery = 100;

  // number of records to skip (start at 0)
  let recordsToSkip = 0;

  // do we make a query ?
  let makeNewQuery = true;

  // Pages array
  let mainNavigation = [];

  // make queries until makeNewQuery is set to false
  while (makeNewQuery) {
    console.log('Fetching Contenful main navigation...')
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
            navigation(id: "4tYXefmDSWnT6Qrg1wlJ80") {
              itemsCollection(limit: ${recordsPerQuery}, skip: ${recordsToSkip}) {
                items {
                  sys {
                    id
                    firstPublishedAt
                  }
                  title
                  shortTitle
                  slug
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

      // update mainNavigation array with the data from the JSON response
      mainNavigation = mainNavigation.concat(response.data.navigation.itemsCollection.items);

      // prepare for next query
      recordsToSkip += recordsPerQuery;

      // stop querying if we are getting back fewer than the records we fetch per query
      if (response.data.navigation.itemsCollection.items.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // format mainNavigation objects
  const mainNavigationFormatted = mainNavigation.map((item) => {
    return {
      id: item.sys.id,
      date: new Date(item.sys.firstPublishedAt),
      title: item.title,
      shortTitle: item.shortTitle,
      slug: item.slug,
    };
  });

  // return formatted mainNavigation
  return mainNavigationFormatted;
}

// export for 11ty
module.exports = getMainNavigation;