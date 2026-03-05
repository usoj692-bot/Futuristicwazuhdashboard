Update the FIM Dashboard UI with the following improvements while keeping the same design style, spacing, and layout used across the dashboard.

Recent Events Table – Add Agent Name Column

In the Recent Events table, add a new column called Agent Name.

Place the Agent Name column after the Timestamp column, similar to how it appears in the Wazuh dashboard.

Ensure the column styling, alignment, and spacing remain consistent with the existing table design.

Adjust Filter Events Section

Modify the Filter Events section above the Recent Events table to match the style used in the Wazuh dashboard.

The filter should include a Time Period dropdown selector with the following options:

Last 1 hour

Last 24 hours

Last 7 days

Last 30 days

Custom Range

The filter should be placed above the Recent Events table on the right side and should look clean and minimal like the Wazuh interface.

Clickable Summary Cards
In the FIM Dashboard there are three summary cards:

Monitored Agents

Changes Detected

Critical Alerts

Make each of these cards clickable.

Navigation to Detailed Pages
When a user clicks a card, it should open a new dedicated page:

Monitored Agents Page:

Display a list of all monitored agents

Show agent name, status, last activity, and monitored files.

Changes Detected Page:

Display file integrity change events

Include columns for file path, agent name, change type (Created, Modified, Deleted), timestamp, and severity.

Critical Alerts Page:

Show all critical alerts

Include agent name, file path, alert description, timestamp, and alert status.

Page Navigation

Each new page should maintain the same dashboard layout and sidebar navigation.

Include a breadcrumb or back button to return to the FIM Dashboard.

Ensure the overall UI remains clean, professional, and consistent with the security dashboard style used in the Wazuh interface.