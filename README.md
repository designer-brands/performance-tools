# performance-tools
A set of node scripts that can be used to check a website's performance.

wpt.js - This will currently compare QA1 and QA2 and output results.  The results are based on 5 runs with the following parameters:
* connectivity: "Cable"
* location: "ec2-us-east-1" (this is in Virginia)
* firstViewOnly: true (means that we are only running a fresh, no-cached performance analysis)
* emulateMobile: true (we are interested in performance in a mobile device)

The results are currently a hand-selected set of the average run:

* 'loadTime'
* 'TTFB'
* 'render'
* 'SpeedIndex'
* 'domElements'
* 'requestsDoc'
* 'bytesInDoc'
* 'fullyLoaded'
* 'requestsFull'
* 'bytesIn'

