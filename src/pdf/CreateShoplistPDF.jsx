import React from "react";

import {
  PDFViewer,
  Page,
  Text,
  Rect,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";

const inArrayExample = [
  ["pärlsocker", 100, "g"],
  ["socker", 100, "g"],
  ["smör", 100, "g"],
  ["kaffe", 10, "g"],
  ["cocoa", 100, "g"],
  ["oatmeal,", 100, "g"],
];

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const shoplistStyles = StyleSheet.create({
  headline: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  headline2: {
    fontSize: 20,
  },
  mainbody: {
    fontSize: 14,
    color: "#aaaaaa",
  },

  page: {
    fontFamily: "Roboto",
    //flexDirection: 'row',
    backgroundColor: "#FFFFFF",
  },
  listItem: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingLeft: 50,
    alignItems: "center",
    fontSize: 9,
  },
  bullet: {
    width: 200,
    fontSize: 10,
    marginRight: 8,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    margin: 30,
    padding: 10,
    flexGrow: 1,
  },
});

//----------------- generate_Shopping_ListPDFLink section

/* generate_RecipesList_PDFLink(recipes)
 * Pre:
 * ingredients: a list of strings which describe quantities (with units) of ingredients to be bought
 * fileName: The filename of the downloaded file, (needs to include file extension".pdf"!)
 * Out:
 * A react component (PDFDownloadLink) which generates a download link for the client.
 * Author:
 * Gustav Landberg <landbergg@outlook.com>
 * */
export function generateShoppingListPDFLink(
  shoplistCategoryAggregations,
  fileName = "ShoppingList.pdf"
) {
  /*
  The normalization is of the form:
  
  Array of {
      category:String, 
      ingredients:
          Array consisting of {
              category:String, 
              name:String,
              measures:Array of {amount:int, unit:String}
          }
  }
  */
  return (
    <div>
      <PDFDownloadLink
        document={
          <ShoppingListFrame
            shoplistCategoryAggregations={shoplistCategoryAggregations}
          />
        }
        fileName={fileName}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Export Shop List"
        }
      </PDFDownloadLink>
    </div>
  );
}

/* ShopplingListFrame (ingredients)
 * Pre: A list of ingredients
 * ingredients: a list of strings which describe quantities (with units) of ingredients to be bought
 * Post: A Shopping list PDF documents
 * Author: Gustav Landberg <landbergg@outlook.com>
 * */
const ShoppingListFrame = ({ shoplistCategoryAggregations }) => (
  <Document>
    <Page size="A5" style={shoplistStyles.page}>
      <View>
        <Text style={shoplistStyles.mainbody}> by menumatic</Text>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Shopping List
        </Text>
        <ShoplistBulletList
          shoplistCategoryAggregations={shoplistCategoryAggregations}
        />
      </View>
    </Page>
  </Document>
);

/* ShoplistBulletList(items, dot, stylesheet): the content inside the ShoplistBulletListFrame
 * Pre:
 * items:the list of strings which should make up the bullets points
 * These values have standard values in case that BulletList doesn't set any values for the specific attributes
 * dot: the character for the dot which shall preface each point in the bullet list, can be empty
 * stylesheet: the stylesheet which should be used (make sure that the relevant fields for ListItems are defined)
 * Post:
 * A bullet list in a View (must be placed under Document->Page)
 * Author: Gustav Landberg <landbergg@outlook.com>
 * */
const ShoplistBulletList = ({
  shoplistCategoryAggregations,
  dot = "•",
  stylesheet = shoplistStyles,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 8,
          paddingLeft: 50,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontSize: 14,
            marginRight: 8,
            width: 200,
          }}
        >
          Ingredient
        </Text>
        <Text
          style={{
            width: 60,
            textAlign: "right",
            marginRight: 105,
            fontWeight: "bold",
            marginBottom: 20,
            fontSize: 14,
          }}
        >
          Amount
        </Text>
      </View>

      {shoplistCategoryAggregations.map((categoryAggregation) => (
        <ShoplistBulletListCategorySectionFrame
          categoryAndIngredients={categoryAggregation}
          dot={dot}
          stylesheet={stylesheet}
        />
      ))}
    </View>
  );
};

// The components' deconstruction statements like ListItem's `{ children, dot = '•' }` extracts the desired attributes from props. The "dot = '•'" is just confusing and should be an initial constant
const ShoplistBulletListCategorySectionFrame = ({
  categoryAndIngredients,
  dot = "•",
}) => {
  // Structure of each rowCategoryAggregation:
  /*
  {
      category:String, 
      ingredients:
          Array consisting of {
              category:String, 
              name:String,
              measures:Array of {amount:int, unit:String}
          }
  }
  */
  return (
    <View>
      <ShoplistCategorySectionTitle
        titleText={categoryAndIngredients.category}
      />
      {categoryAndIngredients.ingredients.map((ingredient) => {
        return (
          <ShoplistBulletListRow
            ingredientName={ingredient.name}
            measures={ingredient.measures}
          />
        );
      })}
    </View>
  );
};

const ShoplistCategorySectionTitle = ({ titleText }) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          paddingLeft: "5px",
        }}
      >
        {titleText}
      </Text>
    </View>
  );
};

const ShoplistBulletListRow = ({ ingredientName, measures }) => {
  let measuresAsString = "";
  measures.forEach((measure) => {
    measuresAsString =
      measuresAsString +
      `${Math.ceil(measure.amount * 1000) / 1000} ${measure.unit}, `;
  });
  measuresAsString = measuresAsString.slice(0, measuresAsString.length - 2); // removing the ", " at the end
  /*
style={{
        width: 60,
        ,
        textAlign: 'right',
        marginRight: 35,
      }}
*/
  return (
    <View style={shoplistStyles.listItem}>
      <Text style={shoplistStyles.bullet}>• {ingredientName} </Text>
      <Text>{measuresAsString} </Text>
    </View>
  );
};

//----------------- generate_Recipes_ListPDFLink section
const recipeStyle = StyleSheet.create({
  headline: {
    fontSize: 24,
    textAlign: "right",
    marginTop: 20,
    marginRight: 30,
    marginBottom: 20,
  },
  headline_section: {},
  headline2: {
    fontSize: 20,
  },
  mainbody: {
    fontSize: 14,
    color: "#aaaaaa",
  },

  page: {
    fontFamily: "Roboto",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
    alignSelf: "center",
    fontSize: 10,
  },
  bullet: {
    fontSize: 10,
    marginRight: 5,
    textAlign: "right",
    alignSelf: "right",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});


/* A recipe (title, ingredients, instructions)
* Pre:
* title: The title of the recipe
* ingredients: a list of strings (ingredients)
* instructions: a list of strings (instructions)
* Post:
*
* Author: Gustav Landberg <landbergg@outlook.com>
* */

const Recipe = ({ title, ingredients, instructions }) => (
  <Page size="A4" orientation={"landscape"} style={recipeStyle.page}>
    <Text style={recipeStyle.mainbody}> by menumatic</Text>
    <View style={recipeStyle.headline_section}>
      <Text style={recipeStyle.headline}>{title}</Text>
    </View>
    <View style={recipeStyle.section}>
      <Text style={recipeStyle.headline2}>Ingredients:</Text>
    </View>
    <View style={recipeStyle.section}>
      <Text style={recipeStyle.headline2}>Instructions:</Text>
    </View>
  </Page>
);

/* generateRecipesListPDFLink(recipes)
 * Pre:
 * recipes: a list of format
 *  [[title, [ingredient1, ingredient2, ...], [instruction1, instruction2, ...]],...]
 *  where title, ingredientX, instructionX are strings containing the corresponding information
 * Post:
 * A react component (PDFDownloadLink) which generates a download link for the client.
 * Author:
 * Gustav Landberg <landbergg@outlook.com>
 * */
const RecipesDocument = ({recipes}) => (
  <Document>
        {recipes.map((recipe) => (
      <Recipe
        key={Math.random()}
        title={recipe.title}
        ingredients={recipe.ingredients}
        instruction={recipe.instructions}
      />
    ))}
  </Document>
);

export function generateRecipesListPDFLink(recipes) {
  
  return (
    <div>
      <PDFDownloadLink document={<RecipesDocument recipes={recipes}/>} fileName="recipes.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Recipes"
        }
      </PDFDownloadLink>
    </div>
  );
}
