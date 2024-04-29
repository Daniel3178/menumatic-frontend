CREATE TABLE recipe (
 recipe_id INT NOT NULL,
 name_of_recipe VARCHAR(500) NOT NULL,
 portions INT NOT NULL
);

ALTER TABLE recipe ADD CONSTRAINT PK_recipe PRIMARY KEY (recipe_id);


CREATE TABLE registered_user (
 user_id VARCHAR(500) NOT NULL
);

ALTER TABLE registered_user ADD CONSTRAINT PK_registered_user PRIMARY KEY (user_id);


CREATE TABLE food_preference (
 preference VARCHAR(500) NOT NULL,
 user_id VARCHAR(500) NOT NULL
);

ALTER TABLE food_preference ADD CONSTRAINT PK_food_preference PRIMARY KEY (preference,user_id);


CREATE TABLE mealplan (
 mealplan_id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
 time_of_mealplan TIMESTAMP(6) NOT NULL,
 name_of_mealplan VARCHAR(500) NOT NULL,
 user_id VARCHAR(500) NOT NULL
);

ALTER TABLE mealplan ADD CONSTRAINT PK_mealplan PRIMARY KEY (mealplan_id);


CREATE TABLE recipe_mealplan (
 recipe_id INT NOT NULL,
 mealplan_id INT NOT NULL
);

ALTER TABLE recipe_mealplan ADD CONSTRAINT PK_recipe_mealplan PRIMARY KEY (recipe_id,mealplan_id);


CREATE TABLE excluded_ingredient (
 mealplan_id INT NOT NULL,
 name_of_excluded_ingredient VARCHAR(500) NOT NULL
);

ALTER TABLE excluded_ingredient ADD CONSTRAINT PK_excluded_ingredient PRIMARY KEY (mealplan_id,name_of_excluded_ingredient);


ALTER TABLE food_preference ADD CONSTRAINT FK_food_preference_0 FOREIGN KEY (user_id) REFERENCES registered_user (user_id) ON DELETE CASCADE;


ALTER TABLE mealplan ADD CONSTRAINT FK_mealplan_0 FOREIGN KEY (user_id) REFERENCES registered_user (user_id) ON DELETE CASCADE;


ALTER TABLE recipe_mealplan ADD CONSTRAINT FK_recipe_mealplan_0 FOREIGN KEY (recipe_id) REFERENCES recipe (recipe_id) ON DELETE CASCADE;
ALTER TABLE recipe_mealplan ADD CONSTRAINT FK_recipe_mealplan_1 FOREIGN KEY (mealplan_id) REFERENCES mealplan (mealplan_id) ON DELETE CASCADE;


ALTER TABLE excluded_ingredient ADD CONSTRAINT FK_excluded_ingredient_0 FOREIGN KEY (mealplan_id) REFERENCES mealplan (mealplan_id) ON DELETE CASCADE;


