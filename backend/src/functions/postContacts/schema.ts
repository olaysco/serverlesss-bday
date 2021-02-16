
export default {
    contact: {
        type: "object",
        properties: {
            name: { type: 'string' },
            phoneNumber: { type: 'string' },
            email: { type: 'string' },
            title: { type: 'string' },
            monthOfBirth: { type: 'number' },
            dayOfBirth: { type: 'number' }
        }
    },
    type: "array",
    properties: {
        // contacts: { type: 'array' },
        items: {$ref: "#contact" }
    },
    required: ['name', 'email', 'title', 'monthOfBirth', 'dayOfBirth' ]
} as const;
