# Box Layout
This library can be described in two ways:
* HBox and VBox layout with pure CSS (flexbox).
* CSS3 flexbox helper classes.

### What is box layout?
Box layout (often known as HBox and VBox layouts) is a UI layout system/concept that have been implementated, in the past, by many popular UI toolkits on different platforms and languages (example ExtJS,QT,GTK,.NET,Android,Kivy...).

This project achieves the same for the web and with CSS only.

### Why?
If you are thinking: "Why do I need a library when I can use CSS3 flexbox directly?", then the answer to you is that this library ultimately simplifies CSS3 flexbox spec for you. It is easier to remember and hence easier to use. Furthermore the helper classes can achieve almost all the layouts in the original flexbox standard (inspite of it using a subset of the standard).

### Usage

Add **boxlayout.css** to your code and start using the CSS classes documented (See them in action in examples.html).

### Documentation

```
vbox          - Stack child items vertically (the "main axis" for child items now becomes
                the vertical axis)
hbox          - Stack child items horizontally (the "main axis" for child items now becomes
                the horizontal axis)
flex          - Stretch item along parent's main-axis
stretch       - Stretch item along parent's cross-axis

main-start    - Stack child items to the main-axis start
main-center   - Stack child items to the main-axis center
main-end      - Stack child items to the main-axis end

cross-start,
cross-center,
cross-end     - Similar to the 'main' counterparts, except that
                these decide the stacking of child items along the cross-axis.

cross-stretch - Stretch child items along the cross-axis
wrap          - Wrap child items to next line on main-axis
```

### Documentation with examples
See them in action with examples.html.
