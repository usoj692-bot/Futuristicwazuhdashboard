Modify the existing **Overview Dashboard page** of the XDR platform while keeping the **same UI theme, same fonts, same color palette, same card styles, and same layout system** already used in the product. Do not introduce new fonts or drastically change the UI style. Maintain the futuristic cybersecurity design.

---

GENERAL DESIGN RULES

• Keep the current dark cyber-security theme
• Use the same typography already used in the dashboard
• Reuse the same card components and border radius
• Maintain consistent spacing and grid system
• Add subtle futuristic animations where mentioned
• Do not redesign the whole page — only adjust layout and content

---

SECTION 1 — AGENTS SUMMARY (LEFT SIDE)

Move the **Agents Summary** card to the **left side of the page**.

Make the card more **futuristic, animated, and visually premium** while keeping the same component design language.

Enhancements:
• Keep the donut chart
• Add subtle animated rotation or pulse effect
• Add glowing accent lines or cyber grid effect
• Keep legend:

Active – Green
Disconnected – Red

This section should occupy the **left half of the top row**.

---

SECTION 2 — SEVERITY (RIGHT SIDE)

Move the **Last 24 Hours Alerts** section to the **same horizontal row as Agents Summary** on the right side.

Rename the heading:

"LAST 24 HOURS ALERTS" → **"SEVERITY"**

Adjust the layout so **Agents Summary (left)** and **Severity (right)** are on the **same row**.

Modify the severity cards:

Critical
High
Medium
Low

Changes required:

• Reduce width and height of the severity cards so they fit cleanly in one row
• Remove the **Rule level text** from all severity cards
• Keep only the severity name and the count value
• Maintain the color indicators (red, orange, yellow, blue)

Example card structure:

Critical
0

High
0

Medium
612

Low
430

Cards should be compact and evenly spaced.

---

SECTION 3 — REMOVE ENDPOINT SECURITY DIVIDER

Remove the **horizontal line or divider** that separates the Endpoint Security section.

---

SECTION 4 — UNIFORM LOG MANAGEMENT (ULM)

Replace the **Configuration Assessment** card with a new card called:

**Uniform Log Management**

This card should appear **alone in its row**.

Inside the card display **log source statistics in a clean list format**.

Display them one per line:

Windows Logs — [count]
Mac Logs — [count]
Linux Logs — [count]
Antivirus Logs — [count]
Firewall Logs — [count]

Design requirements:

• Use small icons for each log source
• Align the items vertically
• Add subtle separators or spacing
• Maintain the same card UI style

Interaction:

When the user **clicks the Uniform Log Management card**, it should:

Trigger: On Click
Action: Navigate To
Destination: **ULM Dashboard Page**

Use **Smart Animate (300ms ease-in-out)** for the transition.

---

SECTION 5 — MALWARE DETECTION & FIM

Move the following cards to the **next row below the ULM section**:

• Malware Detection
• File Integrity Monitoring (FIM)

These should appear in the **second lane / row**.

Keep their original card design.

---

SECTION 6 — RECENT LOGS PREVIEW CARD

In the **empty space beside the ULM card**, create a new card called:

**Recent Logs**

This card should display a **preview of logs from each source**.

Show **2 logs from each source**.

Structure example:

Windows
• Log entry 1
• Log entry 2

Linux
• Log entry 1
• Log entry 2

Mac
• Log entry 1
• Log entry 2

Firewall
• Log entry 1
• Log entry 2

Antivirus
• Log entry 1
• Log entry 2

Design:

• Compact log list
• Monospace or terminal-style appearance
• Subtle glow or cyber grid background
• Scrollable area if logs exceed space

---

FINAL LAYOUT STRUCTURE

ROW 1
Agents Summary (Left) | Severity Cards (Right)

ROW 2
Uniform Log Management | Recent Logs Preview

ROW 3
Malware Detection | File Integrity Monitoring

---

INTERACTIONS

Imperium Core → Opens Overview Dashboard
Uniform Log Management → Opens ULM Dashboard

Transitions should use **Smart Animate (300ms ease-in-out)**.

---

Ensure the updated layout remains **clean, futuristic, and enterprise-grade**, similar to modern XDR / SIEM dashboards.
