# Flex helper
CSS3 flexbox helper classes.

The helper CSS classes mimic box layout systems of popular UI toolkits (like QT, GTK, .NET, Android, Kivy, ExtJS...).

### Usage

Add **flex-helper.css** to your code and start using the CSS classes documented ([See them in action with examples.html](http://munawwar.github.io/flex-helper/examples.html)).

### Browser Support

flex-helper.css supports Edge 13+, Safari 9 and latest Chrome and Firefox.

In the [legacy folder](https://github.com/Munawwar/flex-helper/tree/master/legacy)

    flex-helper-2012.css supports IE 10+ and Safari 7+ as well.

    and flex-helper-2009.css supports UC Browser and Safari 6+ as well.

### Documentation

```
vbox          - Stack child items vertically (the "main axis" for child items is now
                the vertical axis)
hbox          - Stack child items horizontally (the "main axis" for child items is now
                the horizontal axis)
flex          - Stretch item along parent's main-axis

main-start    - Stack child items to the main-axis start
main-center   - Stack child items to the main-axis center
main-end      - Stack child items to the main-axis end

cross-start,
cross-center,
cross-end     - Similar to the 'main' counterparts, except that
                these decide the stacking of child items along the cross-axis.
cross-stretch - Stretch child items along the cross-axis

stretch-self  - Stretch item along parent's cross-axis. Overrides any cross-* class behavior on parent.
center-self   - Centers item along parent's cross-axis. Overrides any cross-* class behavior on parent.

wrap          - Wrap child items to next line on main-axis
```

### Documentation with examples
[See them in action with examples.html](http://munawwar.github.io/flex-helper/examples.html).

For older browser support:

See flexbox-2012.css examples [here](http://munawwar.github.io/flex-helper/legacy/examples-2012.html)

See flexbox-2009.css examples [here](http://munawwar.github.io/flex-helper/legacy/examples-2009.html)
