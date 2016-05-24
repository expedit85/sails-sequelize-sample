# Sample of API documentation v0.0.0

A Sails application sample using Sequelize ORM, generators, APIdocs and Mocha.

- [User](#user)
	- [Get user](#get-user)
	- [Get users](#get-users)
	- [Create user](#create-user)
	- [Test dates](#test-dates)
	- [Transaction sample](#transaction-sample)
	


# User

## Get user

<p>Get an user. <br> <strong>Blueprint:</strong> GET /user/show?id=Number</p>

	GET /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The user's identifier.</p>							|
| name			| String			|  <p>The user's name.</p>							|
| address			| String			|  <p>The user's address.</p>							|

### Success Response

Success response:

```
{
	"id": Number,
	"name": String,
	"address": String,
	"birthdayDate": Date,
	"beginDate": Date,
	"endDate": Date
}
```
### Error Response

(404) User not found:

```
null
```
## Get users

<p>Get all users. <br> <strong>Blueprint:</strong> GET /user/list</p>

	GET /users


### Success Response

Success response:

```
[
	{
		"id": Number,
		"name": String,
		"address": String,
		"birthdayDate": Date,
		"beginDate": Date,
		"endDate": Date
	},
	...
]
```
### Error Response

(404) User not found:

```
null
```
## Create user

<p>Create an user. <br> <strong>Blueprint:</strong> GET /user/create?name=String&amp;address=String</p>

	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  <p>The user's name.</p>							|
| address			| String			|  <p>The user's address.</p>							|

### Success Response

Success response:

```
{
	"id": Number,
	"name": String,
	"address": String,
	"birthdayDate": Date,
	"beginDate": Date,
	"endDate": Date
}
```
## Test dates

<p>Test insertion of dates.</p>

	GET /user/test


### Success Response

Success response:

```
[
	{
		"id": Number,
		"name": String,
		"address": String,
		"birthdayDate": Date,
		"beginDate": Date,
		"endDate": Date
	},
	{
		"id": Number,
		"name": String,
		"address": String,
		"birthdayDate": Date,
		"beginDate": Date,
		"endDate": Date
	}
]
```
## Transaction sample

<p>Get all users.</p>

	GET /user/transaction


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>An user's identifier. Insert if does not exist, insert,</p>							|

### Success Response

Success response:

```
[
	{
		"id": Number,
		"name": String,
		"address": String,
		"birthdayDate": Date,
		"beginDate": Date,
		"endDate": Date
	},
	{
		"id": Number,
		"name": String,
		"address": String,
		"birthdayDate": Date,
		"beginDate": Date,
		"endDate": Date
	}
]
```

