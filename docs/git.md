# Git Guide

Read [Using Git](https://sites.google.com/corp/codeustudents.com/summer-2019/reference-guides/using-git?authuser=0) from the CodeU website to help get a better understanding of using Git. There is also a video on the website that goes through the process of making a branch and pushing changes.

Note that we have our own methodology to using git to keep our commit history clean. Read more below!

## Pushing Your Changes for Review

```
# Check what files you've modified on your branch.
git status

# Make sure the files you have edited are red.
# If there are other files that are red, then uh...panic?

git add .
git commit

# Opens an editor. Read https://chris.beams.io/posts/git-commit/ on what makes
# a good commit message. Save and close.

git checkout master

git pull

# Don't forget to change yourBranchName to your actual branch name.
git checkout yourBranchName

git rebase master

# You might have conflicts here. If you do read below.
git push

```

## Commit Messages

Read https://chris.beams.io/posts/git-commit/. Pay special attention to "The seven rules of a great Git commit message".

## Making Pull Requests

## Squash Your Commits

When you make a pull request

## Rebasing Your Branch
