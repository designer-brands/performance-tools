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

After both websites are analyzed 5 times each, the script will output results:

```
Load Time (s): 2950 | 3649.8 | -24% -- PASSING
First Byte (s): 488.2 | 523 | -7% -- PASSING
Start Render (s): 5500 | 3440 | 37% -- FAILED
Speed Index (s): 8517.4 | 8457.4 | 1% -- FAILED
DOM Elements: 1333.4 | 1342.6 | -1% -- PASSING
(Doc Complete) Request #: 22 | 22.2 | -1% -- PASSING
(Doc Complete) Bytes In (KB): 701335.6 | 699061.4 | 0% -- FAILED
(Fully Loaded) Time (s): 16646.8 | 16885 | -1% -- PASSING
(Fully Loaded) Request #: 163.8 | 159.8 | 2% -- FAILED
(Fully Loaded) Bytes In (KB): 1768437 | 2308886.2 | -31% -- PASSING
```


The script will exit cleanly if all tests pass.  Otherwise, it will exit with 1.