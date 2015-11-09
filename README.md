# Flight-Checklist
Flight checklist for DJI Phantom

* Need to add warning prompt for **Clear Log** button
* ~~User should only be allowed to check items sequentially~~
* When one section is fully checked, collapse and expand next section (maybe transition?)
* Add swipe check (and disable press check?) or use tap hold
* ~~Add list item text to log entry (change AJAX function to receive generic data instead of just ID)~~
* App hangs when you click **View Log** button after checking 6 or more list items. Tried increasing memory limit of MongoDB using `ulimit -n 2048` command before initializing db with `mongod` but did not fix issue. Stopping browser and then clicking **View Log** button again makes it work fine again.
* When you hold down click on **New Flight** button, the background of button turns green
* After clicking **New Flight** button, there is a blue border
