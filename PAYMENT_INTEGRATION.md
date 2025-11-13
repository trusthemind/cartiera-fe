# Payment Integration Documentation

## Overview

This document describes the Stripe payment integration implemented in the Cartiera Frontend application.

## Features Implemented

### 1. Stripe SDK Integration
- **Packages installed**: `@stripe/stripe-js` and `@stripe/react-stripe-js`
- **Provider component**: `StripeProvider` wraps checkout pages with Stripe Elements
- **Configuration**: Stripe publishable key configured via environment variables

### 2. Payment API Endpoints

Location: `/src/api/payment/`

#### Endpoints:
- **createPaymentIntent**: Creates a Stripe payment intent for a car purchase
- **confirmPayment**: Confirms and records successful payment
- **getPaymentHistory**: Retrieves user's payment history
- **getPaymentById**: Gets details of a specific payment
- **cancelPayment**: Cancels a pending payment

#### Types:
All TypeScript interfaces are defined in `payment.types.ts`

### 3. User Interface Components

#### Checkout Page (`/checkout`)
- **Location**: `/src/app/checkout/page.tsx`
- **Features**:
  - Initializes payment intent with backend
  - Displays order summary (car details, amount)
  - Stripe Elements payment form
  - Real-time payment processing
  - Error handling and loading states

#### Checkout Form Component
- **Location**: `/src/components/CheckoutForm/`
- **Features**:
  - Stripe PaymentElement for secure card input
  - Order summary display
  - Payment confirmation handling
  - Redirect to success page on completion

#### Payment Success Page (`/payment/success`)
- **Location**: `/src/app/payment/success/page.tsx`
- **Features**:
  - Confirms payment with backend
  - Displays payment details
  - Shows payment ID, amount, status, and date
  - Navigation to home, payment history, or car listings

#### Payment History Page (`/payment/history`)
- **Location**: `/src/app/payment/history/page.tsx`
- **Features**:
  - Displays all user payments in a table
  - Sortable and filterable columns
  - Status color coding
  - Pagination support
  - Empty state with call-to-action

### 4. Buy Now Functionality

#### Car Card Component Updates
- **Location**: `/src/components/CarsComponents/Card/Car/index.tsx`
- **Changes**:
  - Added "Buy Now" button with shopping cart icon
  - Button visible only on public car listings (not on user's profile)
  - Passes car details and price to checkout page
  - Converts price to cents for Stripe (multiplies by 100)

### 5. Navigation Updates
- Added "Payment History" link to main navigation menu
- Users can easily access their payment history from anywhere in the app

### 6. Routing

New routes added to `AppRoutes` enum:
- `/checkout` - Payment checkout page
- `/payment/success` - Payment confirmation page
- `/payment/history` - Payment history page

## Environment Configuration

### Required Environment Variables

Add to `.env.local` (or your deployment environment):

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### Files Created
- `.env.example` - Template for environment variables
- `.env.local` - Local development environment variables (gitignored)

## Payment Flow

1. **Browse Cars**: User browses available cars on `/cars`
2. **Click Buy Now**: User clicks "Buy Now" button on a car card
3. **Checkout Page**: Redirected to `/checkout` with car details in query params
4. **Initialize Payment**: Frontend calls `createPaymentIntent` API
5. **Enter Payment Details**: User enters card information in Stripe Elements form
6. **Process Payment**: Stripe processes payment securely
7. **Confirmation**: On success, backend is notified via `confirmPayment` API
8. **Success Page**: User redirected to `/payment/success` with payment details
9. **View History**: User can view all payments on `/payment/history`

## Security Features

- Stripe Elements handles card data securely (PCI compliant)
- No card information touches the application servers
- Payment intents created server-side
- Client secret used for one-time payment authorization
- All payment amounts converted to smallest currency unit (cents)

## Backend Integration

### Expected Backend Endpoints

The frontend expects these endpoints to be available:

1. **POST** `/payments/create-intent`
   - Request: `{ car_id, amount, currency }`
   - Response: `{ client_secret, payment_intent_id, amount, currency, status }`

2. **POST** `/payments/confirm`
   - Request: `{ payment_intent_id }`
   - Response: `{ success, message, payment }`

3. **GET** `/payments/history`
   - Response: `{ data: [payments], total }`

4. **GET** `/payments/:id`
   - Response: `{ data: payment }`

5. **POST** `/payments/cancel/:payment_intent_id`
   - Response: `{ message }`

## Testing

### Test Mode
The integration uses Stripe test mode. Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- Any future expiry date and CVV

### Test Flow
1. Start the development server
2. Navigate to `/cars`
3. Click "Buy Now" on any car
4. Use test card `4242 4242 4242 4242`
5. Complete the checkout
6. Verify success page displays
7. Check payment history page

## Styling

All components use:
- Ant Design components for UI consistency
- SCSS modules for component-specific styles
- CSS variables for theming (e.g., `var(--purple)`)
- Responsive design principles

## Files Modified/Created

### New Files
- `/src/api/payment/index.ts` - Payment API endpoints
- `/src/api/payment/payment.types.ts` - Payment TypeScript types
- `/src/components/StripeProvider/index.tsx` - Stripe provider wrapper
- `/src/components/CheckoutForm/index.tsx` - Payment form component
- `/src/components/CheckoutForm/CheckoutForm.module.scss` - Form styles
- `/src/app/checkout/page.tsx` - Checkout page
- `/src/app/checkout/page.module.scss` - Checkout styles
- `/src/app/payment/success/page.tsx` - Success page
- `/src/app/payment/success/page.module.scss` - Success styles
- `/src/app/payment/history/page.tsx` - History page
- `/src/app/payment/history/page.module.scss` - History styles
- `.env.example` - Environment template
- `.env.local` - Local environment (gitignored)

### Modified Files
- `/src/constants/constants.ts` - Added payment routes and navigation
- `/src/components/CarsComponents/Card/Car/index.tsx` - Added Buy Now button
- `/.gitignore` - Added .env to ignore list
- `/package.json` - Added Stripe dependencies

## Future Enhancements

Potential improvements for future iterations:
1. Add payment method management (save cards)
2. Implement refund functionality
3. Add payment receipts/invoices
4. Support multiple currencies
5. Add payment notifications/webhooks
6. Implement subscription payments
7. Add analytics for payment tracking
8. Support alternative payment methods (Apple Pay, Google Pay)

## Troubleshooting

### Common Issues

1. **"Stripe publishable key is not set"**
   - Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set in `.env.local`
   - Restart dev server after adding env variables

2. **Payment intent creation fails**
   - Check backend is running and accessible
   - Verify API endpoint URL is correct
   - Check authentication token is valid

3. **Payment doesn't complete**
   - Check browser console for errors
   - Verify Stripe test cards are being used
   - Ensure backend confirms payment intent

4. **Styles not loading**
   - Verify SCSS module imports
   - Check CSS variable definitions
   - Clear Next.js cache (`.next` folder)

## Support

For issues or questions:
- Check Stripe documentation: https://stripe.com/docs
- Review Next.js documentation: https://nextjs.org/docs
- Check the codebase README for general setup instructions
