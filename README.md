# chbae
That could have been an email

This is a rapid pet project webpage where you can track the cost of a meeting. Specify the number of people, the pay level, and watch the shareholder value increase.

Bugs:
* Javascript timers go to sleep on all modern browsers which means the ticker doesn't increase linearly, or not at all, if the page loses focus. To fix I need to change the time comparison method (probably use a call to local time every X, and JS timers in-between to simulate fast increase of value)
* Need a way to specify average wage per industry
