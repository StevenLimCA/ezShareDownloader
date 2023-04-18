# EzShareDownloader

## Description

Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

- What was your motivation?

I love music and I wanted to record my performances conveniently so I can share with myself and my coach to improve.

- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")

I have a zoom recorder that I periodically record my performance and I needed a convenient way to download .wav files. I was looking for wireless sdhc card solution for this and I could only find the ezShare wireless SDHC card solution.

- What problem does it solve?

The ezShare SDHC card only supports ADHOC wireless functionality which means I would have to use my phone to constantly switch been the ezshare wifi ssid and my home wifi ssid to retreive my performances.

- What did you learn?

I had a raspberry pi 4 lying around so I could use that device to connect to my home network via wired connection (eth0) and connect to the ezShare card using wireless functionality (wlan0),now I just had to sync the files that I needed and enable access it through the network to my raspberry pi.

So I created a NodeJS app to sync the files from the poorly written ezshare internal website to the raspberry pi.

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

1. Run npm install on the root folder in ezsharedownloader
2. Change the global variables base on your environment in dl.js
3. Create output directory
4. Use terminal and type node dl.js to execute the nodejs script
5. Check the output directory to see if the files got downloaded
6. Set up the raspberrypi environment so that you have samba installed and you can access the files through the network as they sync.
7. set up a cron job on the raspberry pi so that it will periodically sync the files.

## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

## Features

If your project has a lot of features, list them here.

## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Tests
