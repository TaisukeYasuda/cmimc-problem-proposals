# Database Specification

## User
```
{ 
  name: String,
  email: String,
  university: String,
  password: String,
  salt: String,
  joined: Date
}
```

## Competition
```
{ 
  name: String,
  location: String,
  contests: [ Contest ],
  directors: [ User ],
  secure_members: [ User ],
  members: [ User ],
  created: Date,
  updated: Date,
}
```

## Contest
```
{
  competition: Competition,
  name: String,
  date: Date,
  tests: [ Tests ],
  test_solvers: [ User ],
  created: Date,
  updated: Date
}
```

## Test
```
{
  contest: Contest,
  problems: [ Problems ],
  subject: Subject,
  created: Date,
  updated: Date
}
```

## Problem
```
{
  author: User,
  statement: String,
  answer: String,
  official_soln: [ Solution ],
  alternate_soln: [ Solution ],
  difficulty: Enum(EASY, MEDIUM, HARD),
  votes: [ Vote ],
  views: [ User ],
  comments: [ Comment ],
  created: Date,
  updated: Date
}
```

## Subject
```
{
  name: String
}
```

## Comment
{
  author: User,
  comment: String,
  created: Date,
  updated: Date
}
