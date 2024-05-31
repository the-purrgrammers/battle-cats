# Battle Cats!
Welcome to Battle Cats! - an in-browser multiplayer Battleship game, but with cats! 

Play Battle Cats! here - on Render.com: https://battle-cats-t7kz.onrender.com/

This project was initially created by Nick R., Desmond W., Char B., and Thomas H, and overseen by our instructors Jonathan, Tyler, and T.A. Divyah. It served as our final capstone project for Fullstack Academy.

## Project Description
Battle Cats! is an in-browser multiplayer Battleship game where you can play online with your friends. It was created using the following languages:
- HTML
- CSS
- JavaScript
- React
- Express

Battle Cats! also includes the following technologies:
- Node.js
- Vite.js
- Prisma
- socket.io

## Installing Battle Cats! On Your Local Computer
If you would like to have a copy of Battle Cats on your local computer to run in your IDE and experiment with, follow these steps:
1. Create a clone of our repository https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
2. Download node.js if you do not already have it installed https://nodejs.org/en/download/package-manager
3. Download postgresql if you do not already have it installed https://www.postgresql.org/download/
4. Navigate inside the server folder and create a .env file with the following info: ```DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/battle_cats?schema=public" GAME_JWT="you-may-write-any-string-of-letters-and-numbers-here"```
5. In your terminal, run the command ```npm install``` three times - once inside the root file, once inside the server file, and once inside the client file
6. Navigate to the server file and run ```npm run seed:dev``` - this will seed your database
7. Navigate to the root file and run ```npm run startAll```. Click on the link that appears in your terminal ```Local: http://localhost:5173```. Click it twice to open two windows if you would like to play a test game against yourself.

## Issues and Bugs
If you find any issues or bugs that need addressing, please submit a PR regarding the bug.

## Credits
Battle Cats! logo font was created on textstudio.com
Battle Cats! logo and cats were created by Char B.
Battle Cats! music written by Thomas H.
Battle Cats! cat face image was sourced from https://emojipedia.org/google/android-7.0/cat-face 
Battle Cats! background image was sourced from https://pngtree.com/freepng/wood-panels-seamless-swatch-lumber-vector_9211307.html
Battle Cats! rug images are sourced from https://www.homedepot.com/p/SAFAVIEH-Micro-Loop-Grey-Ivory-5-ft-x-5-ft-Abstract-Square-Area-Rug-MLP382F-5SQ/323617321 and https://www.homedepot.com/p/SAFAVIEH-Courtyard-Beige-Green-7-ft-x-7-ft-Square-Floral-Indoor-Outdoor-Patio-Area-Rug-CY7557-32212-7SQ/311906401 
