# GA4 Analytics Configuration Guide

This guide details how to set up the GA4 UI to reflect the implemented event-driven tracking.

## 1. Custom Dimensions
To see specific parameters in GA4 reports, you MUST register them as Custom Dimensions in the Admin panel.

| Dimension Name | Scope | Event Parameter | Description |
| :--- | :--- | :--- | :--- |
| Entry Source | Event | `entry_source` | Entry channel (direct, sns, search) |
| CTA Location | Event | `cta_location` | Position of the clicked CTA |
| Question ID | Event | `question_id` | Unique ID of the survey question |
| Question Order| Event | `question_order` | 1-indexed order of question |
| Answer Value | Event | `answer_value` | Normalized key of the user's choice |
| Last Question ID| Event | `last_question_id`| ID of the last viewed question before drop |
| Total Score | Event | `total_score` | Calculated user score |
| Tier | Event | `tier` | User category (A, B+, etc.) |
| CTA Type | Event | `cta_type` | Type of CTA clicked (retry, share, etc.) |

**Path:** Admin > Property Settings > Data Display > Custom Definitions > Create Custom Dimension

## 2. Funnel Analysis (GA4 Explore)
To identify drop-offs, create a "Funnel Exploration" report with these steps:

1. `landing_view`
2. `start_test`
3. `survey_answer_select` (Filter: `question_order` = 1)
4. `survey_answer_select` (Filter: `question_order` = 7)
5. `result_view`

## 3. Conversion Events
Mark the following as conversions to measure success:
- `result_view` (Main completion)
- `result_cta_click` (Secondary engagement)

**Path:** Admin > Property Settings > Data Display > Events > Mark as conversion
