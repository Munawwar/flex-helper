# Box Layout
HBox and VBox layout with pure css (flexbox).

Box layout (often known as HBox and VBox layouts) is a UI layout system/concept that have been implementated, in the past, by many popular UI toolkits on different platforms and languages (example ExtJS,QT,GTK,.NET,Android,Kivy...).
This tries to achieve the same for the web and with CSS only.

### Usage

Just add boxlayout.css to your code and start using the CSS classes documented (See them in action in examples.html).

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
