-- Step 1: Create a backup of the existing data
CREATE TABLE "StudentApplication_backup" AS SELECT * FROM "StudentApplication";

-- Step 2: Drop the existing enum type and create the new one
DROP TYPE IF EXISTS "ApplicationStatus";
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING_FOLLOWUP', 'FOLLOWED_UP', 'ACCEPTED', 'REJECTED');

-- Step 3: Update the status column with new values
ALTER TABLE "StudentApplication" ALTER COLUMN status TYPE "ApplicationStatus" 
USING (CASE status::text
    WHEN 'PENDING' THEN 'PENDING_FOLLOWUP'::ApplicationStatus
    WHEN 'APPROVED' THEN 'ACCEPTED'::ApplicationStatus
    WHEN 'REJECTED' THEN 'REJECTED'::ApplicationStatus
    ELSE 'PENDING_FOLLOWUP'::ApplicationStatus
END);
