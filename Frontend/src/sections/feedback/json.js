export const json = {
  title: 'A Taste of Italy at Home',
  description: '2972 Westheimer Rd. Santa Ana, Illinois 85486 +1 (209) 555-0104',
  logo: 'https://api.surveyjs.io/private/Surveys/files?name=76db69ce-63ed-416f-a88f-f72fc0da8017',
  logoWidth: '688',
  logoHeight: 'auto',
  completedHtml:
    '<div style="max-width:504px;text-align:center;margin: 0px auto 16px auto;">\n\n<div style="background-color:#DD3333;padding:40px 64px 48px 48px;text-align:left;">\n<h4 style="color:#fff;">Dear {fullname-for-complete-page},</h4>\n<br>\n<p style="color:#fff;">We greatly appreciate your feedback. Your input helps us improve, and we look forward to serving you even better on your next visit.</p>\n<br>\n<p style="color:#fff;">Warm regards,<br> Pizza House</p>\n</div>\n\n</div>\n',
  pages: [
    {
      name: 'page3',
      elements: [
        {
          type: 'text',
          name: 'full-name',
          width: '100%',
          minWidth: '256px',
          title: 'Full name:',
        },
        {
          type: 'text',
          name: 'contact-information',
          width: '100%',
          minWidth: '256px',
          title: 'Email address and/or phone number:',
        },
        {
          type: 'html',
          name: 'html1',
          html: '<div style="height:8px;"></div>',
        },
        {
          type: 'text',
          name: 'date-of-visit',
          width: '100%',
          minWidth: '256px',
          title: 'Date of visit:',
          inputType: 'date',
        },
        {
          type: 'text',
          name: 'number-of-guests',
          width: '100%',
          minWidth: '256px',
          title: 'Number of guests in your party:',
        },
        {
          type: 'text',
          name: 'check-amount',
          width: '100%',
          minWidth: '256px',
          title: 'Check amount:',
        },
        {
          type: 'html',
          name: 'html2',
          html: '<div style="height:32px;"></div>',
        },
        {
          type: 'panel',
          name: 'ratings-panel',
          elements: [
            {
              type: 'matrixdropdown',
              name: 'food-ratings',
              width: '100%',
              minWidth: '256px',
              titleLocation: 'hidden',
              showHeader: false,
              columns: [
                {
                  name: 'column1',
                  cellType: 'rating',
                  rateType: 'stars',
                },
              ],
              transposeData: true,
              choices: [1, 2, 3, 4, 5],
              rows: [
                {
                  value: 'food-quality',
                  text: 'Food Quality',
                },
                {
                  value: 'food-taste',
                  text: 'Food Taste',
                },
                {
                  value: 'price',
                  text: 'Price',
                },
              ],
            },
            {
              type: 'matrixdropdown',
              name: 'venue-ratings',
              width: '100%',
              minWidth: 'auto',
              titleLocation: 'hidden',
              showHeader: false,
              columns: [
                {
                  name: 'column1',
                  cellType: 'rating',
                  rateType: 'stars',
                },
              ],
              transposeData: true,
              choices: [1, 2, 3, 4, 5],
              rows: [
                {
                  value: 'service',
                  text: 'Service',
                },
                {
                  value: 'ambiance',
                  text: 'Ambiance',
                },
                {
                  value: 'cleanliness',
                  text: 'Cleanliness',
                },
              ],
            },
            {
              type: 'comment',
              name: 'suggestions',
              width: '100%',
              minWidth: '256px',
              title: 'Your comments or suggestions',
              titleLocation: 'bottom',
              rows: 1,
              autoGrow: true,
              allowResize: false,
            },
          ],
          questionTitleLocation: 'top',
          title: 'Please rate the following:',
          width: '100%',
          minWidth: '256px',
        },
        {
          type: 'html',
          name: 'question14',
          html: '<div style="height:8px;"></div>',
        },
      ],
      title: 'Your feedback matters.',
      description: 'Please provide your feedback so that we can continue to improve our service.',
    },
  ],
  calculatedValues: [
    {
      name: 'fullname-for-complete-page',
      expression: 'iif({full-name} notempty, {full-name}, guest)',
    },
  ],
  showQuestionNumbers: 'off',
  questionTitleLocation: 'left',
  questionDescriptionLocation: 'underInput',
  questionErrorLocation: 'bottom',
  completeText: 'Submit',
  widthMode: 'static',
  width: '768',
  fitToContainer: true,
};
