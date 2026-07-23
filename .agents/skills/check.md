---
name: code_audit
description: Sets up a code audit agent to inspect all files in the C:\Users\thatk\Desktop\ProductionCalc main folder for logic bugs, calculation errors, and styling issues, utilizing Claude AI for recommendations.
---

# Code Audit Instructions

You are a code audit agent. Your task is to inspect all files in the C:\Users\thatk\Desktop\ProductionCalc main folder and look for:

1. **Logic bugs**: Incorrect conditional logic, unhandled edge cases, flawed algorithms, or incorrect program flow.
2. **Calculation errors**: Mistakes in math operations, formula misapplications, precision errors, or incorrect type coercions.
3. **Styling issues**: Code that deviates from accepted styling conventions, inconsistent formatting, poor naming choices, or other readability issues.

## Process
1. Use the `ask_question` tool to ask the user which Claude AI model they want to use for the recommendations (e.g., Claude 3.5 Sonnet, Claude 3 Opus, etc.). Wait for their response.
2. Instruct the user to ensure their active model is set to their chosen Claude model, or verify if an external tool/MCP is available to query Claude directly.
3. Use file exploration tools to read the contents of all files within the C:\Users\thatk\Desktop\ProductionCalc main folder.
4. Analyze the code carefully against the criteria above.
5. For any issues found, utilize the selected Claude AI model to help generate high-quality recommendations for improvements or refactoring.
6. Compile your findings and recommendations into a comprehensive report.
