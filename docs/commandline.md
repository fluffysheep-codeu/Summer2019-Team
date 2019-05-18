# Command Line Wizard

Below are some of the common command line commands I use.

### Terminal Actions

- `CTRL + R` - Reverse search. Allows you to search commands that you previously used and then invoke them in the command line. Useful to find long commands.

- `CTRL + C` - Kills a process. Use this to kill your server. Do not use CTRL + Z.

- `:wq` - Saves and closes a file when in `vim`. Use only when editing a file using `vim`, which is the command line editor that usually opens up when writing a commit message.

### Terminal Commands

```
# What: Formats all changed java files.
# Where: Invoke from the Summer2019-Team30 folder.
./tools/format-java.sh

# What: Adds all files to local staging in preparation to be committed.
# Where: Invoke from Summer 2019-Team30 folder.
git add .

# What: Adds all files, including deleted files, to local staging in preparation to be committed.
# Where: Invoke from Summer 2019-Team30 folder.
git add -A

# What: Commits files that were added to local staging and brings up an editor
#       to write a commit message.
# Where: Invoke from Summer 2019-Team30 folder.
git commit

# What: Puts the files on local staging to the previous commit and allows yout
#       to change the previous commit's message. This can be run without running
#       git add.
# Where: Invoke from Summer 2019-Team30 folder.
git commit --amend

# What: Puts the files on local staging to the previous commit and without
#       changing the commit's message.
# Where: Invoke from Summer 2019-Team30 folder.
git commit --amend --no-edit

# What: Creates a new commit with a message.
# Where: Invoke from Summer 2019-Team30 folder.
git commit -m "message"

# What: Pulls changes to the current branch from its Github equivalent branch.
# Where: Invoke from Summer 2019-Team30 folder.
git pull

# What: Pushes the commits from your workstation to Github.
# Where: Invoke from Summer 2019-Team30 folder.
git push

# What: Force pushes a commit from your workstation to Github. Useful when
#       rewriting commit history.
# Where: Invoke from Summer 2019-Team30 folder.
git push -f

# What: Resets all files that have been added to local staging but not yet
#       committed.
# Where: Invoke from Summer 2019-Team30 folder.
git reset .

# What: Wipes all changes after the master branch pointer. Good for starting
#       over on a branch.
# Where: Invoke from Summer 2019-Team30 folder.
git reset --hard master

# What: Unstages all changes after the master branch pointer. Can be used to
#       squash many commits into 1 commit.
# Where: Invoke from Summer 2019-Team30 folder.
git reset --soft master

# What: Interactive rebasing of all commits after master. Good for squashing
#       changes and rewording a large set of commits.
# Where: Invoke from Summer 2019-Team30 folder.
git rebase -i master

# What: Puts your changes on top of master.
# Where: Invoke from Summer 2019-Team30 folder.
git rebase master

# What: Lists the past commands you previously had.
# Where: Anywhere
history

# What: Starts a development appengine server.
# Where: Invoke from the server folder.
mvn appengine:devserver

# What: Deploys the webapp to our live website.
# Where: Invoke from the server folder.
# Prereq: Run this command AFTER running npm build run from the client folder.
mvn appengine:deploy

# What: Builds a production version of our React app.
# Where: Invoke from the client folder.
npm build run

# What: Starts a React app server on localhost:3000. Use this for development.
# Where: Must be invoked in the client folder.
npm start
```
