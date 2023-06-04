## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Requirements](#requirements)
4. [Key Learnings & Limitations](#key-learnings--limitations)
5. [Implications of Using an SDHC Card Extension Cable](#implications-of-using-an-sdhc-card-extension-cable)
6. [Device Compatibility](#device-compatibility)
7. [Acknowledgements](#acknowledgements)

## Project Description

This project aims to provide a convenient solution for recording and sharing musical performances. The motivation behind it is a passion for music and the desire to improve performance through self-analysis and receiving feedback from a coach.

The project was developed to address the need for a wireless method to download .wav files from a zoom recorder without having to remove the SDHC card after every performance. After researching available options in March 2023, such as Toshiba FlashAir and axGear Wireless SDHC card, it became clear that these solutions were either discontinued or had unfavorable reviews. Eventually, the ezShare wireless SDHC card was chosen, despite some limitations.

One of the main challenges was that the ezShare SDHC card only supported ADHOC wireless functionality, which required constantly switching between the ezShare Wi-Fi SSID and home Wi-Fi SSID using a smartphone or Wi-Fi capable device to retrieve recorded performances. This process proved to be inconvenient and time-consuming.

To overcome these challenges, a Raspberry Pi 4 was utilized, taking advantage of its wired connection (eth0) to the home network and its wireless functionality (wlan0) to connect to the ezShare card. A Node.js app was then created to sync the files from the ezShare internal website to the Raspberry Pi, enabling easy access to the recordings through the home network. Furthermore, upon testing, it was found that the wifi card interfered with the audio recording device, so an SDHC Card extension cable was purchased to move the EZShare card away from the recording device, effectively preventing interference.

The project's code and documentation can be found on this GitHub repository, providing a comprehensive solution for wireless recording and file management.

## Requirements

Before using the code and working with the ezShare SDHC card, certain requirements must be met. Here are the key requirements and devices needed:

- **ezShare SDHC Card**: Obtain an ezShare SDHC card, which provides wireless functionality for file transfer. The card should be compatible with the devices you intend to use it with. It is recommended to acquire a genuine and reliable ezShare SDHC card to ensure optimal performance.

<img src="./ezshare.png" alt="ezshare sdhc card" width="200" height="200">

- **Device with Wireless Capability**: You will need a device capable of connecting to the ezShare SDHC card wirelessly. This device can be a Raspberry Pi, an old laptop, a netbook, or any other system that supports Node.js and has access to two network interfaces—one wired (Ethernet) and one wireless (Wi-Fi).

- Raspberry Pi (Optional): If you choose to use a Raspberry Pi, ensure you have a Raspberry Pi model (such as Raspberry Pi 4 or Raspberry Pi model 3B+) and necessary peripherals like power supply, microSD card, and Ethernet cable.

- SDHC Card Extension Cable (Optional): If you plan to use the ezShare SDHC card with certain audio recording devices prone to interference, such as the Zoom H2n, you may need an SDHC card extension cable. This cable allows you to move the ezShare card away from the device while still maintaining wireless access. However, be aware that using the extension cable may have implications, as discussed in the next section.

## Key Learnings & Limitations

Through the development and usage of this project, several key learnings and limitations were identified:

- Interference Issues: It was discovered that the ezShare SDHC card's Wi-Fi functionality interfered with the audio recording quality when used in close proximity to certain devices. This issue was resolved by using an SDHC card extension cable to move the card away from the recording device.

- Network Configuration: Setting up the Raspberry Pi with dual network interfaces (wired and wireless) required some configuration and understanding of network settings. Knowledge of network routing and IP addressing is beneficial for troubleshooting any connectivity issues.

- ezShare SDHC Card Reliability: While the ezShare SDHC card provided the wireless functionality needed, its reliability can vary. Some users have reported occasional connection issues or difficulties accessing the internal website. It's advisable to test the card thoroughly and consider alternative solutions if consistent performance is crucial.

- Device Compatibility: The ezShare SDHC card should be compatible with the devices you intend to use it with. Ensure that the card supports the required operating system and has reliable driver support.

- SDHC Card Extension Cable Implications: When using an SDHC card extension cable, be aware that it introduces additional points of failure and may affect the overall system reliability. Proper cable management and regular inspection of the cable's condition are recommended.

## Implications of Using an SDHC Card Extension Cable

When using an SDHC card extension cable, there are a few implications to consider:

1. Increased Cable Length: The extension cable allows you to position the ezShare SDHC card away from the recording device, reducing potential interference. However, longer cable lengths may increase the chances of signal degradation or other issues. Ensure the cable length is within reasonable limits to maintain optimal performance.

2. Cable Management: Proper cable management is important to avoid cable entanglement or accidental disconnections. Use cable ties or clips to secure the extension cable and keep it organized.

3. Regular Inspection: Periodically check the extension cable for any signs of damage or wear. Replace the cable if you notice any fraying, kinks, or other signs of deterioration.

## Device Compatibility

The ezShare SDHC card should be compatible with various devices, including but not limited to:

- Raspberry Pi (Model 4, Model 3B+)
- Laptops and Netbooks
- Smartphones and Tablets (with compatible SD card slots or SD card readers)
- Digital Cameras (with compatible SD card slots)

Please check the specifications and documentation of your specific device to ensure compatibility with the ezShare SDHC card.

## Acknowledgements

This project would not have been possible without the valuable guidance and support of the following individuals:

- Steven Chui
- [Name of Mentor or Advisor]

Their expertise and insights were instrumental in the successful development and implementation of this project.

For more details and the complete source code of the project, please visit the GitHub repository: [link to the repository].
