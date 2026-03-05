Design an interaction and page structure for an existing XDR dashboard interface.

The current interface contains a central hub element called **"Imperium Core"** in a solar-system styled layout. Do not change the existing design, layout, theme, colors, spacing, component style, or fonts. Reuse the exact same UI template, typography, and component styling already used across the platform.

### Interaction Requirement

Make the **center element named "Imperium Core" clickable**.

When the user **clicks on the Imperium Core**, it should **navigate to a page called "Overview / Summary Dashboard"**.

Interaction settings:

* Trigger: **On Click**
* Action: **Navigate To**
* Destination: **Overview Page**
* Animation: **Smart Animate**
* Transition: **300ms ease-in-out**

### Hover Effect on Imperium Core

Add a hover interaction to the Imperium Core element:

* Slight **glow around the shield icon**
* **Scale up to 105%**
* **Subtle gold highlight**
* Maintain the same UI styling used in other interactive elements.

---

### Navigation Logic

1. User lands on the **XDR Main Interface (solar system layout)**.
2. The **Imperium Core** is visible at the center.
3. User **clicks Imperium Core**.
4. The system opens the **Overview / Summary Dashboard page**.

---

### Overview / Summary Dashboard Page

Create the Overview page using the **exact same layout structure, card style, spacing, border radius, color palette, and typography already used in the platform UI. Do not introduce any new fonts or component styles.**

The page must contain the following sections exactly as shown in the reference image.

---

### Top Section

Header Title:
**Overview**

---

### Section: Agents Summary

Create a **card component identical to other dashboard cards**.

Inside the card add a **donut chart** with legend.

Legend:

* **Active (1)** – green
* **Disconnected (1)** – red

Label at top:
**AGENTS SUMMARY**

---

### Section: Last 24 Hours Alerts

Create a horizontal row of four metric cards showing severity levels.

Each card should follow the same card layout used across the UI.

Metrics:

**Critical severity**
Value: **0**
Description: Rule level **15 or higher**

**High severity**
Value: **0**
Description: Rule level **12 to 14**

**Medium severity**
Value: **612**
Description: Rule level **7 to 11**

**Low severity**
Value: **430**
Description: Rule level **0 to 6**

Keep typography and color indicators consistent with the platform design system.

---

### Section: Endpoint Security

Create a container section labeled:
**ENDPOINT SECURITY**

Add the following cards using the same card template used elsewhere in the interface.

1. **Configuration Assessment**
   Description: Scan your assets as part of a configuration assessment audit.

2. **Malware Detection**
   Description: Check indicators of compromise triggered by malware infections or cyberattacks.

3. **File Integrity Monitoring**
   Description: Alerts related to file changes, including permissions, content, ownership, and attributes.

---

### Section: Threat Intelligence

Create a container section labeled:
**THREAT INTELLIGENCE**

Add the following cards using the same UI component style.

1. **Threat Hunting**
   Description: Browse through your security alerts, identifying issues and threats in your environment.

2. **Vulnerability Detection**
   Description: Discover what applications in your environment are affected by well-known vulnerabilities.

3. **MITRE ATT&CK**
   Description: Explore security alerts mapped to adversary tactics and techniques for better threat understanding.

---

### Design Constraints

* Do not modify the existing UI theme.
* Use the **same font family already used in the interface**.
* Reuse the **same card component design**.
* Maintain **same spacing, grid, and layout structure**.
* Keep **consistent icon style** with existing UI icons.
* Ensure the layout matches the **reference overview image exactly**.
* Ensure the interaction from **Imperium Core → Overview page works smoothly**.
