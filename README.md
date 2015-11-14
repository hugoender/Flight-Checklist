# Flight-Checklist
Flight checklist for DJI Phantom

* Need to add warning prompt for **Clear Log** button
* ~~User should only be allowed to check items sequentially~~
* When one section is fully checked, collapse and expand next section (maybe transition?)
* Add swipe check (and disable press check?) or use tap hold
* ~~Add list item text to log entry (change AJAX function to receive generic data instead of just ID)~~
* ~~App hangs when you click **View Log** button after checking 6 or more list items. Tried increasing memory limit of MongoDB using `ulimit -n 2048` command before initializing db with `mongod` but did not fix issue. Stopping browser and then clicking **View Log** button again makes it work fine again.~~ ~~ajax calls to /logs/ are stuck in pending state in chrome dev tools Network tab. I am guessing that 6 pending calls is the limit before it hangs~~
* When you hold down click on **New Flight** button, the background of button turns green
* After clicking **New Flight** button, there is a blue border
* ~~Add date to New Flight text in log~~
* Make one checklist item per page and add picture and big check box
* Devise better system for creating check list and their corresponding IDs
* Record number of successful flights and have achievements or airtime awards
* ~~Not all checklist items are logged~~
* Add credits section or page
* Fix app title
