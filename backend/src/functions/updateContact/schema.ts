
export default {
    type: "object",
    properties: {
        name: { type: 'string' },
        phoneNumber: { type: 'string' },
        email: { type: 'string' },
        title: { type: 'string' },
        monthOfBirth: { type: 'number' },
        dayOfBirth: { type: 'number' }
    },
    required: ['name', 'phoneNumber', 'email', 'title', 'monthOfBirth', 'dayOfBirth' ]
} as const;
