# calculator

Done for my DevIsland students as part of the Odin Project

Add, subract, multiply, and divide.  
Supports decimals and rolling calculations (e.g. 1+2\*4/3).

At first, I developed a very long regex to limit the input possibilities (e.g. disallowing more than one decimal in a row and leading operators except for "-", etc.). I usually like to steer clear of these but I thought it simpflied my code in the end. After helping a student, I realized the code could be much simplified by creating separate variables for each component of the expression in the display instead of handling it as one string. This allowed me to trim down my code quite a bit, including getting rid of the regex.

See if you can find the Easter Egg :)
