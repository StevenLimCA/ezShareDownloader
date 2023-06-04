## Project Description

This project was developed with the aim of providing a convenient solution for recording and sharing musical performances. The motivation behind it was a passion for music and the desire to improve performance through self-analysis and feedback from a coach.

The project was born out of the need for a wireless method to download .wav files from a zoom recorder without having to remove the SDHC card after every performance. After researching available options in March 2023, such as Toshiba FlashAir and axGear Wireless SDHC card, it became clear that these solutions were either discontinued or had unfavorable reviews. Eventually, the ezShare wireless SDHC card was chosen, despite some limitations.

One of the main challenges was that the ezShare SDHC card only supported ADHOC wireless functionality, which required constantly switching between the ezShare Wi-Fi SSID and home Wi-Fi SSID using a smartphone or Wi-Fi capable device to retrieve recorded performances. This process proved to be inconvenient and time-consuming.

To overcome these challenges, a Raspberry Pi 4 was utilized, taking advantage of its wired connection (eth0) to the home network and its wireless functionality (wlan0) to connect to the ezShare card. A Node.js app was then created to sync the files from the ezShare internal website to the Raspberry Pi, enabling easy access to the recordings through the home network.

The project's code and documentation can be found on this GitHub repository, providing a comprehensive solution for wireless recording and file management.

## Key Learnings

Throughout the development of this project, several valuable insights were gained:

# Understanding the limitations and capabilities of different wireless SDHC cards

# Leveraging a Raspberry Pi for network connectivity and file synchronization

# Developing a Node.js app for seamless file management and access

By sharing this project on GitHub, I aim to provide a resource that can benefit musicians and enthusiasts who seek a wireless solution for recording and managing their performances. Feel free to explore the code and documentation, and adapt it to your own musical endeavors.

Note that the project is based on the information available as of March 2023, and there may be updates or alternative solutions since then.
