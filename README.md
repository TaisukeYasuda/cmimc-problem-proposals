# USMCA Problem Proposals
Web app for problem proposals for the (United States Math Competition Association)[usmath.org].

## Project Structure
This project runs a node server and a MySQL database and serves a frontend based on React/Redux and Materialize. 

## Set Up

* Populate a `.env` in the root directory with the MySQL database info `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, the server port `PORT`, and a JWT secret `JWT_SECRET`
* Install node packages with `npm install`
* Build the react source with `npm run watch` (`npm run build` for production)
* Start the server with `npm run dev` (`npm start` for production)
