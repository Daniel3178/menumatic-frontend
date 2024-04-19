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

const styles = StyleSheet.create({
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
    marginBottom: 4,
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 13,
  },
  bullet: {
    fontSize: 13,
    marginRight: 5,
    textAlign: "center",
    alignSelf: "center",
  },
  section: {
    margin: 30,
    padding: 10,
    flexGrow: 1,
  },
});

const styles_recipe = StyleSheet.create({
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
const ListItem = ({ children, dot = "•", stylesheet = styles }) => {
  return (
    <View style={{ stylesheet }.listItem}>
      <Text style={{ stylesheet }.bullet}>{dot + children}</Text>
    </View>
  );
};
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
  <Page size="A5" orientation={"landscape"} style={styles_recipe.page}>
    <Text style={styles_recipe.mainbody}> by menumatic</Text>
    <View style={styles_recipe.headline_section}>
      <Text style={styles_recipe.headline}>{title}</Text>
    </View>
    <View style={styles_recipe.section}>
      <Text style={styles_recipe.headline2}>Ingredients:</Text>
      <BulletList items={ingredients} stylesheet={styles_recipe} />
    </View>
    <View style={styles_recipe.section}>
      <Text style={styles_recipe.headline2}>Instructions:</Text>
      <BulletList items={instructions} dot={""} stylesheet={styles_recipe} />
    </View>
  </Page>
);

/* BulletList(items, dot, stylesheet)
 * Pre:
 * items:the list of strings which should make up the bullets points
 * dot: the character for the dot which shall preface each point in the bullet list, can be empty
 * stylesheet: the stylesheet which should be used (make sure that the relevant fields for ListItems are defined)
 * Post:
 * A bullet list in a View (must be placed under Document->Page)
 * Author: Gustav Landberg <landbergg@outlook.com>
 * */
const BulletList = ({ items, dot = "•", stylesheet = styles }) => {
  return (
    <View>
      {items.map((item) => (
        <ListItem
          key={item.id || Math.random()}
          dot={dot}
          stylesheet={stylesheet}
        >
          {item}
        </ListItem>
      ))}
    </View>
  );
}


/* ShopplingList (ingredients)
 * Pre: A list of ingredients
 * ingredients: a list of strings which describe quantities (with units) of ingredients to be bought
 * Post: A Shopping list PDF documents
 * Author: Gustav Landberg <landbergg@outlook.com>
 * */
const ShoppingList = ({ ingredients }) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <View>
        <Text style={styles.mainbody}> by menumatic</Text>
        <Text style={styles.headline}>Shopping List</Text>
        <BulletList items={ingredients} />
      </View>
    </Page>
  </Document>
);

/* generateRecipesListPDFLink(recipes)
 * Pre:
 * ingredients: a list of strings which describe quantities (with units) of ingredients to be bought
 * fileName: The filename of the downloaded file, (needs to include file extension".pdf"!)
 * Out:
 * A react component (PDFDownloadLink) which generates a download link for the client.
 * Author:
 * Gustav Landberg <landbergg@outlook.com>
 * */
export function generateShoppingListPDFLink(
  ingredients,
  fileName = "ShoppingList.pdf"
) {
  return (
    <div>
      <PDFDownloadLink
        document={<ShoppingList ingredients={ingredients} />}
        fileName={fileName}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}
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
export function generateRecipesListPDFLink(recipes) {
  const recipesDocument = () => (
    <Document>
      {recipes.map((recipe) => (
        <Recipe
          key={Math.random()}
          title={recipe[0]}
          ingredients={recipe[1]}
          instruction={recipe[2]}
        />
      ))}
    </Document>
  );
  return (
    <div>
      <PDFDownloadLink document={recipesDocument} fileName="recipes.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Recipes"
        }
      </PDFDownloadLink>
    </div>
  );
}


/* CreatePDFForm
 * This function is for testing. Remove when no longer necessary
 * **Deprecated**
*  Pre: none
*  Post: CreatePDFForm : A simple component which will generate downloads links to two generated PDF documents
*  Author: Gustav Landberg <landbergg@outlook.com>
*/
function CreatePDFForm() {
  const [inputText, setInputText] = React.useState("");

  function handleChange(event) {
    setInputText(event.target.value);
  }

  var ingredientsList = inArrayExample.map((x) => x.join(" "));
  console.log(ingredientsList);
  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Recipe
              title="chokladbollar"
              ingredients={ingredientsList}
              instructions={["1. gör chokladbollarna"]}
            />
          </Document>
        }
        fileName="recipes.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Recipes"
        }
      </PDFDownloadLink>
      <br></br>
      <br></br>
      <PDFDownloadLink
        document={<ShoppingList ingredients={ingredientsList} />}
        fileName="ShoppingList.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Shoppling List"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default CreatePDFForm;
