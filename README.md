# Team 30: Tip of My Tongue

Please read the [documentation](https://fluffysheep-codeu.github.io/Summer2019-Team30/) for details and setup for this project.

## Cloning the Repo

1. Open a terminal and navigate to where you want to put this repository.
2. Run `git clone https://github.com/fluffysheep-codeu/Summer2019-Team30.git`
3. This will put you on the master branch.
4. Follow the [Using Git Guide](https://sites.google.com/corp/codeustudents.com/summer-2019/reference-guides/using-git) to learn about branching and pull requests so that you can make your first changes to this codebase.

## Running the Client-Server Locally

1. Open a terminal window and navigate to the repository root.
2. Run these commands to start the Appengine Devserver.
   ```
   cd server
   mvn appengine:devserver
   ```
3. Open a _NEW_ terminal window and navigate to the repository root.
4. Run these commands to start the React client.

   ```
   cd client
   npm install
   npm start
   ```

5. If a web page didn't open up, navigate to http://localhost:3000.

## Making Changes

1. Any changes to javascript files under client/src will be hot reloaded. This means changing UI elements through javascript will automatically appear on your local web page.

2. Any changes to java files must be recompiled by maven. This means you must re-run `mvn appengine:devserver` from the server folder. You _DO NOT_ need to rerun the client.

3. Client and server can be run and stopped independently so you usually don't need to kill both processes during development. You will need 2 terminals open for typical development.

## Typical Development Cycle

1. Start the React client.
2. Start the Appengine Devserver.
3. Open http://localhost:3000.
4. Make changes to javascript files (client work)
5. Check http://localhost:3000 to see if changes worked.
6. Commit and push changes that aren't broken.
7. Make changes to java files (server work).
8. Re-compile the server.
9. Check http://localhost:3000 to see if the server changes worked.
