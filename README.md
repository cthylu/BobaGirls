Boba Girl is a e-commerce Store that allows consumers to purchase specific ingredients to build their own boba kit.
This allows them to have ingredients delivered straight to their home and mix up some delicious boba at their comfort.

-Insert Heroku Link-

Boba Girl Team!

Ice Tam: https://www.linkedin.com/in/ice-tam/ 
         https://github.com/IceTam1
Cathy Lu: https://www.linkedin.com/in/cathy-lu/
          https://github.com/cthylu
YingYing Feng: https://www.linkedin.com/in/yingyingfeng1/
               https://github.com/yingying127
Kimberly Wu: https://www.linkedin.com/in/kimberlywu98/
             https://github.com/kimmylubs




Our excalidraw!
https://excalidraw.com/#room=f98f760bcc7f90309c0f,nC6MKpNGTF0p4tqsegaziQ



```
Get rid of our own changes, so we can pull from the main:
git reset --hard origin/main
git pull origin main

pushing to branch error:
'error: failed to push some refs to 'github.com:cthylu/BobaGirls.git'
git pull --rebase 
git push

Fetching our main:
git fetch
git pull main
```
# FS-App-Template

## Setup!

To use this as boilerplate, you'll need to take the following steps:

* Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

* Now you will have to add the fs-app-template as a remote and merge it into your own repository.

```
git remote add boilermaker git@github.com:FullstackAcademy/fs-app-template.git
git fetch boilermaker
git merge boilermaker/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json`
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
* These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

* By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)


### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

  3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno (This creates your production database)

  4.  `heroku config:set SEED=true` to get heroku to sync and seed your database

  5.   note everytime your app restarts, the database tables will be dropped and re-created. To avoid this you can `config:unset SEED`


* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.


Now, you should be deployed!
 hello!
