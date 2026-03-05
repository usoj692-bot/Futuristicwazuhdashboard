Update the **Overview page of my existing security platform UI**. Do not redesign the interface. Only modify and improve the layout while keeping the **same design system, fonts, colors, card styles, spacing, and component templates already used in the UI**.

The overview page should act as a **Consolidated Security Dashboard** where all important modules appear in summary form.

Maintain the **dark futuristic cybersecurity theme**, with subtle animations and a clean enterprise interface.

---

GENERAL DESIGN RULES

• Use the **same font already used in the UI**
• Keep **normal readable font sizes**
• Do not introduce new typography styles
• Use the same **cards, borders, spacing, and grid layout**
• Maintain the same **dark UI theme**
• Add subtle futuristic touches such as soft glow effects and smooth hover animations

---

AGENTS SUMMARY SECTION

Remove the **pie / donut chart** completely.

Replace it with a **minimal connected vs disconnected indicator layout**.

Layout:

Create a **vertical line divider in the center**.

LEFT SIDE
Connected Agents
Display the **connected agents count**

RIGHT SIDE
Disconnected Agents
Display the **disconnected agents count**

Design requirements:

• Large but normal-sized numbers
• Green indicator for connected
• Red indicator for disconnected
• Subtle glow effect around indicators
• Slight pulse animation for active agents

---

SEVERITY SECTION

Keep the four severity cards:

Critical
High
Medium
Low

Changes required:

• Reduce the number font size to **normal size**
• Keep color indicators for each severity level
• Remove any extra large typography
• Maintain compact cards and same UI style

Each card should only display:

Severity Name
Alert Count

---

REMOVE RECENT LOGS

Delete the **Recent Logs section completely**.

---

FILE INTEGRITY MONITORING (FIM)

Place **File Integrity Monitoring** in the space where Recent Logs existed.

Display the data in **table format**.

Table columns:

Timestamp
Source IP
Event
Path

Design requirements:

• Clean table layout
• Subtle row separators
• Hover highlight on rows
• Monospace styling for event and path values
• Scrollable table if needed

Interaction:

Clicking the **File Integrity Monitoring section** should navigate to the **FIM dashboard page**.

---

UNIFORM LOG MANAGEMENT (ULM)

Keep the **Uniform Log Management section**.

Inside show log counts in a clean vertical list:

Windows Logs — count
Mac Logs — count
Linux Logs — count
Antivirus Logs — count
Firewall Logs — count

Add small icons for each source.

Interaction:

Clicking this section should open the **ULM dashboard page**.

---

PREDICTIVE ANALYSIS SECTION

Create a section called:

Predictive Analysis

Display:

Top 5 Escalating Events

Structure example:

1. Event Name — Risk Score
2. Event Name — Risk Score
3. Event Name — Risk Score
4. Event Name — Risk Score
5. Event Name — Risk Score

Design:

• Ranked list layout
• Subtle risk bars or indicators
• Orange/red highlight for high-risk events
• Futuristic styling with subtle animations

Interaction:

Clicking this section should navigate to the **Predictive Analysis page**.

---

MITRE ATTACK SECTION

Create a **MITRE ATTACK summary table**.

Columns:

Agent Name
Rule Name
Severity

Design requirements:

• Clean table layout
• Severity displayed using colored labels
• Subtle hover effects
• Same table styling used in FIM

Interaction:

Clicking the **MITRE ATTACK section** should open the **MITRE dashboard page**.

---

PAGE PURPOSE

This Overview page should function as a **Consolidated Dashboard** where all modules are summarized:

Agents Summary
Severity
Uniform Log Management
File Integrity Monitoring
Predictive Analysis
MITRE Attack

Each section should provide a **quick summary and allow navigation to its detailed page**.

---

INTERACTIONS

ULM → Navigate to ULM Dashboard
FIM → Navigate to FIM Dashboard
Predictive Analysis → Navigate to Predictive Dashboard
MITRE Attack → Navigate to MITRE Dashboard

Transitions should use:

Smart Animate
300ms ease-in-out

---

VISUAL STYLE

Make the interface look:

• Futuristic
• Animated
• Clean
• Professional
• Cybersecurity themed

Add subtle effects such as:

• glowing borders
• soft grid backgrounds
• hover animations
• smooth transitions
