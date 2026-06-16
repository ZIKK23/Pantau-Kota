# 1. Project Name
**PantauKota**

---

# 2. Short Description
PantauKota is a Progressive Web App (PWA) designed for modern urban infrastructure reporting:
- **Connects** citizens directly with city administrators.
- **Empowers** residents to easily report public issues (e.g., potholes, broken streetlights).
- **Provides** administrators with a powerful dashboard to track, manage, and resolve reports efficiently.

---

# 3. Problem Solved
**The Challenges:**
- ❌ **Untransparent Process**: Citizens don't know where to report issues or how to track their status.
- ❌ **Duplicate Reports**: City administrators are overwhelmed by multiple reports of the exact same issue.
- ❌ **Poor Prioritization**: Lack of a centralized system makes it hard to know which infrastructure problem is the most critical.

**The Solution (PantauKota):**
- ✅ **Unified Platform**: A single, transparent portal for all infrastructure reports.
- ✅ **Geo-tagged & Visual**: Reports include exact GPS coordinates and photographic evidence.
- ✅ **Community Validation**: Citizens can upvote reports to automatically flag them as high priority.
- ✅ **Real-time Tracking**: Instant status updates and notifications keep the public informed at all times.

---

# 4. Key Features
- **Geo-tagged Reporting**: Submit reports with exact GPS locations and photos.
- **Community Voting & Comments**: Upvote reports to validate urgency and add context via comments.
- **Automated Prioritization**: Priority scores calculated automatically based on upvotes and report age.
- **Real-time Synchronization**: WebSockets provide instant UI updates and notifications without page reloads.
- **Admin Dashboard**: Comprehensive control panel to review reports, update statuses, and manage users.
- **Progressive Web App (PWA)**: Installable on mobile devices with offline caching support.

---

# 5. Tech Stack & Reasons

| Technology | Purpose | Reason for Choosing |
| :--- | :--- | :--- |
| **Next.js 15 (App Router)** | Frontend & API Framework | Robust Server-Side Rendering (SSR) and seamless API Route Handlers. |
| **TypeScript** | Programming Language | Type safety reduces runtime errors and improves maintainability. |
| **Tailwind CSS** | Styling | Rapid UI development using a utility-first approach. |
| **Supabase PostgreSQL** | Database & Auth | Scalable managed PostgreSQL with built-in Authentication and RLS. |
| **Prisma ORM** | Database Access | Strongly-typed database client for intuitive and safe querying. |
| **Supabase Realtime** | WebSocket Subscriptions | Enables instant push notifications and live UI updates effortlessly. |
| **Leaflet & React-Leaflet** | Interactive Maps | Lightweight library for mapping and geolocation data. |
| **Cloudinary** | Image Storage & CDN | Secure image uploads with on-the-fly transformations. |
| **Resend** | Email Service | Reliable transactional notifications for status updates. |

---

# 6. How to Install and Run

### Prerequisites
- **Node.js** (v20 or higher)
- **Supabase** Project (Database & Auth)
- **Cloudinary** Account (Images)
- **Resend** Account (Emails)

### Installation Steps

1. **Clone & Install**:
   ```bash
   cd PantauKota
   npm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` and fill in:
   ```env
   # Database
   DATABASE_URL="postgresql://...:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://...:5432/postgres"
   
   # Supabase Auth
   NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   
   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   
   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   
   # Resend
   RESEND_API_KEY="your-resend-api-key"
   ```

3. **Database Setup**:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   npm run seed  # Optional: Seed dummy data and admin user
   ```

4. **Run Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.