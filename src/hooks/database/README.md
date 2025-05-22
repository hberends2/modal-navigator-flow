
# Supabase Integration

This folder contains all the necessary files for Supabase database integration.

## Setup

To enable database functionality in this application, you need to set up Supabase credentials:

1. Create a Supabase account and project at [supabase.com](https://supabase.com)
2. Obtain your Supabase URL and anon key from the API settings page
3. Add these credentials to your environment by setting:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon/public key

## Development Mode

When running without valid Supabase credentials, the application will use placeholder values and display a warning toast. This allows development of the UI without a connected database.

For full functionality including saving and loading data, valid credentials must be provided.

## File Structure

- `supabaseClient.ts` - Initializes the Supabase client and provides helper functions
- `usePropertyOperations.ts` - Manages property-related database operations
- `useOccupancyOperations.ts` - Manages occupancy data operations
