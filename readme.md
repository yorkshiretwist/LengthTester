LengthTester
============

When building responsive websites, in fact any websites, it's important to know how the page will respond to text of different lengths. Every web designer has had a client/boss complain when they added a title 30 words long when the design was built with more more than 6 words intended. Traditionally it's been a pain to test different text lengths, but LengthTester allows you to do exactly that without refreshing the page.

Installation
------------

Just include the lengthtester.jquery.js file on your page, like this:

`<script src="lengthtester.jquery.js"></script>`

You also need jQuery.

Usage
-----

There's a handy 'LengthTester settings' bar at the tope of the page. Click it and you'll see the settings form. There are several things you can do:

1. Select the length of text in different elements (H1, H2, A etc)
2. Select the length of text in all the given elements
3. Filter the elements by a selector
4. Reset the text to the original values

There are several different text lengths you can choose from:

1. Empty: No text at all
2. One word: 1 word (obviously)
3. Very short: 3 words
4. Short: 5 words
5. Medium: 10 words
6. Long: 15 words
7: Very long: 25 words
8. Random: A random length between 0 and 25 words

The word are randomly taken from Lorem Ipsum, so you'll feel right at home.

Simple example
--------------

Let's say you want to change the length of text in all H3 elements to see if the design breaks when the text goes onto multiple lines. Open the LengthTester settings form and select 'Very long' from the H3 length selector then click 'Apply'. The new text is added to each H3 element in the page. Check your design works, then to reset the text to its original value click 'Reset'.

Example with a selector
-----------------------

Maybe you want to check if an unordered list of links displays correctly with different lengths of text, but you just want to test that list - not all the links on the page. Enter a selector for the list in the Selector box (e.g. if the list has a class of 'blogroll' then enter '.blogroll') to ensure the text changes only affect elements which are children of that selector. Then choose 'Random' from the A length selector and click 'Apply'.

You can click 'Apply' as many times as you like to check the page as the text changes.

Now the day is over
-------------------

Once you've finished your testing just remove the lengthtester.jquery.js file from your page and leave in time for Beer O'Clock, knowing you've done a good job. Well done.