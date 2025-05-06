### Submission Notes

# Running

For quick running (build file committed in code), run:

```bash
npm run start
```

To re-build and run:

```bash
npm install
npm run build
npm run start
```

# Hardcoded data

Some data like Eth price, volume, and active addresses are hardcoded for simplicity.

In reality I would find these values by storing raw block data over time, and then computing these values on some interval and storing them in Redis for quick retrievals.

Or using trusted available APIs that give these values (eg. CoinGecko for price).

# Server Side Rendering

In a real production I would have incorporated SSR where it made sense. For example loading the home page charts. However over-complicating the UI and code for the sake of using _slightly_ faster nextJS tech does not seem worth it to me in this case.

# Caching

In a real production app I'd like to use Redis for caching data. Or use NextJS built in route caching. For endpoints such as /api/whale_watch and /api/latest_transactions.

# Folder Structure

I recognize pages/api is now not the standard place to put backend API routes (instead of route.js). This is what I've been using in the past (NextJS keeps changing it ...) but would be happy to use the latest route.js way if the team is using so.

# Sentry

In a production environment, I would add error tracking with Sentry to monitor both the frontend and backend and capture exceptions. This would help ensure platform stability.
