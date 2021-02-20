
export default {
    "$schema": "http://json-schema.org/draft-04/schema#",
    type: "object",
    properties: {
        name: { type: 'string' },
        phoneNumber: { type: 'string' },
        email: { type: 'string' },
        title: { type: 'string' },
        monthOfBirth: { type: 'number' },
        dayOfBirth: { type: 'number' },
        dateOfBirth: { type: 'string' }
    },
    required: ['name', 'phoneNumber', 'email', 'title', 'monthOfBirth', 'dayOfBirth' ]
} as const;
