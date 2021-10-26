# MonetMyrtleMentor

## Backend REST API

Examples:

POST to `/api/user/new` to create a new user;
sample POST body:
```
{
  firstName: 'John',
  lastName: 'Smith',
  email: 'John.Smith@gmail.test',
  password: 'helloworld',
  offeringName: 'Web form creation',
  offeringDesc: 'I can teach you how to create a web form!',
  availability: [
    {
      startTime: '2021-10-20T02:00:00.000Z',
      endTime: '2021-10-20T03:00:00.000Z'
    }
  ]
}
```
