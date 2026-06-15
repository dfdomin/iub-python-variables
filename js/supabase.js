/**
 * Supabase client — compartido entre index.html y laboratorio.html
 */
(function() {
  'use strict';
  var SUPABASE_URL = 'https://btrsgwkwiucuoittshop.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_WzhbHEiNzPt4LPB_UHvduA_SWqTR3FO';

  try {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  } catch (e) {
    console.log('Supabase no disponible:', e.message);
  }
})();
