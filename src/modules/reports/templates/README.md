# Report templates

Use one folder per report template so the module stays maintainable when the number of reports grows.

Recommended structure for Carbone-based reports:

```text
templates/
  mission-letter/
    template.docx
    sample-data.json
  salary-slip/
    template.xlsx
    sample-data.json
```

Current status in this repo:

- `mission-letter/` is configured for Carbone and currently uses `Letter_Head_លិខិតបញ្ជាបេសកកម្ម.docx`.
- Put one Office template file inside each report folder and keep a `sample-data.json` next to it for easier testing.
