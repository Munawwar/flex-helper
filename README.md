# Flex helper
CSS3 flexbox helper classes. The helper CSS classes mimic box layout systems of popular UI toolkits (like QT, GTK, .NET, Android, Kivy, ExtJS...).

### Usage

Add **flex-helper.css** to your code and start using the CSS classes documented ([See them in action with examples.html](http://munawwar.github.io/box-layout/examples.html)).

### Documentation

```
vbox          - Stack child items vertically (the "main axis" for child items is now
                the vertical axis)
hbox          - Stack child items horizontally (the "main axis" for child items is now
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
[See them in action with examples.html](http://munawwar.github.io/box-layout/examples.html).
