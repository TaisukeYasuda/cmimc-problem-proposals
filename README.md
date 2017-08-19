# USMCA
Web app for the [United States Math Competition Association](usmath.org).

## For Users

### Terms
* **Competition**: A single organization that runs contests, e.g. CMIMC.
* **Contest**: An event run by competitions, e.g. CMIMC 2017. A competition has at most one active contest and that is the only contest that can be modified. 
* **Test**: A collection of problems belonging to a contest. 
* **User**: A single person who carries out certain roles to contests. Users have various privileges with respect to competitions and contests:
  * **Director** (of a competition): Manages members of a competition. A Director is also a Czar.
  * **Member** (of a competition): Proposes problems to the active contests.
  * **Czar** (of a contest): Manages the problems of the contest and appoints Test Solvers. A Czar is also a Member and a Test Solver. 
  * **Test Solver** (of a contest): Accesses problems of the contest and verifies its problems.

| | Director | Member | Czar | Test Solver |
| - | - | - | - | - |
| Write Problems | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | |
| View/Verify Problems | :heavy_check_mark: | | :heavy_check_mark: | :heavy_check_mark: |

### Problem Proposal and Sharing
A member of a competition can propose problems to the active contest. 

## For Developers

### Project Structure
This project runs a node server and a MongoDB database and serves a frontend based on React/Redux and Materialize. 

### Set Up

* Populate a `.env` in the root directory with the MySQL database info `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, the server port `PORT`, and a JWT secret `JWT_SECRET`
* Install node packages with `npm install`
* Build the react source with `npm run watch` (`npm run build` for production)
* Start the server with `npm run dev` (`npm start` for production)
