# GA4 Analytics Configuration Guide (Decision-Grade)

This guide details the setup required to enable decision-grade analytics for WeddingScore. 

## 1. Custom Dimensions (Mandatory)
You MUST register these dimensions in **Admin > Data Display > Custom Definitions**.

| Dimension Name | Scope | Event Parameter | Description |
| :--- | :--- | :--- | :--- |
| **Attempt Index** | Event | `attempt_index` | 1 = New User, 2+ = Retrying User |
| **Device Type** | Event | `device_type` | 'mobile' or 'desktop' |
| **Answered Count** | Event | `answered_count` | Number of questions answered before drop/exit |
| Entry Source | Event | `entry_source` | Traffic source (direct, sns, search) |
| CTA Location | Event | `cta_location` | 'hero' vs 'sticky_bottom' |
| Question ID | Event | `question_id` | Unique ID (e.g., 'q1_salary') |
| Question Order| Event | `question_order` | 1-indexed order |
| Answer Value | Event | `answer_value` | Normalized answer key |
| Last Question ID| Event | `last_question_id`| Question where user abandoned |
| Total Score | Event | `total_score` | Final score |
| Tier | Event | `tier` | Result tier (S, A, B...) |
| CTA Type | Event | `cta_type` | 'similar_profile', 'kakao_share', 'retry' |

## 2. Decision Usage Guide (Why we track this)

Use this guide to translate data into product changes.

### A. Friction Analysis (Question-Level Drop)
**Signal:** High drop-off rate at specific `question_order`.
- **Action:** Rewrite the question copy to be less cognitive load.
- **Action:** Move the question to later in the funnel (sunk cost principle).

### B. Emotional Churn (Answer-Based Drop)
**Signal:** Users selecting specific `answer_value` (e.g., "Unemployed") drop off immediately after.
- **Action:** Add a "reassurance" modal or tooltip immediately after selection.
- **Action:** Change the Result Page copy for this segment to be more encouraging.

### C. Retry Optimization
**Signal:** `attempt_index` >= 2 users have higher conversion to "Match Interest".
- **Action:** Make the "Retry" button more prominent on the Result Page.
- **Action:** Offer different "Similar Profiles" based on the second attempt score.

### D. Technical/UX Churn
**Signal:** High drop-off at `analyzing_view` for `device_type` = 'mobile'.
- **Action:** Reduce the artificial loading delay (currently 3.5s) for mobile users.

## 3. Funnel Configurations (GA4 Explore)

### Funnel A: Question Friction
1. `survey_question_view` (Parameter: `question_order` = N)
2. `survey_answer_select` (Parameter: `question_order` = N)
3. `survey_next`

### Funnel B: Emotional Churn
1. `survey_answer_select` (Breakdown: `question_id` / `answer_value`)
2. `survey_drop` (Make this a "negated" step in some tools, or just measure step 2 drop rate)

## 4. Conversions
Mark as Conversion:
- `result_view` (Primary)
- `result_cta_click` (Engagement)
