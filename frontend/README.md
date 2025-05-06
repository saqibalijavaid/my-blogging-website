## Environment Setup

This project uses environment variables to store sensitive information like API keys.

### Setup Instructions

1. Copy `.env.template` to `.env.local`
2. Replace the placeholder values with your actual API keys
3. Never commit `.env.local` to the repository

```bash
# Example .env.local file
REACT_APP_ABSTRACT_API_KEY=your_actual_api_key_here
```

### Required APIs

- **Abstract API** - For email validation
  - Sign up at [abstractapi.com](https://www.abstractapi.com/)
  - Create an API key for the Email Validation API
  - Add your key to the `.env.local` file