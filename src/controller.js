/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const sampleResponse = (message, status = 'success', data) => ({
  message,
  status,
  data,
});

const defaultCondition = ['eq', 'neq', 'gt', 'gte', 'contains'];

// const sampleRes = (response) => res.

// const checkEmptyBody = (rule, data) => {
//   if ((rule === undefined || typeof rule !== 'object') &&
// (data === undefined || typeof data !== 'object' ||
// Array.isArray(data) !== true || typeof data !== 'string')) {
//     return res.json(
//       sampleResponse('rule and data fields are required.', 'error', null),
//     );
//   }
// }

const validationResponse = (message, status, error, rule) => ({
  message,
  status,
  data: {
    validation: {
      error,
      field: rule.field,
      field_value: rule.field_value,
      condition: rule.condition,
      condition_value: rule.condition_value,
    },
  },
});

// const validation = (rule, operator, data) => {

// };

export const index = (req, res) => res.status(200).json({
  message: 'My Rule-Validation API',
  status: 'success',
  data: {
    name: 'Fatiu Isiaka',
    github: '@razaqfatiu',
    email: 'razaqfatiu@gmail.com',
    mobile: '08034464795',
    twitter: '@muhammadfatiu',
  },
});

export const validate = (req, res) => {
  const { body } = req;
  const { rule, data } = body;

  // if (
  //   data === undefined
  //   || typeof data !== 'object'
  //   || Array.isArray(data) !== true
  //   || typeof data !== 'string'
  //   || data === false
  // ) {
  //   return res.json(sampleResponse('data is required.', 'error', null));
  // }

  if (rule === undefined || rule === null) {
    console.log(rule);
    return res
      .status(400)
      .json(sampleResponse('rule is required.', 'error', null));
  }
  if (typeof rule !== 'object') {
    return res
      .status(400)
      .json(sampleResponse('rule should be an object.', 'error', null));
  }
  if (data === undefined || data === null) {
    return res
      .status(400)
      .json(sampleResponse('data is required.', 'error', null));
  }
  if (rule.field === undefined || rule.field === null) {
    return res
      .status(400)
      .json(sampleResponse('Invalid JSON payload passed.', 'error', null));
  }
  if (typeof rule.field !== 'string') {
    return res
      .status(400)
      .json(sampleResponse('Invalid JSON payload passed.', 'error', null));
  }
  if (
    rule.condition === undefined
    || rule.condition === null
    || defaultCondition.includes(rule.condition) === false
    || rule.condition_value === undefined
    || rule.condition_value === null
  ) {
    console.log(typeof rule.field);
    return res
      .status(400)
      .json(sampleResponse('Invalid JSON payload passed.', 'error', null));
  }

  // if (rule.field.includes('.') && (!(rule.field in data) || typeof data !== 'object')) {
  // return res
  //   .status(400)
  //   .json(
  //     sampleResponse(
  //       `field ${rule.field} is missing from data.`,
  //       'error',
  //       null,
  //     ),
  //   );
  // }

  if (!rule.field.include('.')) {
    if (rule.condition === 'eq') {
      data[rule.field] === rule.condition_value ? validationResponse(`field ${rule.field} successfully validated.`, 'success', false, rule) : validationResponse(`field ${rule.field} failed validation.`, 'error', true, rule);
    }
    if (rule.condition === 'gte') {
      data[rule.field] >= rule.condition_value ? validationResponse(`field ${rule.field} successfully validated.`, 'success', false, rule) : validationResponse(`field ${rule.field} failed validation.`, 'error', true, rule);
    }
    if (rule.condition === 'neq') {
      data[rule.field] !== rule.condition_value ? validationResponse(`field ${rule.field} successfully validated.`, 'success', false, rule) : validationResponse(`field ${rule.field} failed validation.`, 'error', true, rule);
    }
    if (rule.condition === 'gt') {
      data[rule.field] > rule.condition_value ? validationResponse(`field ${rule.field} successfully validated.`, 'success', false, rule) : validationResponse(`field ${rule.field} failed validation.`, 'error', true, rule);
    }
    if (rule.condition === 'contains') {
      data[rule.field].includes(rule.condition_value) ? validationResponse(`field ${rule.field} successfully validated.`, 'success', false, rule) : validationResponse(`field ${rule.field} failed validation.`, 'error', true, rule);
    }
  }

  if (rule.field.includes('.')) {
    const nestedField = rule.field.split('.');
    if (typeof data !== 'object') {
      return res
        .status(400)
        .json(
          sampleResponse(
            `field ${nestedField[0]} is missing from data.`,
            'error',
            null,
          ),
        );
    }
    console.log(nestedField[0]);

    if (typeof data === 'object' && !(data.hasOwnProperty(nestedField[0]))) {
      return res
        .status(400)
        .json(
          sampleResponse(
            `field ${nestedField[0]} is missing from data.`,
            'error',
            null,
          ),
        );
    }

    if (typeof nestedField[0] !== 'object') {
      return res
        .status(400)
        .json(
          sampleResponse(
            `field ${nestedField[1]} is missing from ${nestedField[0]}.`,
            'error',
            null,
          ),
        );
    }

    if (typeof nestedField[0] === 'object' && nestedField[1].hasOwnProperty(nestedField[0])) {
      return res
        .status(400)
        .json(
          sampleResponse(
            `field ${rule.nestedField[1]} is missing from ${nestedField[0]}.`,
            'error',
            null,
          ),
        );
    }
  }

  return res.json(body);
};
