mongoimport --db blog --collection users --file ./src/db/users.json --jsonArray
mongoimport --db blog --collection posts --drop --file ./src/db/posts.json --jsonArray