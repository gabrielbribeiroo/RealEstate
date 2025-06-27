# Real Estate Investment Comparator

This project is an interactive web application designed to help users compare different real estate investment scenarios. It provides a clear and visual analysis of various options, enabling users to make informed financial decisions.

## Features

- **Intuitive User Interface:** Easy-to-navigate tabs for different scenarios.
- **Four Comparison Scenarios:**
  - **Money Invested:** Analyze the returns of keeping money in financial investments.
  - **Renovate to Live:** Calculate costs and benefits of renovating an apartment to live in (assuming the user already owns the apartment).
  - **Renovate to Rent:** Calculate the financial return of renovating an apartment to rent out (assuming the user already owns the apartment).
  - **Continue in Current Home:** Evaluate the costs and benefits of staying in the current home, including potential renovation costs.
- **Precise Financial Calculations:** Includes total return, net return, ROI (Return on Investment), total costs, property appreciation, and rental income.
- **Graphical Visualizations:** Bar charts for comparative net returns and pie charts for return distribution.
- **Detailed Scenario Cards:** Comprehensive breakdown of financial metrics for each option.
- **Automatic Recommendations:** Provides insights and recommendations based on the comparison results.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Default Values:** Pre-filled fields for quick testing and demonstration.

## Scenarios and Calculations

The application compares the following scenarios:

### 1. Money Invested

Calculates the future value of an initial investment based on an annual return rate over a specified period.

**Inputs:**
- Initial Amount
- Annual Return Rate (%)
- Period (years)

### 2. Renovate to Live

Analyzes the costs and benefits of renovating an already-owned apartment to live in. The property value is considered for future appreciation but not as an initial cost.

**Inputs:**
- Property Value
- Renovation Cost
- Monthly Condo Fee
- Annual IPTU
- Annual Maintenance Cost
- Annual Property Appreciation (%)
- Period (years)

**Calculations:**
- **Total Initial Cost:** Renovation Cost
- **Annual Costs:** (Monthly Condo Fee * 12) + Annual IPTU + Annual Maintenance Cost
- **Total Costs:** Total Initial Cost + (Annual Costs * Period)
- **Future Property Value:** Property Value * (1 + Annual Property Appreciation)^Period
- **Net Return:** Future Property Value - Total Costs

### 3. Renovate to Rent

Evaluates the financial return of renovating an already-owned apartment and renting it out. Similar to 'Renovate to Live', property value is not an initial cost.

**Inputs:**
- Property Value
- Renovation Cost
- Monthly Condo Fee
- Annual IPTU
- Annual Maintenance Cost
- Monthly Rent Income
- Annual Property Appreciation (%)
- Period (years)

**Calculations:**
- **Total Initial Cost:** Renovation Cost
- **Annual Costs:** (Monthly Condo Fee * 12) + Annual IPTU + Annual Maintenance Cost
- **Total Rent Income:** Monthly Rent Income * 12 * Period
- **Total Costs:** Total Initial Cost + (Annual Costs * Period)
- **Future Property Value:** Property Value * (1 + Annual Property Appreciation)^Period
- **Net Return:** Future Property Value + Total Rent Income - Total Costs

### 4. Continue in Current Home

Assesses the financial implications of staying in the current home, including potential renovation costs and the opportunity cost of not renting it out.

**Inputs:**
- Current Home Value
- Annual IPTU
- Annual Maintenance Cost
- Renovation Cost (for current home)
- Annual Property Appreciation (%)
- Comparable Monthly Rent (what the home could be rented for)
- Period (years)

**Calculations:**
- **Annual Costs:** Annual IPTU + Annual Maintenance Cost
- **Total Costs:** (Annual Costs * Period) + Renovation Cost
- **Future Home Value:** Current Home Value * (1 + Annual Property Appreciation)^Period
- **Opportunity Cost:** Comparable Monthly Rent * 12 * Period
- **Net Return:** Future Home Value + Opportunity Cost - Total Costs

## Technologies Used

- **React:** Frontend JavaScript library for building user interfaces.
- **Vite:** Fast build tool for modern web projects.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Shadcn/ui:** Reusable components built with Radix UI and Tailwind CSS.
- **Recharts:** Composable charting library built with React and D3.
- **Lucide React:** Beautifully simple and customizable open-source icons.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd real-estate-investment-comparator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:5173/` (or another port if 5173 is in use).

4.  **Build for production (optional):**
    ```bash
    npm run build
    ```
    This will create a `dist` folder with the production-ready build.

## Usage

1.  Navigate through the tabs to select a scenario.
2.  Enter the required financial data for each scenario.
3.  Click "Calcular Todos os Cenários" (Calculate All Scenarios) to view the comparative results.
4.  Analyze the charts, detailed cards, and recommendations to make an informed decision.

## Live Demo

Access the live deployed version of the application here: [https://qqrdpicl.manus.space](https://qqrdpicl.manus.space)

## Contributing

Contributions are welcome! Please feel free to fork the repository, create a new branch, and submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).