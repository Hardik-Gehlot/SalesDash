# SalesDash Project

[Live Demo](https://salesdash.onrender.com)

Welcome to the SalesDash project! This repository contains a tool for visualizing sales data using Nivo charts, with a backend powered by Node.js and Express. Whether you're a business analyst exploring sales trends or a developer working on data visualization, this project aims to provide a convenient way to understand and present sales information.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Deployment Limitations](#deployment-limitations)
- [Branches](#branches)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

Presenting the SalesDash project, a dynamic sales data visualization tool designed to offer valuable insights into sales trends. Leveraging interactive Nivo charts, this project empowers users to explore monthly and daily sales patterns, enabling data-driven decision-making.

## Features

- **Tabular Data Display:** View all customers, products, and transactions in an organized tabular format, providing a comprehensive overview of your business operations.
- **Monthly and Daily Sales Visualization:** Utilize Nivo charts to visualize monthly and daily sales data, enabling you to quickly identify trends and patterns in your sales performance.
- **Sales by Category:** Dive deeper into your sales data by category with Nivo charts, allowing you to analyze which product categories are driving your revenue.
- **Streamlined Insights:** The integration of Nivo charts empowers you to gain actionable insights from your sales data, facilitating data-driven decision-making for your business strategies.

## Technologies

The SalesDash project utilizes the following technologies:<br>
**`TypeScript`** &nbsp; | &nbsp;
**`Nodejs`** &nbsp; | &nbsp;
**`Docker`** &nbsp; | &nbsp;
**`Mongo`** &nbsp; | &nbsp;
**`Redux`** &nbsp; | &nbsp;
**`React`** &nbsp; | &nbsp;
**`Express`** &nbsp; | &nbsp;
**`Material UI`** &nbsp; | &nbsp;
**`Nivo`** &nbsp; | &nbsp;

## Getting Started

### Installation
<br>
1. Clone this repository to your local machine using:

```bash
git clone https://github.com/Hardik-Gehlot/SalesDash.git
```
<br>
2. Navigate to the project directory:

```bash
cd SalesDash
```
<br>

### Usage
*Open the project in your preferred code editor or IDE.*<br><br>
Create a **.env.local** file in your client directory and add this line
> **REACT_APP_BASE_URL**=http://localhost:5001/api/

Create a **.env** file in your server directory and add this lines
> **MONGO_URL**=YOUR_MONGO_URL <br>**PORT**=5001

Navigate to server Directory and run the following commands:

```bash
npm install
```
```bash
npm run dev
```
<br>
Navigate to client Directory and run the following commands:

```bash
npm install
```
```bash
npm start
```
Now your client and server have required dependencies and running on port 3000 and 5001 respectively.<br>
Access the SalesDash application by navigating to http://localhost:3000 in your web browser.

## Deployment Limitations
As this project is deployed on third party web hosting platform (`Render`) we have few limitations two our projects

1. **Navigation Restriction:** Please note that direct access to specific pages or sections is not supported. To navigate to desired pages, users should start from the main URL and then proceed to the intended section. This design ensures a consistent user experience and navigation flow.

2. **Initial User Delay:** After a prolonged period of website inactivity, the first user who accesses the site may experience a delay of approximately 10 to 15 minutes. This delay is due to the re-deployment process that optimizes the website's performance and functionality. Subsequent users will not encounter this delay as the website remains active. We appreciate your understanding as we prioritize an enhanced user experience.

## Branches

The SalesDash project has two main branches:<br>
**main:** Contains the main project code, including the frontend and backend.<br>
**docker:** Includes an implementation of Docker for containerization.

Using the Docker Branch<br>
If you're interested in using Docker for your project, switch to the docker branch using
```bash
git checkout docker
```

## Contributing
Contributions to this project are welcome and encouraged! If you want to add more features, improve existing features, enhance documentation, or fix issues, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them with descriptive commit messages.

4. Push your changes to your forked repository.

5. Create a pull request from your branch to the `main` branch of this repository.

Please ensure that your code follows the project's coding standards and practices.

## Contact

Feel free to reach out to us at [hardikgehlot2303@gmail.com](mailto:hardikgehlot2303@gmail.com) with any questions or suggestions. We hope this tool helps you better understand sorting and searching algorithms!

>Keep Coding!
