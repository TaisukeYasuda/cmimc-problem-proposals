# Database Requirements

## Problems
Problems should have following attributes:
* Timestamp
* Author and affiliated contest
* Statement (required)
* Answer (not required)
* Solution (not required)
* Subject: ANCG, Proof, Other; we can add more later (e.g. CS) if needed
* Comment thread, ideally inline (e.g. google doc comments)
* Proofreading status, i.e. “Unverified” or “Verified x times”
* Access level, one of
  * My contest only
  * Open if not selected for my contest (default)
  * Open to all
* Associated test (e.g. PUMaC Algebra), could be none (defaults to none). There should be a dropdown menu on a problem’s page for adding it to a test

## Tests
* A test is just a list of problems 
* Czars should be able to create tests with a name and a given number of problems
* Tests can be incomplete or even empty at any time

## Users
* Users should be affiliated with a contest
* Users can submit problems
* Users can add and edit solutions to problems
* Users can verify problems
* Users cannot verify their own problems
* Users can comment on problems
* Users can NOT edit problem statements unless
  * It is their problem OR
  * They are a czar and the author is from their contest
* Users can NOT edit access levels unless
  * It is their problem OR
  * They are a czar and the author is from their contest

## User Registration
* Users have NO ACCESS TO ANYTHING on registration.
* Access will be manually granted by either us or tournament directors
* Tournament director access is manually granted by us

