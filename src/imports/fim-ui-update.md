Update the existing FIM (File Integrity Monitoring) page UI.
Keep the overall layout and design same as current screen.
Follow the structure similar to Wazuh FIM module, but apply only the changes mentioned below.

1️⃣ Replace Analytics Overview Chart

Remove the histogram from “Analytics Overview”.

Replace it with a Pie Chart.

Chart Heading: “Actions”

Pie Chart Segments:

Added

Modified

Deleted

Use clean modern styling matching existing UI theme.

2️⃣ Update “Recent Events” Table Columns

Modify the table columns to:

Timestamp

syscheck.path

rule.description

Severity

Notes:

Replace “rule.level” numeric values with text-based severity.

Severity values should be:

Low

Medium

High

Critical

Display severity as colored badges (subtle, professional styling).

3️⃣ Update First Summary Block

Replace “Monitored Files” with “Monitored Agents”

Keep same card style and placement.

4️⃣ Remove Component

Completely remove the “Quick Actions” section from the FIM page.

Important:

Do not change anything else in layout or structure.

Keep spacing, theme, and design consistent with existing UI.

Only implement the above modifications.