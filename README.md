# StyleDecor - Decoration Service Management Platform

## Purpose

StyleDecor is a comprehensive decoration service management system designed to streamline the booking, management, and execution of decoration services for various events including weddings, home interiors, office setups, and celebrations. The platform connects clients with professional decorators, enabling seamless project coordination from booking to completion.

## Live URL

🔗 [https://style-decor-amin-ur-rahman.netlify.app/](https://style-decor-amin-ur-rahman.netlify.app/)

## Key Features

### For Users

- **Service Discovery**: Browse and search decoration services with advanced filtering (category, budget range, service type)
- **Smart Booking System**: Book consultations or full decoration services with flexible scheduling
- **Dual Booking Types**:
  - Consultation bookings (in-studio or online)
  - Full decoration service bookings with quantity-based pricing
- **Real-time Status Tracking**: Monitor booking status through multiple stages (pending → assigned → planning → materials-prepared → on-the-way → in-progress → completed)
- **Payment Integration**: Secure payment processing via Stripe with transaction history
- **Booking Management**: View, track, and manage all bookings from a personal dashboard
- **Profile Management**: Personalized user profiles with booking history

### For Decorators

- **Decorator Application System**: Users can apply to become decorators with experience and specialization details
- **Project Dashboard**: View current and completed projects with detailed client information
- **Status Management**: Update project status through a structured workflow
- **Availability Control**: Toggle availability status to manage workload
- **Earnings Tracking**: Monitor completed projects and earnings
- **Client Communication**: Access client contact details and special instructions

### For Admins

- **Comprehensive Dashboard**: Manage services, bookings, decorators, and analytics
- **Service Management**: Full CRUD operations for decoration services with image uploads (Cloudinary)
- **Booking Oversight**: View all bookings with advanced filtering and sorting
- **Decorator Assignment**: Assign decorators to decoration projects based on location and availability
- **Decorator Management**: Approve/disable decorator accounts and monitor performance
- **Payment Verification**: Track payment status and verify transactions
- **Revenue Analytics**: Monitor business performance with service demand charts

### Additional Features

- **Role-Based Access Control**: Secure authentication with Firebase and JWT
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Map**: Service coverage visualization with React Leaflet
- **Animated UI**: Smooth transitions and animations with Framer Motion
- **Real-time Updates**: Instant data synchronization with React Query
- **Form Validation**: Robust form handling with React Hook Form
- **Search & Filter**: Advanced search capabilities across services and bookings
- **Secure Authentication**: Firebase authentication with Google OAuth support

## Tech Stack

### Frontend Dependencies

- **React** (19.2.0) - UI framework
- **React Router DOM** (7.10.1) - Navigation and routing
- **Tailwind CSS** (4.1.17) - Utility-first CSS framework
- **DaisyUI** (5.5.8) - Tailwind CSS component library
- **Framer Motion** (12.23.26) - Animation library
- **React Hook Form** (7.68.0) - Form validation and management
- **Axios** (1.13.2) - HTTP client
- **TanStack React Query** (5.90.12) - Server state management
- **Firebase** (12.6.0) - Authentication and hosting
- **React Leaflet** (5.0.0) - Interactive maps
- **Leaflet** (1.9.4) - Map library
- **React Icons** (5.5.0) - Icon library
- **SweetAlert2** (11.26.4) - Beautiful alert modals

### Backend Dependencies

- **Express** (5.2.1) - Web framework
- **MongoDB** (7.0.0) - Database
- **Firebase Admin** (13.6.0) - Server-side Firebase authentication
- **JWT** (9.0.3) - Token-based authentication
- **Stripe** (20.0.0) - Payment processing
- **CORS** (2.8.5) - Cross-origin resource sharing
- **dotenv** (17.2.3) - Environment variable management

### Development Tools

- **Vite** (7.2.4) - Build tool and dev server
- **ESLint** (9.39.1) - Code linting
- **Nodemon** (3.1.11) - Auto-restart server

## Color Palette

- Primary: `#2F5F5D` (Deep Teal)
- Secondary: `#F8F5F0` (Warm Cream)
- Accent: `#C9A961` (Gold)
- Neutral: `#E5DDD5` (Soft Beige)

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Firebase account
- Stripe account
- Cloudinary account

### Environment Variables

Create `.env` files in both client and server directories with necessary credentials for Firebase, MongoDB, Stripe, JWT, and Cloudinary.

---

**Developed by Aminur Rahman** | © 2025 StyleDecor

