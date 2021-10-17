# **Doom**

![multiple_screens_image](assets/images/different-screen-sizes.png)

## **Goal for this project** 

Have you been craving a way to test your knowledge on the legendary original first person shooter game??
Well, here is the answer to your prayers.
This game will test how well you know the Doom game series.


## **UX**

### **Site Objectives**

* A website that functions as a trivia quiz
* The site will be responsive and accessible
* Elements will be visually appealing and eye-catching
* The site should handle user input and generate appropriate responses and feedback for the user
* The site will provide the user with multiple choices for each question
* The users answers will be checked against correct answers to determine the score
* The score will be kept as the user advances in the quiz
* The final outcome of the quiz will be returned to the user at the end
* *The site should generate questions appropriate to the difficulty selected by the user* 

### **User Stories**
* As a user, I want to know the purpose of the site immediately
* As a user, I want to start a game easily
* As a user, I want the site to be accessible
* As a user, I want the site to function correctly on all of my devices
* As a user, I want to be able to register my answers to the questions
* As a user, I want to receive feedback on whether I got the question right or wrong
* As a user, I want to know what my score is at any time
* As a user, I want to know how well I did on completion of the game
* As a user, I want to be able to start another game after I finish the first
* As a user, I want to be able to quit the game at any time
* *As a user, I want to easily navigate the site through a menu* 
* *As a user, I want to be able to turn site sounds and music on or off*
* *As a user, I want to be able to select the level of difficulty of the game*
* *As a user, I want to receive questions at the level of difficulty I selected*


### **Design Choices**

#### **Fonts** 
* To stick to the Doom theme I opted to use the Amazdoom font by Amazingmax fonts and Space Marine by Pixel Kitchen which I downloaded from [fontspace](https://www.fontspace.com/category/doom).
* I used the @fontface rule and used a [W3 Schools](https://www.w3schools.com/css/css3_fonts.asp) lesson to guide me.
* For the gradient effect I used code from [CSS Gradient](https://cssgradient.io/blog/css-gradient-text/)

#### **Icons**
[Favicon](https://favicon.io/favicon-converter/)
I used [Font Awesome](https://fontawesome.com/v5.15/icons/volume-mute?style=solid) for the toggle mute button

#### **Colors**
To stick with the color theme of the original game's title page I went with reds and yellows that we mainly see on the title image.  
Here's an image of the title screen I took inspiration from:

![Doom Title](assets/images/doom-title-image.png)

#### **Structure**

## **Wireframes**

I used Balsamic to create the wireframes for this site. First I started witha basic wireframe for the mobile and scaled up to the desktop. This site will only consist of one page and I've decided to aim for a more minimilistic design so as not to complicate the game. The game will be easier to play with this design as users will have the game right in front of them immediately.

### [Desktop Wireframe](wireframes/desktop.png)

### [Tablet Wireframe](wireframes/tablet.png)

### [Mobile Wireframe](wireframes/mobile.png)


## **Features**
 
### **Existing Features**

### **Ideas for more Features**
 play again
## **Technologies used**
 
### **Languages**

### **Libraries & Frameworks**

### **Tools**
 
## **Testing**

### **Menu**

* **Goals**    

* **Method**   

* **Test**    

* **Results**    

### **Bugs**

* **Bug**    
The images in the buttons wouldn't fit correctly
* **Fix**          
I found an article on [GeeksforGeeks](https://www.geeksforgeeks.org/how-to-auto-resize-an-image-to-fit-a-div-container-using-css/) that explained the exact issue and how to fix it. It was as simple as changing one line of CSS targeting the button and setting the object fit to cover.

* **Bug**    
I couldn't get any jQuery to work on my page even after including the script in the head
* **Fix**          
I found an way of testing if jQuery loaded on [stackoverflow](https://stackoverflow.com/questions/7341865/checking-if-jquery-is-loaded-using-javascript) and used the test function provided to see if I had loaded jQuery correctly.

```window.onload = function() {
    if (window.jQuery) {  
        // jQuery is loaded  
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}
```
This test showed that I hadn't correctly installed jQuery so I went to [w3schools](https://www.w3schools.com/jquery/jquery_get_started.asp) and used the correct script for my header and this got me going with jQuery.

* **Bug**    
The game kept displaying the same question until I got it right
* **Fix**          
I added some console logs into my checkAnswer, correctAnswer and wrongAnswer functions which revealed that I was stuck in the same loop because I only increased the question index in the correctAnswer function.
I then changed where the question index was increased to the getNextQuestion function so it would change the index each time a new question was needed.

* **Bug**    
The scoreupdate section shadowing was displaying at the start of the game before it had been revealed.
This was a s a result of the display:inline-block css attribute overwriting the display hidden attribute.
* **Fix**          
I removed the display:inline-block from the css. This ensured that the display attribute would only be overwritten when the score update would be displayed

* **Bug**    
The final two questions are the same every time.

* **Fix**          
After debugging in the browser by console logging the question index and length of the questions list it became clear that I had miscalculated when to end the game if a player had survived.
Instead of ending the game if the question index was equal to the length of the questions list which is 10, I set it to the length of the question list minus one. This is to take into account that indexing starts at 0 not 1.

* **Bug**    
The bullet points of the game instructions were black and couldn't be seen with the dark background

* **Fix**          
I found a fix on [w3schools](https://www.w3schools.com/howto/howto_css_bullet_color.asp) that did exactly what I needed.

* **Bug**    
The answer, mute and how to buttons weren't displaying on mobile

* **Fix**          
I found a font on [Google Fonts](https://fonts.google.com/specimen/Trade+Winds?query=trade) that replaces amazdoomleft quite well and I also found a similar one called orbitron which matches the space marine font very well.

## **Deployment**
 https://hjtb.github.io/Doom-Quiz/
## **Credits**

### **Inspiration**
