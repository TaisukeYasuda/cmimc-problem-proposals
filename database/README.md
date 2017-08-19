# Database Specification

## User
```
{ 
  name: String,
  email: String,
  university: String,
  password: String,
  salt: String,
  unread: [ Announcement ],
  read: [ Announcement ],
  urgent: [ Announcement ],
  created: Date,
  updated: Date,
}
```

## Competition
```
{ 
  name: String,
  location: String,
  contests: [ Contest ],
  active_contest: Contest,
  directors: [ User ],
  members: [ User ],
  announcements: [ Announcement ],
  created: Date,
  updated: Date
}
```

## Announcement
```
{
  title: String,
  body: String,
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
  body: String,
  created: Date,
  updated: Date
}
