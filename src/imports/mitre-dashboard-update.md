Update the MITRE ATT&CK Dashboard inside my existing UI.

IMPORTANT RULES:

Do not change layout

Do not change theme

Do not change sidebar

Do not change navigation

Do not change fonts

Do not change spacing

Keep the same dark SOC theme already used in my MITRE dashboard

Only perform the changes listed below.

1. Remove Existing Sections

Delete the following sections completely from the current MITRE dashboard:

Tactics Detected

Techniques

Coverage

Recent

Quick Actions

Do not leave empty containers.

2. Add Two Charts (Reference Layout from Wazuh)

Add two dashboard cards in the main content area using the same card style already present in my UI.

Chart 1

Title:
Rule Level by Tactic

Chart Type:
Pie / Donut Chart

Purpose:
Show alert distribution grouped by MITRE tactics and rule severity.

Chart 2

Title:
MITRE ATT&CK by Tactic

Chart Type:
Pie / Donut Chart

Purpose:
Show distribution of detected MITRE tactics.

3. Events Table Modifications

Use the same table style already present in the MITRE page.

Delete These Columns

Remove:

Rule MITRE ID

Rule MITRE Tactic

Rule ID

4. Rename Column

Rename:

Rule Level → Severity

5. Convert Severity Values

Do not display numeric values.

Display severity labels instead:

Low

Medium

High

Critical

Use colored tags consistent with the existing UI style.

Example:

Low → neutral / blue
Medium → yellow
High → orange
Critical → red

6. Final Table Columns

The Events table should contain only:

Timestamp
Agent Name
Rule Name
Severity

No additional columns.

7. Add Time Period Filter (Same as FIM Page)

Above the Events table add a time range filter identical to the one used in my FIM page and similar to filters used in Wazuh.

Available options should include:

Last 15 minutes

Last 30 minutes

Last 1 hour

Last 6 hours

Last 12 hours

Last 24 hours

Last 7 days

Last 30 days

All Time

Display it as a dropdown selector matching the current UI style.

Default selection:
Last 24 hours

Do not change table styling when adding the filter.

8. Design Consistency

Maintain everything from the current MITRE UI:

Dark SOC theme

Same cards

Same glow effects

Same font family

Same spacing

Same layout grid

Same table design

Same responsive behavior

Only implement the changes described above.