Update the existing ULM page only.
Do not change the layout, theme, navigation bar, sidebar, spacing, fonts, glow effects, or background. Keep the same dark futuristic UI that already exists in the ULM module.

Only modify the content inside the ULM dashboard area.

ULM Dashboard Update
Header

Keep the same header but update the right-side controls.

Left side title:
ULM Master Engine v2.0 – Dual Source

Right side controls:

Status: 🟢 Connected

Refresh Filter Dropdown

5 sec

10 sec (default selected)

30 sec

1 min

The refresh should appear as a small modern dropdown selector consistent with the existing UI style.

Top Dashboard Cards (3 Cards Row)

Keep the same card design used in the current UI.

Card 1 — Log Distribution

Pie Chart showing log sources.

Sources:

Linux

Windows

Mac

Firewall

Antivirus

Use the same theme colors already used in the ULM UI.

Title:
Log Distribution

Card 2 — Severity Levels

Donut chart displaying:

ERROR

WARNING

Keep the exact chart style used in the UI.

Title:
Severity Levels

Card 3 — System Info

Use the same card design already present.

Content:

Master Server: 192.168.0.110
Database: ulm_master.db

Monitoring Sources:

UDP : 5140

OSSEC : Archives

Real-Time Security Logs Section

Section Title:
Real-Time Security Logs

Keep the exact same table theme already used in the ULM UI.

Table Columns:

Timestamp
Source IP
Source (rename from Type)
Level
Message Summary

Table Behavior

Use the existing SOC-style table theme already present in the UI.

Features:

Scrollable logs

Subtle glow borders

Alternating row shading

Severity colors:

Warning → yellow

Error → red

Source column examples:

Linux

Windows

Mac

Firewall

Antivirus

Display them as small rounded tags consistent with the current UI style.

Important Instructions

Do NOT:

Change layout

Change theme

Change spacing

Modify sidebar

Modify navigation

Add new sections

ONLY:

Replace the ULM dashboard content

Add refresh filter

Update charts

Rename Type → Source

Add new log categories