# Database Specification

## User
```
{ 
  name: String,
  email: String,
  password: String,
  university: String,
  admin: Boolean,
  salt: String,
  unread: [ Notification ],
  read: [ Notification ],
  urgent: [ Notification ],
  requests: [ Request ],
  created: Date,
  updated: Date,
}
```

## Competition
```
{ 
  name: String,
  website: String,
  location: String,
  contests: [ Contest ],
  active_contests: [ Contest ],
  directors: [ User ],
  members: [ User ],
  announcements: [ Notification ],
  created: Date,
  updated: Date
}
```

## Notification
```
{
  author: User,
  title: String,
  body: String,
  created: Date,
  updated: Date
}
```

## Request
```
{
  author: User,
  body: String,
  type: Enum(REQUEST, INVITE), 
  created: Date,
  updated: Date
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
  czars: [ User ],
  created: Date,
  updated: Date
}
```

## Test
```
{
  contest: Contest,
  name: String,
  num_problems: Integer,
  problems: [ Problems ],
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
  contest: Contest,
  shared: Boolean,
  official_soln: [ Solution ],
  alternate_soln: [ Solution ],
  difficulty: Enum(EASY, MEDIUM, HARD),
  upvotes: [ User ],
  downvotes: [ User ],
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
```
{
  author: User,
  body: String,
  created: Date,
  updated: Date
}
```
