DROP FUNCTION IF EXISTS public.claim_first_admin();
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated, public;