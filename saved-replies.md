# Company-wide saved reply templates

See the [instructions](saved-replies.md) for how to use these templates as saved replies.

Each time these templates are changed, those changes must be announced, and all staff members must manually update their saved replies to the latest templates. For this reason, changes should not be made too often.

All changes other than minor typo or grammar fixes should be RFC'd. If in doubt, RFC the changes.

## Guidelines

- The top heading in the template should be an H2 (`##`) which identifies what type of comment this is. H2 headings give the visual indication of the underline without being as obnoxiously large as an H1.
- All other headings should be H3 (`###`).
- Headings can have a single emoji at the start of the line.
  - This serves as a "visual bullet" and helps people scanning comments to find what they need quickly.
  - Do not use multiple emojis for different nouns in the heading. Use the one emoji that fits best.
- To [connect the dots](https://github.com/Particular/Strategy/blob/master/org-philosophy/organizational-philosophy.md#practice-connect-the-dots), templates need an inconspicuous section that links them back to the template source. This section needs to include the version so people can verify if their own version is up-to-date. You shouldn't delete this section when making a comment.

    ```markdown
    <sup>[guidelines](https://github.com/Particular/StaffSuccess/blob/master/guidelines/baking.md#making-pie) version 2022-03-14</sup>
    ```

## Status update

See the [instructions](saved-replies.md) for how to use this template as a saved reply.

```markdown
## 📝 Status update

### ✔ What has been done

#### Copied from previous planned work

<!-- Copy/paste the "What to expect" items from the last status update, indicating the status of each one using ✔️ (completed), 〰️ (in-progress) or ❌ (not yet started). Of course, if additional work was done, it should be included as well. -->

#### Additional work

### ⚠ Risks

<!--
Replace the default value "None" with a list all current risks that the squad should be aware of. Any risks mentioned in previous status updates that are still present should be "carried forward" to this status update.

For each risk listed:

- Make sure it clearly identifies which specific goal is at risk, and how, or if it is a risk to completing on time, or if it's something else.
- Consider quantifying the risk: https://github.com/Particular/Strategy/blob/master/definitions/risk.md#quantified-risk
- Describe the action, if any, the task force will take to mitigate the risk.
- Describe the action, if any, the squad needs to take in relation to the risk.

Risks to always consider:

- Scope: If the scope has changed and the assignees no longer have sufficient knowledge or skills, that should be stated explicitly. The assignees may decide to spend the money to bring in an outside consultant according to https://github.com/Particular/Risk/blob/master/policies/finances/financial-decision-making.md#level-7-and-above
- Availability: Has the availability of involved staff members changed?
- Delay of next update: If there will be a [significant delay](https://github.com/Particular/StaffSuccess/blob/master/guidelines/facilitation.md#making-progress) until the next status update, please explain the reason for the delay
-->

None

### 📅 What to expect

<!-- What is planned, and when, before the next status update -->

Next status update planned: DATE

- [ ] The plan of action or project board is up-to-date as of this status update

<sup>[guidelines](https://github.com/Particular/StaffSuccess/blob/master/guidelines/facilitation.md#providing-status-updates) version 2023-08-03<!--keystring:statusupdate--></sup>
```

## Task force volunteering

See the [instructions](saved-replies.md) for how to use this template as a saved reply.

```markdown
## 🖐️ Volunteering

As of {today/date}, I have the capacity to join this task force.

### 🧠 My skills and knowledge

<!--
Copy and paste the required skills and knowledge listed in the issue description and indicate your level of proficiency against each point with a comment in italics. It's also useful to use :heavy_check_mark:, :wavy_dash:, and :x: as visual aids. For example:

- :x: flummoxing wigwats – _no experience_
- :wavy_dash: balooking mifwits – _some experience_
- :heavy_check_mark: marselling flibberies – _good experience_
-->

-

### 🗓️ My availability and capacity

My time zone is {TIMEZONE_NAME} (UTC+{hours}).

My usual working hours are {Monday} to {Friday}, {09:00} to {17:00} local TMZ ({15:00} to {23:00} UTC).

My availability and capacity during the next few weeks may be impacted by:

<!-- List absences longer than 2 days, or anything else that may affect your availability or capacity, like high-intensity task forces. Remove lines that do not apply -->

- I'm currently on {number} task force(s).
- I'm currently on a high-intensity task force.


<sup>[guidelines](https://github.com/Particular/StaffSuccess/blob/master/guidelines/staffing-task-forces.md#volunteering) version 2023-06-15</sup>
```

## Time extension request

See the [instructions](saved-replies.md) for how to use this template as a saved reply.

```markdown
## ⏰ Time extension request

_For [timeboxed issues](https://github.com/Particular/StaffSuccess/blob/master/guidelines/issue-definition.md#timeboxed-issues) only._

- [ ] The [guidelines](https://github.com/Particular/StaffSuccess/blob/master/organizational-roles/task-force.md#adjusting-a-timebox) have been followed.

| Item | Value |
|------|-------|
| Task force members confirm availability | @taskforcemember1, @taskforcemember2, @taskforcemember3 |
| [Interim retrospective](https://github.com/Particular/StaffSuccess/blob/master/guidelines/retrospectives.md#interim-retrospective)     | _Link_ <!-- Or note detailing why one is not needed --> |
| Additional time requested | _Time_ |
| Proposed new end date     | _Date_ |

### Justification



### Squad checklist

- [ ] Review the [time extension guidelines](https://github.com/Particular/StaffSuccess/blob/master/organizational-roles/task-force.md#adjusting-a-timebox)
- [ ] Validate that the proposed end date appears reasonable to complete the outstanding goals
- [ ] Make a comment either granting the extension or denying it with an explanation.
  - [ ] If the extension was granted, update the time and effort section with the new end date

<sup>[guidelines](https://github.com/Particular/StaffSuccess/blob/master/organizational-roles/task-force.md#adjusting-a-timebox) version 2023-07-20<!--keystring:timeextension--></sup>
```

## Closing Issues

_**The section headers used in this template are used for [automation](https://github.com/Particular/InternalAutomation/blob/master/docs/functions.md#announce-closed-issue) and must not be changed without a corresponding change to the automation.**_

See the [instructions](saved-replies.md) for how to use this template as a saved reply.

```markdown
## 🚀 This is done

<!-- IMPORTANT: do not change the section headers in this template in any way. They are used for automation and must remain exactly as they are. -->

### ✔ What has been done

<!--
Be specific enough about what the task force did:
- Explain the outcome/output/decision/result of this work
- Keep in mind that the ideal recipient is everyone in the organization
- List crucial things, not details. Imagine you're presenting to an audience or writing a blog post
-->

- Outcome 1
- Outcome 2

### 🏺 Artifacts

<!-- Link any relevant artifacts that were created, like documentation, demos, or RFCs, with a brief description of what they are. -->

- Artifact 1
- Artifact 2

<sup>[guidelines](https://github.com/Particular/StaffSuccess/blob/master/guidelines/facilitation.md#closing-issues) version 2023-01-17<!--keystring:issuedone--></sup>
```

## Final retrospective

See the [instructions](saved-replies.md) for how to use this template as a saved reply.

```markdown
## Final retrospective

Date: YYYY-MM-DD

<!-- If relevant use notes from previous interim retrospectives as input for the final retrospective. -->

### Facilitation

- [ ] Consider which, if any, [facilitation](https://github.com/Particular/StaffSuccess/blob/master/guidelines/facilitation.md) activities to list in the _What went well_ and _What could have gone better_ sections.

### What went well

- ...
- ...

### What could have gone better

- ...
- ...

### Peer-to-peer feedback

- [ ] Reflect on aspects of personal behavior brought up during kickoff that task members have identified that they are working on improving and give them feedback on those topics. This can be done privately if desired.
- [ ] Each task force member has considered, what, if any, [peer-to-peer feedback to give](https://github.com/Particular/StaffSuccess/blob/master/guidelines/retrospectives.md#feedback) (apart from feedback specifically solicited in the previous point), either during the retrospective or privately.
  - [ ] This includes sharing observations, asking questions, and other "micro-feedback" on topics that felt even a little bit off, or gave you pause, even if it's the first time you noticed them. Try not to worry about it possibly appearing as "nitpicking".
- [ ] Consider giving [High Fives](/Career-Development/peer-feedback/README.md#highfives) to individuals for meaningful contributions or values-centric behavior, or to the group as a whole.

### Record observations

Do not forget to [record any observations](https://github.com/Particular/Strategy/blob/master/org-philosophy/organizational-philosophy.md#practice-record-observations) that could be relevant to [track developments](https://github.com/Particular/Strategy/blob/master/org-philosophy/organizational-philosophy.md#practice-track-developments). Track observations in [Observations DB issues](https://github.com/search?q=org%3AParticular%20label%3A%22Observations%20DB%22&type=issues) (create new issues if required). 

- _{observation}_, tracked in _{issue number}_

### Update stakeholder needs database

- [ ] Review the [stakeholder needs database](https://github.com/Particular/Strategy/tree/master/stakeholder-needs) and see if anything needs to be [altered or added](https://github.com/Particular/Strategy/blob/master/stakeholder-needs/describe-and-format.md) based on the stakeholder needs listed on the issue.

### Action points

<!-- Don't forget to look at the "What could have gone better" and "What went well" points and try to find ways to make them actionable. -->
<!-- For any work identified as part of this retrospective, add items to the POA to represent that work. -->
<!-- For anything added to the POA, link the output of any work done in order to [connect the dots](https://github.com/Particular/Strategy/blob/master/org-philosophy/organizational-philosophy.md#practice-connect-the-dots) -->

- [ ] All work identified as part of this retrospective has been added to the POA.

### Improvements

If the organization were to do another issue like this one, what possibly different things would we like to try?

- ...
- ...

<sup>[guidelines](https://github.com/Particular/StaffSuccess/blob/master/guidelines/retrospectives.md#final-retrospective) version 2023-08-28<!--keystring:final-retrospective--></sup>
```

## Interim retrospective

See the [instructions](saved-replies.md) for how to use this template as a saved reply.

```markdown
## Interim retrospective

Date: YYYY-MM-DD

### Facilitation

- [ ] Consider which, if any, [facilitation](https://github.com/Particular/StaffSuccess/blob/master/guidelines/facilitation.md) activities to list in the _What went well_ and _What could have gone better_ sections.

### Evaluating progress

Now is a good time for the task force to [evaluate their progress](https://github.com/Particular/StaffSuccess/blob/master/guidelines/facilitation.md#evaluating-progress) towards achieving the goals of the issue.

- [ ] If the task force is timeboxed, consider whether an extension is required to achieve the remaining goals or outcomes.
- [ ] Are there PoA or project board items in place to reflect the unmet nature of these goals?
- [ ] Are there new obstacles or problems that have arisen that need to be overcome before the original goals can be reached?
- [ ] Have any other goals or outcomes that should be pursued instead of the original goals or outcomes requested been communicated to the squad?
- [ ] Does the current task force have the skill and knowledge to tackle the changes to scope if the issue has been rescoped?
- [ ] If the interim retrospective is in support of a time extension request, which is not the _first_ time extension request (i.e. it is second/third/etc.), the task force should retrospect on, and document, why the things causing the time extension request were not known at the time of the previous time extension request.

### What went well

- ...
- ...

### What could have gone better

- ...
- ...

### Peer-to-peer feedback

- [ ] Reflect on aspects of personal behavior brought up during kickoff that task members have identified that they are working on improving and give them feedback on those topics. This can be done privately, if desired
- [ ] Each task force member has considered, what, if any, [peer-to-peer feedback to give](https://github.com/Particular/StaffSuccess/blob/master/guidelines/retrospectives.md#feedback) (apart from feedback specifically solicited in the previous point), either during the retrospective or privately.
  - [ ] This includes sharing observations, asking questions, and other "micro-feedback" on topics that felt even a little bit off, or gave you pause, even if it's the first time you noticed them. Try not to worry about it possibly appearing as "nitpicking".

### Record observations

Do not forget to [record any observations](https://github.com/Particular/Strategy/blob/master/org-philosophy/organizational-philosophy.md#practice-record-observations) that could be relevant to [track developments](https://github.com/Particular/Strategy/blob/master/org-philosophy/organizational-philosophy.md#practice-track-developments). Track observations in [Observations DB issues](https://github.com/search?q=org%3AParticular%20label%3A%22Observations%20DB%22&type=issues) (create new issues if required).

- _{observation}_, tracked in _{issue number}_

### Action points

<!-- Don't forget to look at the "What could have gone better" and "What went well" points and try to find ways to make them actionable. -->
<!-- For any work identified as part of this retrospective, add items to the POA to represent that work. -->
<!-- For anything added to the POA, link the output of any work done in order to [connect the dots](https://github.com/Particular/Strategy/blob/master/org-philosophy/organizational-philosophy.md#practice-connect-the-dots) -->

- [ ] All work identified as part of this retrospective has been added to the POA.

### Improvements

If the organization were to do another issue like this one, what possibly different things would we like to try?

- ...
- ...

<!-- Enter "None" here if the task force does not expect to do another interim retrospective -->
Next interim retrospective planned: DATE

<sup>[guidelines](https://github.com/Particular/StaffSuccess/blob/master/guidelines/retrospectives.md#interim-retrospective) version 2023-08-04<!--keystring:interim-retrospective--></sup>
```

## Recording signal on Vision issues

See the [instructions](saved-replies.md) for how to use this template as a saved reply.

```markdown
### Contact information

<!-- Provide any publicly available contact and company information. For personally identifiable information use Salesforce instead.  -->

### Sources 

<!-- Link to the related support case, discourse thread, GitHub issue, survey, etc. -->

### Context

Based on the conversation, can you answer any of the following questions?

- What type of application are they building?
- Are they using this technology in production already?
- What's the value this technology provides them?
  - If they gave feedback that they're forced to use the technology, do they know why?
  - What are the alternatives they considered?
  - Are there alternatives that we already support? Did they consider those and why not?
<sup>version 2023-06-22<!--keystring:vision-signal--></sup>
```
