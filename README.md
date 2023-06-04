## Project Description

    ![EZshare Card](ezshare.png)

This project was developed with the aim of providing a convenient solution for recording and sharing musical performances. The motivation behind it was a passion for music and the desire to improve performance through self-analysis and feedback from a coach.

The project was born out of the need for a wireless method to download .wav files from a zoom recorder without having to remove the SDHC card after every performance. After researching available options in March 2023, such as Toshiba FlashAir and axGear Wireless SDHC card, it became clear that these solutions were either discontinued or had unfavorable reviews. Eventually, the ezShare wireless SDHC card was chosen, despite some limitations.

One of the main challenges was that the ezShare SDHC card only supported ADHOC wireless functionality, which required constantly switching between the ezShare Wi-Fi SSID and home Wi-Fi SSID using a smartphone or Wi-Fi capable device to retrieve recorded performances. This process proved to be inconvenient and time-consuming.

To overcome these challenges, a Raspberry Pi 4 was utilized, taking advantage of its wired connection (eth0) to the home network and its wireless functionality (wlan0) to connect to the ezShare card. A Node.js app was then created to sync the files from the ezShare internal website to the Raspberry Pi, enabling easy access to the recordings through the home network.

The project's code and documentation can be found on this GitHub repository, providing a comprehensive solution for wireless recording and file management.

## Key Learnings

Throughout the development of this project, several valuable insights were gained:

- Understanding the limitations and capabilities of different wireless SDHC cards

- Leveraging a Raspberry Pi for network connectivity and file synchronization

- Developing a Node.js app for seamless file management and access

By sharing this project on GitHub, I aim to provide a resource that can benefit musicians and enthusiasts who seek a wireless solution for recording and managing their performances. Feel free to explore the code and documentation, and adapt it to your own musical endeavors.

Note that the project is based on the information available as of March 2023, and there may be updates or alternative solutions since then.

## Installation

To use this code on your Raspberry Pi, follow the steps below:

1. Ensure that Node.js is installed on your Raspberry Pi. If it is not already installed, you can follow the official installation instructions at https://nodejs.org.

2. Clone the GitHub repository by running the following command in the terminal:

## Bash code snippet

    git clone <repository-url>

Replace <repository-url> with the URL of the GitHub repository where this code is located.

3. Change into the project directory:

## Bash code snippet

    cd <project-directory>

Replace <project-directory> with the name of the project directory.

4. Install the project dependencies by running the following command:

## Bash code snippet

    npm install

This command will download and install the required dependencies, including http, fs, and cheerio.

5. Open the app.js file in a text editor to configure the necessary parameters:

- Modify the baseUrl variable to match the base URL of your ezShare card.
- Adjust the urlPath variable to reflect the desired path for accessing the files on the ezShare card.
- Specify the outputDir variable to set the directory where the downloaded files will be stored on your Raspberry Pi.

6. Save the changes to the app.js file.

7. Test the script by running the following command:

## Bash code snippet

    node app.js

This will initiate the download process and display the progress and status of each downloaded file.

8. If the script runs successfully, you can proceed to set up a cron job to automate the file downloading.

# Setting up a Cron Job

To add the file downloading script as a cron job on your Raspberry Pi, follow these steps:

1. Open the terminal on your Raspberry Pi.

2. Run the following command to edit the cron table:

## Bash code snippet

    crontab -e
    If prompted, choose the text editor you are comfortable with (e.g., nano, vim).

In the cron table, add the following line to schedule the script execution:

## Bash code snippet

    */15 * * * * cd /path/to/project && node app.js >> /path/to/logfile.log 2>&1

Replace /path/to/project with the absolute path to the project directory where the app.js file is located. Additionally, specify /path/to/logfile.log to set the path and filename for the log file where script output will be saved.

The above line schedules the script to run every 15 minutes. You can adjust the schedule by modifying the cron expression as needed.

5. Save and exit the editor. The cron job is now set up and will execute according to the specified schedule.

The script will run automatically based on the cron schedule, downloading the files from the ezShare card and storing them in the designated output directory. You can check the log file for any output or error messages generated during the execution of the script.

Please note that you may need to adjust the code and cron schedule to fit your specific requirements.
